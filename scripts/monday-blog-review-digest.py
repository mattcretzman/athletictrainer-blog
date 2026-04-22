#!/usr/bin/env python3
"""
PSI Blog — Monday Review Digest
Reads the Blog Pipeline sheet, finds articles awaiting Greg's review,
and sends a summary email to the PSI + Stormbreaker team.

Scheduled via launchd every Monday at 8:00 AM CT.
"""

import subprocess
import json
import smtplib
import ssl
import sys
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

# ── Config ────────────────────────────────────────────────────────────────────
SHEET_ID = "1TsiqsCKOhvBxET6bWpYI6aMW7Sv3dtWdVaZ8vQRjOOA"
SHEET_RANGE = "Blog Pipeline!A1:V50"
SHEET_URL = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit"

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
FROM_EMAIL = "matt@stormbreakerdigital.com"
FROM_NAME = "Matt Cretzman"
APP_PASSWORD = "axclxhyuhwtcjaxv"

TO = [
    "gladue@plan-sys.com",
    "cammer@plan-sys.com",
    "mlirley@plan-sys.com",
    "rmangum@plan-sys.com",
]
CC = [
    "rozina@stormbreakerdigital.com",
    "joram@stormbreakerdigital.com",
]

# Statuses that need Greg's attention
REVIEW_STATUSES = {
    "in review",
    "revised - ready for review",
    "changes needed",
}

# ── Read Sheet ────────────────────────────────────────────────────────────────
def read_pipeline():
    params = json.dumps({"spreadsheetId": SHEET_ID, "range": SHEET_RANGE})
    result = subprocess.run(
        ["gws", "sheets", "spreadsheets", "values", "get", "--params", params],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        print(f"ERROR reading sheet: {result.stderr[:300]}", file=sys.stderr)
        sys.exit(1)

    data = json.loads(result.stdout)
    rows = data.get("values", [])
    if len(rows) < 2:
        return [], []

    headers = rows[0]
    articles = []
    for row in rows[1:]:
        # Pad row to header length
        row += [""] * (len(headers) - len(row))
        article = dict(zip(headers, row))
        articles.append(article)

    return headers, articles


# ── Build Email ───────────────────────────────────────────────────────────────
def build_email(articles):
    needs_review = []
    needs_changes = []
    revised = []
    published = []

    for a in articles:
        status = (a.get("Status") or "").strip().lower()
        topic = a.get("Topic", "").strip()
        if not topic:
            continue

        doc_link = a.get("Google Doc Link", "").strip()
        feedback = a.get("Feedback", "").strip()
        category = a.get("Category", "").strip()
        priority = a.get("Priority", "").strip()

        entry = {
            "topic": topic,
            "doc_link": doc_link,
            "feedback": feedback,
            "category": category,
            "priority": priority,
        }

        if status == "in review":
            needs_review.append(entry)
        elif status == "changes needed":
            needs_changes.append(entry)
        elif status == "revised - ready for review":
            revised.append(entry)
        elif status == "published":
            published.append(entry)

    if not needs_review and not needs_changes and not revised:
        return None  # Nothing to send

    date_str = datetime.now().strftime("%B %d, %Y")
    lines = [
        f"Hey Greg,",
        f"",
        f"Here's this week's blog pipeline status ({date_str}):",
        f"",
    ]

    # Revised articles (highest priority — Greg already reviewed once)
    if revised:
        lines.append(f"REVISED - READY FOR YOUR RE-REVIEW ({len(revised)}):")
        lines.append("These have been updated based on your earlier feedback:")
        lines.append("")
        for a in revised:
            line = f"  - {a['topic']}"
            if a["doc_link"]:
                line += f"\n    {a['doc_link']}"
            lines.append(line)
        lines.append("")

    # Articles with changes needed (Greg gave feedback, we haven't fixed yet)
    if needs_changes:
        lines.append(f"CHANGES IN PROGRESS ({len(needs_changes)}):")
        lines.append("We're working on your feedback for these:")
        lines.append("")
        for a in needs_changes:
            line = f"  - {a['topic']}"
            if a["feedback"]:
                line += f"\n    Your note: {a['feedback'][:120]}..."
            lines.append(line)
        lines.append("")

    # Articles awaiting first review
    if needs_review:
        lines.append(f"AWAITING YOUR REVIEW ({len(needs_review)}):")
        lines.append("These are drafted and ready for your feedback:")
        lines.append("")
        for a in sorted(needs_review, key=lambda x: x.get("priority", "9")):
            line = f"  - {a['topic']}"
            if a["category"]:
                line += f" [{a['category']}]"
            if a["doc_link"]:
                line += f"\n    {a['doc_link']}"
            lines.append(line)
        lines.append("")

    # Summary
    lines.append(f"Published so far: {len(published)} articles live on the blog.")
    lines.append(f"")
    lines.append(f"Full pipeline sheet: {SHEET_URL}")
    lines.append(f"")
    lines.append(f"Even reviewing 2-3 articles this week keeps our publishing cadence moving and helps with SEO momentum. Just add your notes in the Feedback column and we'll handle revisions.")
    lines.append(f"")
    lines.append(f"Thanks,")
    lines.append(f"Matt")

    return "\n".join(lines)


# ── Send Email ────────────────────────────────────────────────────────────────
def send_email(body):
    msg = MIMEMultipart()
    msg["From"] = f"{FROM_NAME} <{FROM_EMAIL}>"
    msg["To"] = ", ".join(TO)
    msg["Cc"] = ", ".join(CC)
    msg["Subject"] = f"PSI Blog: Weekly Review Digest - {datetime.now().strftime('%b %d, %Y')}"
    msg.attach(MIMEText(body, "plain"))

    all_recipients = TO + CC

    try:
        context = ssl.create_default_context()
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls(context=context)
            server.login(FROM_EMAIL, APP_PASSWORD)
            server.sendmail(FROM_EMAIL, all_recipients, msg.as_string())
        print(f"SUCCESS: Digest sent to {len(all_recipients)} recipients")
        return True
    except Exception as e:
        print(f"FAILED: {e}", file=sys.stderr)
        return False


# ── Main ──────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print(f"[{datetime.now().isoformat()}] PSI Blog Review Digest")

    headers, articles = read_pipeline()
    print(f"  Read {len(articles)} articles from pipeline sheet")

    body = build_email(articles)
    if body is None:
        print("  No articles need review — skipping email")
        sys.exit(0)

    if "--dry-run" in sys.argv:
        print("\n--- DRY RUN (email not sent) ---\n")
        print(body)
        sys.exit(0)

    send_email(body)

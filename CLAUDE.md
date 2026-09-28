# athletictrainer-blog (serves www.athletictrainerjob.com)

This Vercel project is the LIVE site for PSI / Cognito Systems athletic trainer recruiting.
Static pages live in `public/*.html` (rewrites in `next.config.ts`); the blog is Next.js 15.
Push to `main` auto-deploys production in ~60s.

## Application forms
- Forms on job-description, jobs-h2f, jobs-army, jobs-military-athletic-trainer POST to `/api/submit`
  (`src/app/api/submit/route.ts`), which forwards to Railway `psi-form-server`
  (`/api/form-submission`) -> Google Sheet (1PZ1ubaw2fxWrvaGfuvzDoMENylslXFeSMLAPKxCgCLQ) + LeadStorm AI + email.
- `public/js/attribution.js` (loaded on every page) stores first/latest touch (utm_*, gclid, fbclid,
  li_fat_id, referrer, landing page) and classifies Source (Google Ads / Meta Ads / LinkedIn /
  Organic Search / Email / SMS / Referral / Direct). The route forwards Source, First-Source, utm_*,
  gclid, fbclid, referrer, landing_page, submit_page.
- As of 2026-09-28 the form server ignores those fields; server.js (not in this repo) still needs
  to write them to the sheet + LeadStorm AI.

## Notes
- Base names: Fort Bragg / Fort Hood / Fort Benning (restored names, per PSI).
- Another clone may exist at ~/Desktop/_Client Projects/PSI/psi-blog; pull before editing.

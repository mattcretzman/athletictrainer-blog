import readingTime from "reading-time";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateReadingTime(content: string): number {
  const stats = readingTime(content);
  return Math.ceil(stats.minutes);
}

export function createExcerpt(content: string, maxLength: number = 160): string {
  // Remove MDX/Markdown syntax
  const plainText = content
    .replace(/import .+ from .+/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[#*`_~\[\]]/g, "")
    .replace(/\n+/g, " ")
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).trim() + "...";
}

export function generateBreadcrumbs(slug: string, category?: string) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  if (category) {
    breadcrumbs.push({
      label: category,
      href: `/blog/category/${slugify(category)}`,
    });
  }

  return breadcrumbs;
}

export function extractHeadings(content: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { level: number; text: string; id: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    headings.push({ level, text, id });
  }

  return headings;
}

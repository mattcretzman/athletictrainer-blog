import { getAllPosts } from "@/lib/mdx";

export async function GET() {
  const baseUrl = "https://www.athletictrainerjob.com/blog";
  const posts = getAllPosts().slice(0, 20); // Latest 20 posts

  const items = posts.map((post) => {
    const { frontmatter, slug } = post;
    return `
    <item>
      <title><![CDATA[${frontmatter.title}]]></title>
      <link>${baseUrl}/${slug}</link>
      <guid isPermaLink="true">${baseUrl}/${slug}</guid>
      <description><![CDATA[${frontmatter.description}]]></description>
      <pubDate>${new Date(frontmatter.date).toUTCString()}</pubDate>
      <category>${frontmatter.category}</category>
    </item>`;
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>PSI Athletic Trainer Blog</title>
    <link>${baseUrl}</link>
    <description>Career insights, program guides, and resources for athletic trainers exploring military healthcare opportunities.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items.join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

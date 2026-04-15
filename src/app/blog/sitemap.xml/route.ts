import { getAllPosts, getAllCategories } from "@/lib/mdx";

export async function GET() {
  const baseUrl = "https://www.athletictrainerjob.com/blog";
  const posts = getAllPosts();
  const categories = getAllCategories();

  const postUrls = posts.map((post) => {
    return `
    <url>
      <loc>${baseUrl}/${post.slug}</loc>
      <lastmod>${post.frontmatter.updatedDate || post.frontmatter.date}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`;
  });

  const categoryUrls = categories.map((category) => {
    const slug = category.toLowerCase().replace(/\s+/g, "-");
    return `
    <url>
      <loc>${baseUrl}/category/${slug}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
    </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${postUrls.join("")}
  ${categoryUrls.join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

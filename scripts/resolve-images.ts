import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { resolvePostImage } from "../src/lib/image-resolver";

// Load .env.local for local development
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

async function main() {
  console.log("🖼️  Resolving blog post images...\n");

  const postsDir = path.join(process.cwd(), "content", "posts");
  
  if (!fs.existsSync(postsDir)) {
    console.log("⚠️  No posts directory found, skipping image resolution");
    return;
  }

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
  console.log(`Found ${files.length} blog posts\n`);

  let resolved = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    console.log(`📄 ${data.slug || file}`);

    // Only resolve if featuredImage is missing or set to "auto"
    if (!data.featuredImage || data.featuredImage === "auto") {
      const result = await resolvePostImage({
        slug: data.slug || file.replace(".mdx", ""),
        featuredImage: data.featuredImage || "",
        featuredImageAlt: data.featuredImageAlt || "",
        primaryKeyword: data.primaryKeyword || data.title || "",
        category: data.category || "",
        tags: data.tags || [],
      });

      // Update frontmatter
      data.featuredImage = result.featuredImage;
      data.featuredImageAlt = result.featuredImageAlt;
      if (result.imageCredit) {
        data.imageCredit = result.imageCredit;
      }

      // Write back
      const updated = matter.stringify(content, data);
      fs.writeFileSync(filePath, updated);
      
      console.log(`   → Updated: ${result.featuredImage || "(no image)"}\n`);
      resolved++;
    } else {
      console.log(`   → Already has image, skipping\n`);
      skipped++;
    }
  }

  console.log(`\n✅ Image resolution complete!`);
  console.log(`   Resolved: ${resolved}`);
  console.log(`   Skipped: ${skipped}`);
}

main().catch((err) => {
  console.error("❌ Image resolution failed:", err);
  process.exit(1);
});

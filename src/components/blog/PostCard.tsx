import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { frontmatter, slug } = post;

  return (
    <article className="bg-warm-white rounded-lg overflow-hidden group transition-all hover:shadow-lg" style={{ border: '1px solid rgba(184, 168, 138, 0.4)' }}>
      <Link href={`/blog/${slug}`} className="block relative">
        <div className="absolute inset-0 border-l-0 group-hover:border-l-3 border-olive transition-all z-10 pointer-events-none" />
        <div className="relative aspect-video overflow-hidden bg-charcoal topo-texture-dark">
          {frontmatter.featuredImage && (
            <Image
              src={frontmatter.featuredImage}
              alt={frontmatter.featuredImageAlt || frontmatter.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-3">
          <Link
            href={`/blog/category/${frontmatter.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="category-pill"
          >
            {frontmatter.category}
          </Link>
        </div>

        <Link href={`/blog/${slug}`}>
          <h3 className="text-xl font-semibold text-charcoal mb-3 group-hover:text-olive transition-colors line-clamp-2">
            {frontmatter.title}
          </h3>
        </Link>

        <p className="text-graphite text-sm mb-4 line-clamp-3">
          {frontmatter.description}
        </p>

        <div className="flex items-center justify-between text-xs text-sand">
          <span>{formatDate(frontmatter.date)}</span>
          <span>{frontmatter.readingTime} min read</span>
        </div>
      </div>
    </article>
  );
}

import { Post, Author } from "@/lib/mdx";

interface ArticleSchemaProps {
  post: Post;
  author: Author | null;
}

export default function ArticleSchema({ post, author }: ArticleSchemaProps) {
  const { frontmatter } = post;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.ogImage || frontmatter.featuredImage,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updatedDate || frontmatter.date,
    author: {
      "@type": "Person",
      name: author?.name || "PSI Editorial Team",
      url: author ? `https://www.athletictrainerjob.com/blog/author/${author.slug}` : undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "Planned Systems International",
      logo: {
        "@type": "ImageObject",
        url: "https://www.athletictrainerjob.com/psi-logo-white.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": frontmatter.canonicalUrl,
    },
    keywords: [frontmatter.primaryKeyword, ...(frontmatter.secondaryKeywords || [])].join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

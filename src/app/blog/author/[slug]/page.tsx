import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/layout/Container";
import PostCard from "@/components/blog/PostCard";
import { getPostsByAuthor, getAuthorBySlug } from "@/lib/mdx";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return {
      title: "Author Not Found",
    };
  }

  return {
    title: `${author.name} | PSI Athletic Trainer Blog`,
    description: author.bio,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  const posts = getPostsByAuthor(slug);

  if (!author) {
    notFound();
  }

  return (
    <>
      {/* Author Hero */}
      <section className="bg-gradient-to-r from-primary via-[#556B47] to-[#3D4F31] text-white py-16">
        <Container>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-white">
                {author.photo ? (
                  <Image
                    src={author.photo}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary text-4xl font-bold">
                    {author.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">
                {author.name}
              </h1>
              <p className="text-xl text-green-50 mb-4">{author.title}</p>
              <p className="text-green-50 max-w-2xl">{author.bio}</p>
              {(author.linkedin || author.twitter) && (
                <div className="flex gap-4 mt-6 justify-center md:justify-start">
                  {author.linkedin && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-green-200 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                  {author.twitter && (
                    <a
                      href={author.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-green-200 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Author's Posts */}
      <section className="py-12 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-primary mb-8">
            Articles by {author.name}
          </h2>
          {posts.length === 0 ? (
            <p className="text-gray-text text-center py-12">
              No articles published yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

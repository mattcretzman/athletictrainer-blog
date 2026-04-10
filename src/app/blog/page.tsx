import { Metadata } from "next";
import Container from "@/components/layout/Container";
import PostCard from "@/components/blog/PostCard";
import CategoryPills from "@/components/blog/CategoryPills";
import Sidebar from "@/components/blog/Sidebar";
import Pagination from "@/components/blog/Pagination";
import { getPaginatedPosts } from "@/lib/posts";
import { getAllCategories, getFeaturedPosts } from "@/lib/mdx";

interface BlogIndexProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata: Metadata = {
  title: "Athletic Trainer Career Resources | PSI Blog",
  description: "Career insights, program guides, and resources for athletic trainers exploring military healthcare opportunities with Army H2F and Marine Corps SMIP programs.",
  openGraph: {
    title: "Athletic Trainer Career Resources | PSI Blog",
    description: "Career insights, program guides, and resources for athletic trainers exploring military healthcare opportunities.",
    type: "website",
    url: "https://www.athletictrainerjob.com/blog",
  },
};

export default async function BlogIndex({ searchParams }: BlogIndexProps) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const { posts, pagination } = getPaginatedPosts(page, 9);
  const categories = getAllCategories();
  const featuredPosts = getFeaturedPosts(4);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-charcoal text-white py-16 md:py-20 topo-texture">
        <Container>
          <div className="max-w-3xl relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{ letterSpacing: '0.5px' }}>
              Military Athletic Trainer Careers
            </h1>
            <p className="text-lg md:text-xl text-sand">
              Expert insights, program guides, and resources for athletic trainers
              exploring military healthcare opportunities.
            </p>
          </div>
        </Container>
      </section>

      {/* Category Filters */}
      <section className="bg-parchment border-b py-6" style={{ borderColor: 'rgba(184, 168, 138, 0.3)' }}>
        <Container>
          <CategoryPills categories={categories} currentCategory={undefined} />
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-stone">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Posts Grid */}
            <div className="lg:col-span-2">
              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-graphite text-lg">
                    No articles found yet. Check back soon!
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination pagination={pagination} basePath="/blog" />
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar featuredPosts={featuredPosts} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

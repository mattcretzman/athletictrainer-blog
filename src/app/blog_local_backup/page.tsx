import { Metadata } from "next";
import Container from "@/components/layout/Container";
import PostCard from "@/components/blog/PostCard";
import CategoryPills from "@/components/blog/CategoryPills";
import Sidebar from "@/components/blog/Sidebar";
import Pagination from "@/components/blog/Pagination";
import { getPaginatedPosts } from "@/lib/posts";
import { getAllCategories, getFeaturedPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "PSI Athletic Trainer Blog | Military Healthcare Career Resources",
  description:
    "Career insights, program guides, and resources for athletic trainers exploring military healthcare opportunities with PSI.",
  openGraph: {
    title: "PSI Athletic Trainer Blog",
    description:
      "Career insights, program guides, and resources for athletic trainers exploring military healthcare opportunities.",
    type: "website",
    url: "https://www.athletictrainerjob.com/blog",
  },
};

interface BlogIndexProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogIndex({ searchParams }: BlogIndexProps) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const { posts, pagination } = getPaginatedPosts(page, 9);
  const categories = getAllCategories();
  const featuredPosts = getFeaturedPosts(4);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              PSI Athletic Trainer Blog
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Career insights, program guides, and resources for athletic
              trainers exploring military healthcare opportunities.
            </p>
          </div>
        </Container>
      </section>

      {/* Category Filters */}
      <section className="bg-white border-b border-border-gray py-6">
        <Container>
          <CategoryPills categories={categories} />
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-light-gray">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Posts Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.frontmatter.slug} post={post} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination pagination={pagination} basePath="/blog" />
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

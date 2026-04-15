import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import PostCard from "@/components/blog/PostCard";
import CategoryPills from "@/components/blog/CategoryPills";
import Sidebar from "@/components/blog/Sidebar";
import Pagination from "@/components/blog/Pagination";
import { getPaginatedPostsByCategory } from "@/lib/posts";
import { getAllCategories, getFeaturedPosts } from "@/lib/mdx";
import { slugify } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: slugify(category),
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const categories = getAllCategories();
  const category = categories.find(
    (cat) => slugify(cat) === categorySlug
  );

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category} | PSI Athletic Trainer Blog`,
    description: `Browse articles about ${category} for athletic trainers exploring military healthcare careers.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const { page: pageParam } = await searchParams;
  const categories = getAllCategories();
  const currentCategory = categories.find(
    (cat) => slugify(cat) === categorySlug
  );

  if (!currentCategory) {
    notFound();
  }

  const page = Number(pageParam) || 1;
  const { posts, pagination } = getPaginatedPostsByCategory(
    currentCategory,
    page,
    9
  );
  const featuredPosts = getFeaturedPosts(4);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-charcoal text-white py-16 md:py-20 topo-texture">
        <Container>
          <div className="max-w-3xl relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{ letterSpacing: '0.5px' }}>
              {currentCategory}
            </h1>
            <p className="text-lg md:text-xl text-sand">
              Explore articles about {currentCategory.toLowerCase()} for
              athletic trainers in military healthcare.
            </p>
          </div>
        </Container>
      </section>

      {/* Category Filters */}
      <section className="bg-parchment py-6" style={{ borderBottom: '1px solid rgba(184, 168, 138, 0.3)' }}>
        <Container>
          <CategoryPills
            categories={categories}
            currentCategory={currentCategory}
          />
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
                    No articles found in this category yet.
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
                  <Pagination
                    pagination={pagination}
                    basePath={`/blog/category/${categorySlug}`}
                  />
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

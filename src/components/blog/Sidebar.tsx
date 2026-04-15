import Link from "next/link";
import { Post } from "@/lib/mdx";

interface SidebarProps {
  featuredPosts: Post[];
}

export default function Sidebar({ featuredPosts }: SidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Featured Articles */}
      <div className="bg-warm-white rounded-lg p-6 shadow-sm border-l-3 border-olive" style={{ border: '1px solid rgba(184, 168, 138, 0.4)', borderLeft: '3px solid #5C6B4F' }}>
        <h3 className="text-lg font-semibold text-charcoal mb-4">
          Featured Articles
        </h3>
        <div className="space-y-4">
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <h4 className="text-sm font-medium text-charcoal group-hover:text-olive transition-colors line-clamp-2 mb-1">
                {post.frontmatter.title}
              </h4>
              <span className="text-xs text-sand">
                {post.frontmatter.readingTime} min read
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Apply Now CTA */}
      <div className="bg-charcoal text-white rounded-lg p-6 shadow-lg topo-texture">
        <div className="relative z-10">
          <h3 className="text-lg font-semibold mb-3 text-white">Ready to Apply?</h3>
          <p className="text-sm text-stone mb-4">
            Join our team of Athletic Trainers serving in military healthcare
            programs across the United States.
          </p>
          <Link
            href="/job-description#apply-main"
            className="btn-accent w-full text-center inline-flex items-center justify-center gap-2"
          >
            Apply Now
            <span className="text-lg">➜</span>
          </Link>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-graphite text-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-warm-white mb-3">
          Stay Informed
        </h3>
        <p className="text-sm text-warm-white/80 mb-4">
          Get the latest insights on military athletic training careers
          delivered to your inbox.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-2 bg-charcoal border border-sand rounded-md focus:outline-none focus:ring-2 focus:ring-olive text-white placeholder-sand/60"
          />
          <button
            type="submit"
            className="btn-primary w-full"
          >
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}

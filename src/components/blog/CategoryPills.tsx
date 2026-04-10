"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface CategoryPillsProps {
  categories: string[];
  currentCategory?: string;
}

export default function CategoryPills({
  categories,
  currentCategory,
}: CategoryPillsProps) {
  const pathname = usePathname();
  const isIndexPage = pathname === "/blog";

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <Link
        href="/blog"
        className={`category-pill whitespace-nowrap ${
          isIndexPage && !currentCategory ? "bg-olive text-white shadow-md" : ""
        }`}
      >
        All
      </Link>
      {categories.map((category) => {
        const slug = category.toLowerCase().replace(/\s+/g, "-");
        const isActive = currentCategory === category;

        return (
          <Link
            key={category}
            href={`/blog/category/${slug}`}
            className={`category-pill whitespace-nowrap ${
              isActive ? "bg-olive text-white shadow-md" : ""
            }`}
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
}

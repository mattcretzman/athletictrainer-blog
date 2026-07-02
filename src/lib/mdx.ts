import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { calculateReadingTime, extractHeadings } from './utils';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');
const authorsDirectory = path.join(process.cwd(), 'content', 'authors');

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags?: string[];
  featuredImage?: string;
  published?: boolean;
  readingTime?: number;
  [key: string]: any;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  headings: { level: number; text: string; id: string }[];
}

export interface Author {
  slug: string;
  name: string;
  title: string;
  bio: string;
  image?: string;
  [key: string]: any;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory).filter((fn) => fn.endsWith('.mdx'));

  const posts = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Skip unpublished posts
      if (data.published === false) {
        return null;
      }

      // Skip future-dated posts (drip publishing)
      if (data.date && new Date(data.date) > new Date()) {
        return null;
      }

      return {
        slug,
        frontmatter: {
          ...data,
          readingTime: data.readingTime || calculateReadingTime(content),
        } as PostFrontmatter,
        content,
        headings: extractHeadings(content),
      };
    })
    .filter((post): post is Post => post !== null);

  // Sort by date, newest first
  posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: {
      ...data,
      readingTime: data.readingTime || calculateReadingTime(content),
    } as PostFrontmatter,
    content,
    headings: extractHeadings(content),
  };
}

export function getAuthorBySlug(slug: string): Author | null {
  const fullPath = path.join(authorsDirectory, `${slug}.json`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const data = JSON.parse(fileContents);

  return {
    slug,
    ...data,
  };
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set<string>();
  posts.forEach((post) => {
    if (post.frontmatter.category) {
      categories.add(post.frontmatter.category);
    }
  });
  return Array.from(categories).sort();
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(
    (post) => post.frontmatter.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
  );
}

export function getRelatedPosts(currentSlug: string, category: string, limit: number = 3): Post[] {
  return getAllPosts()
    .filter((post) => post.slug !== currentSlug && post.frontmatter.category === category)
    .slice(0, limit);
}

export function getFeaturedPosts(limit: number = 3): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.frontmatter.featured).slice(0, limit);
}

export function getPostsByAuthor(authorSlug: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.frontmatter.author === authorSlug);
}

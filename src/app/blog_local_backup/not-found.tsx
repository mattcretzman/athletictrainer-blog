import Link from "next/link";
import Container from "@/components/layout/Container";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray py-12">
      <Container>
        <div className="text-center">
          <h1 className="text-6xl font-bold text-navy mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-dark-text mb-6">
            Page Not Found
          </h2>
          <p className="text-gray-text mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It may have
            been moved or deleted.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/blog" className="btn-primary">
              Back to Blog
            </Link>
            <Link
              href="https://www.athletictrainerjob.com"
              className="btn-ghost"
            >
              Go to Main Site
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

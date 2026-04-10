import Link from "next/link";

export default function CTABanner() {
  return (
    <div className="bg-charcoal text-white py-12 my-12 rounded-lg shadow-lg topo-texture">
      <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Ready to Serve? Start Your Military Healthcare Career
        </h2>
        <p className="text-lg text-stone mb-6">
          Join our team and make a difference serving in Army H2F
          and Marine Corps SMIP programs across the United States.
        </p>
        <Link
          href="/job-description#apply-main"
          className="btn-accent inline-flex items-center gap-2"
        >
          Apply Now
          <span className="text-lg">➜</span>
        </Link>
      </div>
    </div>
  );
}

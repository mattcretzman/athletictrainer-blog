import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import { getWebinarBySlug, getWebinars } from "@/lib/webinars";

interface WebinarPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getWebinars().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: WebinarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const webinar = getWebinarBySlug(slug);
  if (!webinar) return {};

  return {
    title: `${webinar.title} | AthleticTrainerJob.com Webinar`,
    description: webinar.description.slice(0, 160),
    openGraph: {
      title: `${webinar.title} — Free Webinar`,
      description: webinar.description.slice(0, 160),
      type: "website",
      url: `https://www.athletictrainerjob.com/webinars/${webinar.slug}`,
    },
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function WebinarPage({ params }: WebinarPageProps) {
  const { slug } = await params;
  const webinar = getWebinarBySlug(slug);
  if (!webinar) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal text-white py-16 md:py-24 topo-texture">
        <Container>
          <div className="max-w-3xl relative z-10">
            <Link
              href="/webinars"
              className="inline-flex items-center gap-2 text-sand hover:text-white text-sm font-medium mb-6 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Webinars
            </Link>

            {!webinar.isPast ? (
              <span className="inline-block bg-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                Free Live Webinar
              </span>
            ) : (
              <span className="inline-block bg-graphite text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                Past Event
              </span>
            )}

            <h1
              className="text-3xl md:text-5xl font-bold mb-4 text-white"
              style={{ letterSpacing: "0.5px" }}
            >
              {webinar.title}
            </h1>
            {webinar.subtitle && (
              <p className="text-lg md:text-xl text-sand mb-6">
                {webinar.subtitle}
              </p>
            )}

            <div className="flex flex-wrap gap-6 text-sand text-sm md:text-base">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(webinar.date)}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {webinar.time}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Microsoft Teams
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-stone">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* About */}
              <div className="bg-warm-white rounded-xl border border-sand/30 p-8 mb-8">
                <h2 className="text-2xl font-bold text-charcoal mb-4">
                  About This Webinar
                </h2>
                <p className="text-graphite leading-relaxed text-lg">
                  {webinar.description}
                </p>
              </div>

              {/* Topics */}
              {webinar.topics.length > 0 && (
                <div className="bg-warm-white rounded-xl border border-sand/30 p-8 mb-8">
                  <h2 className="text-2xl font-bold text-charcoal mb-6">
                    What You'll Learn
                  </h2>
                  <ul className="space-y-4">
                    {webinar.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-olive/10 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-4 h-4 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-graphite text-lg">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Speakers */}
              {webinar.speakers.length > 0 && (
                <div className="bg-warm-white rounded-xl border border-sand/30 p-8">
                  <h2 className="text-2xl font-bold text-charcoal mb-6">
                    {webinar.speakers.length === 1 ? "Your Host" : "Speakers"}
                  </h2>
                  <div className="grid gap-6">
                    {webinar.speakers.map((speaker, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-navy rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {speaker.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="font-bold text-charcoal text-lg">
                            {speaker.name}
                          </div>
                          <div className="text-graphite">
                            {speaker.title}, {speaker.organization}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar — Registration CTA */}
            <div className="lg:col-span-1">
              <div className="bg-navy rounded-xl p-8 text-white sticky top-24">
                <h3 className="text-xl font-bold mb-2">
                  {webinar.isPast ? "This Event Has Ended" : "Register Now — It's Free"}
                </h3>
                <p className="text-white/70 text-sm mb-6">
                  {webinar.isPast
                    ? "This webinar has already taken place."
                    : "Save your spot for this free live webinar. Limited availability."}
                </p>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-center gap-3 text-white/80">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(webinar.date)}
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {webinar.time}
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                    Free — Online via Microsoft Teams
                  </div>
                </div>

                {!webinar.isPast && (
                  <a
                    href={webinar.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-red hover:bg-red/90 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg"
                  >
                    Register for Free &#10140;
                  </a>
                )}

                <p className="text-white/50 text-xs mt-4 text-center">
                  Hosted by Planned Systems International
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      {!webinar.isPast && (
        <section className="py-12 bg-parchment border-t border-sand/30">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">
                Ready to Level Up Your Career?
              </h2>
              <p className="text-graphite mb-8">
                Join this free webinar to learn how your athletic training skills
                can make a difference in military health and performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={webinar.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy/90 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
                >
                  Register for the Webinar &#10140;
                </a>
                <Link
                  href="/job-description"
                  className="inline-flex items-center justify-center gap-2 bg-warm-white hover:bg-white text-charcoal font-semibold py-4 px-8 rounded-lg border border-sand/50 transition-colors"
                >
                  View Open Positions
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

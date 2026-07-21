import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { getUpcomingWebinars, getPastWebinars } from "@/lib/webinars";

export const metadata: Metadata = {
  title: "Webinars | AthleticTrainerJob.com",
  description:
    "Free webinars for athletic trainers exploring military healthcare careers. Learn about H2F, SMIP, and career opportunities with PSI.",
  openGraph: {
    title: "Webinars | AthleticTrainerJob.com",
    description:
      "Free webinars for athletic trainers exploring military healthcare careers.",
    type: "website",
    url: "https://www.athletictrainerjob.com/webinars",
  },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function WebinarsIndex() {
  const upcoming = getUpcomingWebinars();
  const past = getPastWebinars();

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal text-white py-16 md:py-20 topo-texture">
        <Container>
          <div className="max-w-3xl relative z-10">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
              style={{ letterSpacing: "0.5px" }}
            >
              Webinars
            </h1>
            <p className="text-lg md:text-xl text-sand">
              Free live sessions exploring career opportunities for athletic
              trainers in military health and performance programs.
            </p>
          </div>
        </Container>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-12 md:py-16 bg-stone">
        <Container>
          {upcoming.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-8">
                Upcoming Webinars
              </h2>
              <div className="grid gap-8">
                {upcoming.map((webinar) => (
                  <Link
                    key={webinar.slug}
                    href={`/webinars/${webinar.slug}`}
                    className="block group"
                  >
                    <div className="bg-warm-white rounded-xl border border-sand/30 p-8 md:p-10 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex-1">
                          <span className="inline-block bg-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                            Live Webinar
                          </span>
                          <h3 className="text-2xl md:text-3xl font-bold text-charcoal group-hover:text-navy transition-colors mb-3">
                            {webinar.title}
                          </h3>
                          {webinar.subtitle && (
                            <p className="text-lg text-graphite mb-4">
                              {webinar.subtitle}
                            </p>
                          )}
                          <p className="text-graphite leading-relaxed mb-6">
                            {webinar.description.slice(0, 200)}...
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-graphite">
                            <span className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(webinar.date)}
                            </span>
                            <span className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {webinar.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-lg group-hover:bg-navy/90 transition-colors">
                            Learn More & Register
                            <span className="text-lg">&#10140;</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Past Webinars */}
          {past.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-8">
                Past Webinars
              </h2>
              <div className="grid gap-6">
                {past.map((webinar) => (
                  <Link
                    key={webinar.slug}
                    href={`/webinars/${webinar.slug}`}
                    className="block group"
                  >
                    <div className="bg-warm-white rounded-xl border border-sand/30 p-6 md:p-8 hover:shadow-md transition-shadow opacity-80 hover:opacity-100">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <span className="inline-block bg-graphite text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                            Past Event
                          </span>
                          <h3 className="text-xl font-bold text-charcoal group-hover:text-navy transition-colors mb-1">
                            {webinar.title}
                          </h3>
                          <p className="text-sm text-graphite">
                            {formatDate(webinar.date)} at {webinar.time}
                          </p>
                        </div>
                        <span className="text-olive font-medium text-sm group-hover:underline">
                          View Details &#10140;
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {upcoming.length === 0 && past.length === 0 && (
            <div className="text-center py-12">
              <p className="text-graphite text-lg">
                No webinars scheduled yet. Check back soon!
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

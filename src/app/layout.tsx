import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import WebinarBanner from "@/components/layout/WebinarBanner";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Athletic Trainer Career Resources | AthleticTrainerJob.com",
  description: "Career insights, program guides, and resources for athletic trainers exploring military healthcare opportunities with Army H2F and Marine Corps SMIP programs.",
  metadataBase: new URL('https://www.athletictrainerjob.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18172150443"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18172150443');
          `}
        </Script>
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <WebinarBanner />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

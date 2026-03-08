import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal mt-auto">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold mb-4 text-white">AthleticTrainerJob.com</div>
            <p className="text-sand text-sm mb-4">
              Cognito Systems, a Planned Systems International (PSI) joint venture, 
              connects certified Athletic Trainers with meaningful careers in military healthcare programs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://www.athletictrainerjob.com"
                  className="text-sand hover:text-white transition-colors"
                >
                  Main Site
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sand hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.athletictrainerjob.com/job-description"
                  className="text-sand hover:text-white transition-colors"
                >
                  Job Description
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.athletictrainerjob.com/job-description#apply-main"
                  className="text-sand hover:text-white transition-colors"
                >
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/planned-systems-international"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/PlannedSystemsInternational"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/psi_hq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand hover:text-white transition-colors"
                aria-label="X/Twitter"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 text-sm text-sand" style={{ borderTop: '1px solid #3A3A3C' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Cognito Systems, a Planned Systems International (PSI) joint venture. All rights reserved.</p>
            <p className="text-xs max-w-2xl text-center md:text-right">
              It is our policy to promote equal employment opportunities. All personnel decisions 
              are made without regard to race, color, religion, age, sex, sexual orientation, 
              pregnancy, gender identity, genetic information, national origin, citizenship status, 
              veteran status, disability, or any other characteristic protected by applicable law.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

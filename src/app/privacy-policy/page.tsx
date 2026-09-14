import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AthleticTrainerJob.com",
  description: "Privacy policy for AthleticTrainerJob.com",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: September 14, 2026</p>

      <div className="prose prose-lg max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <p>When you submit an application or inquiry through our website or ad forms, we collect the following information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Professional certification status</li>
            <li>Years of experience</li>
            <li>Relocation preferences</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p>We use the information you provide to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Evaluate your qualifications for Athletic Trainer positions at U.S. military installations</li>
            <li>Contact you about relevant career opportunities</li>
            <li>Communicate with you about the application process</li>
            <li>Improve our recruiting services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">Information Sharing</h2>
          <p>Your information may be shared with Planned Systems International, Inc. (PSI) and its affiliated entities for the purpose of evaluating your candidacy for Athletic Trainer positions. We do not sell your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">Your Rights</h2>
          <p>You may request access to, correction of, or deletion of your personal information at any time by contacting us at the email address below.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">Contact</h2>
          <p>For questions about this privacy policy or your personal data, contact:</p>
          <p className="mt-2">
            Planned Systems International, Inc.<br />
            Email: gladue@plan-sys.com<br />
            Phone: (703) 575-8400<br />
            Website: <a href="https://www.athletictrainerjob.com" className="text-blue-600 hover:underline">athletictrainerjob.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}

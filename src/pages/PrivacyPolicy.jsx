import React from "react";

const PrivacyPolicy=()=> {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
  <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-8 lg:p-12">
    <header className="mb-8">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-600">
        Last Modified: <strong>28th March 2025</strong>
      </p>
    </header>

    {/* -------------------- Organisation Details -------------------- */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Organisation Details
      </h2>
      <div className="text-gray-700 space-y-1">
        <p>
          <strong>Owner Name:</strong> Dhiraj Kantilal Jain
        </p>

        <p>
          <strong>Email ID:</strong>{" "}
          <a href="mailto:support@1XL.com" className="text-blue-600 hover:underline">
            support@1XL.com
          </a>
        </p>

        <p>
          <strong>Website:</strong>{" "}
          <a
            href="https://DrDhirajJain.com"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            DrDhirajJain.com
          </a>
        </p>

        <p>
          <strong>Registered Address (UAE):</strong>
          <br />
          Floor 141, Burj Khalifa, Dubai, P.O. Box No. 191234
        </p>

        <p>
          <strong>Registered Address (India):</strong>
          <br />
          Jainam Tower, Sai Park, Thergaon, Pune - 411033, Maharashtra, India
        </p>
      </div>
    </section>

    {/* -------------------- Introduction -------------------- */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Introduction</h2>
      <p className="text-gray-700">
        DrMamataJain.com values your privacy and is committed to protecting your personal data. 
        This Privacy Policy explains how we collect, use, share, and safeguard information when you 
        use our website and services, including SaaS products, online courses, events, podcasts, travel 
        bookings, and real estate services.
      </p>
      <p className="text-gray-700 mt-3">
        By accessing the Website and Services, you consent to the practices described in this Policy. 
        If you do not agree, please discontinue use of our Website and Services.
      </p>
    </section>

    {/* -------------------- Information We Collect -------------------- */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Information We Collect
      </h2>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-800">Personal Information</h3>
        <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
          <li>Name (First and Last)</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Mailing Address</li>
          <li>Job Titles / Company Name</li>
          <li>Usernames</li>
          <li>Authentication Data (Login Credentials)</li>
          <li>Billing Address</li>
          <li>Payment Card Details</li>
          <li>Communication Preferences</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-800">Usage Data</h3>
        <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
          <li>IP address</li>
          <li>Device type, browser type, operating system</li>
          <li>Pages visited, time spent, clicks & interactions</li>
          <li>Location data (if enabled)</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-800">Social Media Login Data</h3>
        <p className="text-gray-700">
          If you log in using Facebook, Google, or LinkedIn, we may collect:
        </p>
        <ul className="list-disc pl-5 text-gray-700 mt-2">
          <li>Name</li>
          <li>Email Address</li>
          <li>Profile Picture</li>
          <li>Public Account Information</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800">Sensitive Information</h3>
        <p className="text-gray-700 mt-2">
          We do not process sensitive information unless explicitly required and consented to. 
          This includes government-issued IDs, biometric data, medical data, and religious or political beliefs.
        </p>
      </div>
    </section>

    {/* -------------------- How We Use Your Information -------------------- */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        How We Use Your Information
      </h2>
      <p className="text-gray-700">We use your information to:</p>

      <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
        <li>Provide access to courses, events, SaaS tools, podcasts, and services</li>
        <li>Manage user accounts and preferences</li>
        <li>Process payments, subscriptions, bookings, and real estate transactions</li>
        <li>Send updates, notifications, and support messages</li>
        <li>Send promotional and marketing communications</li>
        <li>Ensure platform security and fraud prevention</li>
        <li>Comply with legal obligations</li>
      </ul>
    </section>

    {/* -------------------- Sharing Information -------------------- */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Sharing Your Information
      </h2>
      <p className="text-gray-700">We may share data with:</p>

      <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
        <li>Service providers (payment processors, hosting partners, marketing tools)</li>
        <li>Affiliates and business partners (for collaborations, events, real estate services)</li>
        <li>Legal authorities when required by law</li>
        <li>Entities in mergers, acquisitions, or business transfers</li>
      </ul>

      <p className="text-gray-700 mt-2">
        We do <strong>not</strong> sell, rent, or trade your personal data.
      </p>
    </section>

    {/* -------------------- Cookies -------------------- */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Cookies and Tracking Technologies
      </h2>
      <p className="text-gray-700">
        We use cookies, web beacons, and local storage to enhance your experience. 
        You may manage cookies through your browser settings.
      </p>
    </section>

    {/* -------------------- Social Logins -------------------- */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Social Media Logins
      </h2>
      <p className="text-gray-700">
        If you sign in using social platforms, we collect permitted profile data. 
        Nothing will be posted without your explicit consent. You may disconnect social logins anytime.
      </p>
    </section>

    {/* -------------------- Data Retention -------------------- */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Data Retention
      </h2>
      <p className="text-gray-700">
        We retain personal data only as long as necessary for service delivery, legal requirements, 
        fraud prevention, and dispute resolution. Afterward, data is deleted or anonymised.
      </p>
    </section>

    {/* -------------------- Security -------------------- */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Data Security
      </h2>
      <p className="text-gray-700">
        We use industry-standard security measures such as encryption, secure servers, and firewalls. 
        While no system is completely secure, we continuously improve our security practices.
      </p>
    </section>

    {/* -------------------- Rights -------------------- */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Privacy Rights</h2>

      <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
        <li>Right to access your data</li>
        <li>Right to correct inaccurate data</li>
        <li>Right to delete personal data</li>
        <li>Right to restrict processing</li>
        <li>Right to object to processing (including marketing)</li>
        <li>Right to data portability</li>
      </ul>

      <p className="text-gray-700 mt-2">
        To exercise these rights, contact:{" "}
        <a href="mailto:support@1XL.com" className="text-blue-600 hover:underline">
          support@1XL.com
        </a>
      </p>
    </section>

    {/* -------------------- DNT -------------------- */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Do Not Track (DNT)</h2>
      <p className="text-gray-700">
        We do not currently respond to DNT signals as no universal standard exists. 
        You may control data collection via browser settings.
      </p>
    </section>

    {/* -------------------- Updates -------------------- */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Updates to This Privacy Policy
      </h2>
      <p className="text-gray-700">
        This Privacy Policy may be updated periodically. The latest version will always appear here. 
        Significant updates may be communicated directly.
      </p>
    </section>

    {/* -------------------- Footer -------------------- */}
    <footer className="mt-8 border-t pt-6 text-sm text-gray-600">
      <p>
        <strong>Contact Information</strong>
        <br />
        For questions regarding this Privacy Policy:
        <br />
        Email:{" "}
        <a href="mailto:support@1XL.com" className="text-blue-600 hover:underline">
          support@1XL.com
        </a>
        <br />
        UAE Address: Floor 141, Burj Khalifa, Dubai, P.O. Box No. 191234
        <br />
        India Address: Jainam Tower, Sai Park, Thergaon, Pune - 411033, Maharashtra, India
      </p>

      <p className="mt-3">
        GDPR and UAE Data Protection Compliance:  
        We comply with GDPR for EU users and the UAE Data Protection Law for UAE users.
      </p>
    </footer>
  </div>
</main>

  );
}
export default PrivacyPolicy 
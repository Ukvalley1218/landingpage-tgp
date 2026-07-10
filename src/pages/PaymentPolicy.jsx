import React from 'react'

function PaymentPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-12 px-6 sm:px-12 lg:px-20">
  <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12 leading-relaxed">

    <header className="mb-8">
      <h1 className="text-3xl font-bold">Payment Policy</h1>
      <p className="mt-2 text-sm text-gray-600">Last Updated: 28 March 2025</p>
    </header>

    {/* ---------------- Organisation Details ---------------- */}
    <section className="mb-8">
      <p><strong>Owner Name:</strong> Dhiraj Kantilal Jain</p>

      <p>
        <strong>Website:</strong>{" "}
        <a href="https://DrDhirajJain.com" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
          DrDhirajJain.com
        </a>
      </p>

      <p>
        <strong>Email ID:</strong>{" "}
        <a href="mailto:support@1XL.com" className="text-blue-600 hover:underline">
          support@1XL.com
        </a>
      </p>

      <p className="mt-2">
        <strong>UAE Address:</strong> Floor 141, Burj Khalifa, Dubai, P.O. Box No. 191234
      </p>
      <p>
        <strong>India Address:</strong> Jainam Tower, Sai Park, Thergaon, Pune - 411033, Maharashtra, India
      </p>

      <p className="mt-4">
        This Payment Policy explains how payments, refunds, and billing processes work for all 
        services on DrDhirajJain.com, including SaaS tools, online courses, workshops, events, 
        podcasts, travel services, and related offerings.
      </p>
    </section>

    {/* ---------------- Section 1 ---------------- */}
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">1. Payment Currency</h2>
      <p>
        All payments made on DrDhirajJain.com are processed in <strong>United States Dollars (USD)</strong>
        unless otherwise specified. Payments in other currencies may incur exchange rate fees 
        as determined by your payment provider.
      </p>
    </section>

    {/* ---------------- Section 2 ---------------- */}
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">2. Accepted Payment Methods</h2>
      <p>We accept a wide range of secure global payment methods, including:</p>

      <h3 className="font-semibold mt-4">Credit & Debit Cards (International)</h3>
      <ul className="list-disc ml-6 space-y-1">
        <li>Visa</li>
        <li>MasterCard</li>
        <li>American Express</li>
        <li>Discover</li>
      </ul>

      <h3 className="font-semibold mt-4">Online Payment Gateways</h3>
      <ul className="list-disc ml-6 space-y-1">
        <li>PayPal</li>
        <li>Stripe</li>
        <li>Apple Pay</li>
        <li>Google Pay</li>
      </ul>

      <h3 className="font-semibold mt-4">Cryptocurrency (Optional)</h3>
      <ul className="list-disc ml-6 space-y-1">
        <li>Bitcoin</li>
        <li>Ethereum</li>
      </ul>

      <h3 className="font-semibold mt-4">Bank Transfers</h3>
      <p className="ml-6">International wire transfers are available for large transactions.</p>

      <p className="mt-4">
        All payments are encrypted and processed securely using industry-standard protocols.
      </p>
    </section>

    {/* ---------------- Section 3 ---------------- */}
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">3. Industry-Wise Payment Use</h2>

      <h3 className="font-semibold mt-4">SaaS Products</h3>
      <ul className="list-disc ml-6 space-y-1">
        <li>Billed monthly, quarterly, or annually.</li>
        <li>Auto-renews unless cancelled before renewal.</li>
        <li>Payment is required before access is granted.</li>
      </ul>

      <h3 className="font-semibold mt-4">Online Courses</h3>
      <ul className="list-disc ml-6 space-y-1">
        <li>One-time payments or instalments (if available).</li>
        <li>Immediate access upon successful payment.</li>
      </ul>

      <h3 className="font-semibold mt-4">Events (Workshops / Seminars)</h3>
      <ul className="list-disc ml-6 space-y-1">
        <li>Full payment required to confirm registration.</li>
        <li>First-paid, first-served basis.</li>
        <li>All event fees must be paid before entry.</li>
      </ul>

      <h3 className="font-semibold mt-4">Podcasts (Premium Subscriptions)</h3>
      <ul className="list-disc ml-6 space-y-1">
        <li>Monthly or annual billing cycles.</li>
        <li>Non-refundable once billed.</li>
      </ul>

      <h3 className="font-semibold mt-4">Travel Services</h3>
      <ul className="list-disc ml-6 space-y-1">
        <li>Full or partial payments required during booking.</li>
        <li>Remaining balance must be paid as per booking terms.</li>
      </ul>
    </section>

    {/* ---------------- Section 4 ---------------- */}
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">4. Invoicing & Receipts</h2>
      <p>
        After successful payment, an invoice will be emailed to you, which may include applicable 
        taxes depending on your location. Users can also view and download invoices through their 
        account dashboard for SaaS tools, courses, and event bookings.
      </p>
    </section>

    {/* ---------------- Section 5 ---------------- */}
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">5. Refund Policy</h2>

      <h3 className="font-semibold mt-4">SaaS Products</h3>
      <ul className="list-disc ml-6 space-y-1">
        <li>Refunds considered only within 7 days of first purchase, with less than 10% usage.</li>
        <li>No refunds after service use, even if within the 7-day window.</li>
      </ul>

      <h3 className="font-semibold mt-4">Online Courses</h3>
      <ul className="list-disc ml-6 space-y-1">
        <li>Refunds allowed within 3 days if less than 10% of content accessed.</li>
        <li>No refunds once 10%+ content has been accessed.</li>
      </ul>

      <h3 className="font-semibold mt-4">Events</h3>
      <ul className="list-disc ml-6 space-y-1">
        <li>Tickets are non-refundable.</li>
        <li>Transfer allowed if requested at least 5 days before the event.</li>
        <li>If event is cancelled, refund or reschedule credit will be provided.</li>
      </ul>

      <h3 className="font-semibold mt-4">Podcasts</h3>
      <ul className="list-disc ml-6 space-y-1">
        <li>Non-refundable once billed.</li>
        <li>Users may cancel future renewals anytime.</li>
      </ul>

      <h3 className="font-semibold mt-4">Travel Services</h3>
      <ul className="list-disc ml-6 space-y-1">
        <li>Refund is subject to third-party provider policies.</li>
        <li>Cancellation charges may apply.</li>
      </ul>
    </section>

    {/* ---------------- Section 6 ---------------- */}
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">6. Payment Failure & Chargebacks</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>No access granted until payment is fully processed.</li>
        <li>Chargebacks may result in suspension or permanent account termination.</li>
        <li>Repeated failures may lead to restricted service access.</li>
      </ul>
    </section>

    {/* ---------------- Section 7 ---------------- */}
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">7. Discounts, Coupons & Offers</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Valid only during the specified promotional period.</li>
        <li>Cannot be combined unless explicitly allowed.</li>
        <li>Misuse may lead to account suspension.</li>
      </ul>
    </section>

    {/* ---------------- Section 8 ---------------- */}
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">8. Auto-Renewal Subscriptions</h2>
      <p>
        Subscription-based services automatically renew according to your chosen billing 
        cycle. Your saved payment method will be charged at each renewal period.
      </p>

      <h3 className="font-semibold mt-2">Cancel Auto-Renewal</h3>
      <p>
        You may cancel auto-renewal anytime through your account dashboard or by contacting:{" "}
        <a href="mailto:support@1XL.com" className="text-blue-600 hover:underline">
          support@1XL.com
        </a>{" "}
        at least <strong>48 hours before renewal</strong>.
      </p>
    </section>

    {/* ---------------- Section 9 ---------------- */}
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">9. Refund Process</h2>
      <p>To request a refund, email:</p>
      <p className="mt-2">
        <a href="mailto:support@1XL.com" className="text-blue-600 hover:underline">
          support@1XL.com
        </a>
      </p>

      <p className="mt-4">Include the following details:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>Order number or subscription ID</li>
        <li>Reason for refund request</li>
        <li>Supporting documents (if any)</li>
      </ul>

      <p className="mt-4">
        Refunds will be issued to the original payment method. Processing times depend on 
        your bank or payment provider.
      </p>
    </section>

    {/* ---------------- Footer ---------------- */}
    <footer className="mt-10 border-t pt-6 text-sm text-gray-600">
      <p>
        By using services on DrDhirajJain.com, you acknowledge and accept the terms of this 
        Payment Policy.
      </p>

      <p className="mt-4">
        © {new Date().getFullYear()} DrDhirajJain.com. All Rights Reserved.
      </p>
    </footer>

  </article>
</main>

  )
}

export default PaymentPolicy

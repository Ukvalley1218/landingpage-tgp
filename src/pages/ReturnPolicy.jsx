// ReturnPolicy.jsx
// React + Tailwind component for 1XL LLC FZ and One XL Info LLP
// Created: 25 Oct 2025

import React from "react";

const ReturnPolicy=()=> {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-12 px-6 sm:px-12 lg:px-20">
  <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
    <header className="mb-8">
      <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
        Return Policy
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        Last Modified: <time dateTime="2025-03-28">28 March 2025</time>
      </p>
    </header>

    {/* ---------------- Organisation Details ---------------- */}
    <section className="prose prose-md max-w-none mb-6">
      <p>
        <strong>Owner Name:</strong> Dhiraj Kantilal Jain
      </p>
      <p>
        <strong>Email ID:</strong>{" "}
        <a href="mailto:support@1XL.com" className="text-indigo-600 hover:underline">
          support@1XL.com
        </a>
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a
          href="https://DrDhirajJain.com"
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 hover:underline"
        >
          DhirajJain.com
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

      <p className="mt-4">
        At DhirajJain.com, providing quality services and transparency is of utmost 
        importance. This Refund & Cancellation Policy (the "Policy") explains how refunds, 
        cancellations, and fee adjustments are handled for all services offered, including 
        SaaS platforms, online courses, events, podcasts, travel bookings, real estate 
        services, and related offerings.
      </p>
      <p>
        By using any of our services, you agree to the terms outlined in this Policy. If you 
        do not agree, please refrain from using the services.
      </p>
    </section>

    {/* ---------------- General Cancellation Terms ---------------- */}
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">
        General Terms for Subscription and Service Cancellation
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>
          <strong>Cancellation Effective Date:</strong> When you cancel a subscription, the 
          cancellation takes effect at the end of the current billing period. You will 
          continue to have access until the end of that cycle.
        </li>

        <li>
          <strong>No Refund for Unused Periods:</strong> No refunds are issued for unused 
          portions of a subscription. If you cancel early, the remaining days are not 
          refundable.
        </li>

        <li>
          <strong>How to Cancel:</strong> Log in to your account and follow the cancellation 
          instructions. For help, contact{" "}
          <a href="mailto:mamata@DrMamataJain.com" className="text-indigo-600 hover:underline">
            support@1XL.com
          </a>.
        </li>
      </ul>
    </section>

    {/* ---------------- Fee Changes ---------------- */}
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Fee Changes and Price Adjustments</h2>
      <p className="text-gray-700">
        Service fees may be adjusted due to market conditions, inflation, service upgrades, 
        or other business-related factors. Users will be notified of any price changes in 
        advance through email. Changes apply only after the notification period.
      </p>
    </section>

    {/* ---------------- Credit-Based Products ---------------- */}
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Credit-Based Products</h2>
      <p className="text-gray-700">
        Some services may use a credit system (e.g., SaaS credits, course credits, event 
        credits). Once purchased, credits are non-refundable and cannot be exchanged for 
        cash or other services. Ensure you intend to use the credits before purchase.
      </p>
    </section>

    {/* ---------------- Subscription-Based Products ---------------- */}
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Subscription-Based Products</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>
          <strong>Cancellation:</strong> You may cancel anytime, but no refund is provided 
          for any remaining subscription period.
        </li>

        <li>
          <strong>Continued Access:</strong> You will retain access until the end of your 
          billing cycle; after that, access is terminated and no further charges apply.
        </li>
      </ul>
    </section>

    {/* ---------------- Event Refunds & Cancellations ---------------- */}
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Event Refunds & Cancellations</h2>
      <p className="text-gray-700">
        This applies to workshops, conferences, seminars, and other events.
      </p>

      <div className="mt-4 space-y-4 text-gray-700">
        <div>
          <h3 className="font-semibold">Ticket Delivery</h3>

          <p className="mt-1">
            <strong>Digital Tickets:</strong> A QR code will be sent to your email. Ensure 
            your email is correct. QR code is required for event entry.
          </p>

          <p className="mt-1">
            <strong>Physical Tickets:</strong> Physical tickets will be mailed to the 
            address provided. We are not responsible for undelivered tickets due to 
            incorrect addresses.
          </p>

          <p className="mt-1">
            <strong>Pick-Up Option:</strong> If chosen, tickets must be collected within the 
            specified timeframe. Uncollected tickets may be cancelled without refund.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Ticket Cancellation</h3>
          <p className="mt-1">
            Once confirmed, ticket purchases cannot be cancelled. Users must ensure they 
            can attend before booking.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Ticket Transfers</h3>
          <p className="mt-1">
            You may transfer tickets if:
          </p>
          <ul className="list-disc ml-6 mt-1 space-y-1">
            <li>Request is submitted at least 7 days before the event.</li>
            <li>
              Email request is sent to{" "}
              <a
                href="mailto:support@1XL.com"
                className="text-indigo-600 hover:underline"
              >
                support@1XL.com
              </a>{" "}
              with full details of original and new attendees.
            </li>
          </ul>
          <p className="mt-1">
            Requests may be denied if incomplete or submitted late.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Promotions & Offers</h3>
          <p className="mt-1">
            Early Bird and promotional offers may have specific terms. Discounts cannot be 
            applied retroactively to earlier purchases.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Event Cancellation or Postponement</h3>
          <p className="mt-1">
            If an event is cancelled or rescheduled:
          </p>
          <ul className="list-disc ml-6 mt-1 space-y-1">
            <li>Users may receive a refund or credit as per organiser policy.</li>
            <li>Administrative or processing fees may be non-refundable.</li>
            <li>
              For rescheduled events, users may attend the new date or request a refund.
            </li>
          </ul>
        </div>
      </div>
    </section>

    {/* ---------------- Payments & Financial Transactions ---------------- */}
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Payments & Financial Transactions</h2>
      <p className="text-gray-700">
        All transactions are processed by third-party providers (e.g., PayPal, credit card 
        processors). MamataJain.com does not store any payment information. Users should 
        refer to the payment provider’s privacy policy for more details.
      </p>

      <h3 className="mt-4 font-semibold">Payment Failure & Chargebacks</h3>
      <p className="text-gray-700 mt-1">
        If a payment fails, service access may be suspended until the payment is completed. 
        Chargebacks or disputes may result in temporary service suspension until resolved.
      </p>
    </section>

    {/* ---------------- Footer ---------------- */}
    <footer className="pt-6 border-t border-gray-100 text-sm text-gray-600">
      <p>
        For questions regarding this Policy, please contact{" "}
        <a href="mailto:support@1XL.com" className="text-indigo-600 hover:underline">
          support@1XL.com
        </a>.
      </p>

      <div className="mt-4">
        <p className="font-medium">Registered Addresses</p>
        <address className="not-italic text-gray-700 mt-1">
          UAE: Floor 141, Burj Khalifa, Dubai, P.O. Box No. 191234 <br />
          India: Jainam Tower, Sai Park, Thergaon, Pune - 411033, Maharashtra, India
        </address>
      </div>

      <p className="mt-6">
        © {new Date().getFullYear()} DhirajJain.com. All rights reserved.
      </p>
    </footer>
  </article>
</main>

  );
}
export default ReturnPolicy 
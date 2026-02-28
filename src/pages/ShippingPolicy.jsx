import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800 leading-relaxed shadow-2xl my-12">
      <h1 className="text-3xl font-bold text-left text-[#213825] mb-6">
        Shipping Policy
      </h1>

      <p className="mb-4">
        <strong>Owner Name:</strong> Dr. Dhiraj Kantilal Jain
      </p>

      <p className="mb-4">
        <strong>Email ID:</strong>{" "}
        <a href="mailto:support@1XL.com" className="text-blue-600 hover:underline">
          support@1XL.com
        </a>
      </p>

      <p className="mb-4">
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

      <p className="mb-4">
        <strong>Registered Address (UAE):</strong> Floor 141, Burj Khalifa, Dubai, P.O. Box No.
        191234
      </p>

      <p className="mb-4">
        <strong>Registered Address (India):</strong> Jainam Tower, Sai Park, Thergaon, Pune -
        411033, Maharashtra, India
      </p>

      <p className="mb-6 italic">
        Last Modified: 28th March 2025
      </p>

      <p className="mb-6">
        This Shipping & Delivery Policy ("Policy") applies to all purchases made through
        DrDhirajJain.com, including physical products, event tickets, and related services. By
        purchasing from the Website, users agree to the terms outlined in this Policy.
      </p>

      {/* ----------------------- Section 1 ----------------------- */}
      <h2 className="text-2xl font-semibold text-[#213825] mt-10 mb-4">
        1. General Terms
      </h2>
      <p className="mb-4">
        By purchasing products or services, users agree to pay for the items selected. Prices
        may change at the Website’s discretion. Orders may be rejected or cancelled if they are
        based on inaccurate information provided by the user. The Website may request
        additional verification before confirming any order. Restrictions may apply to certain
        services.
      </p>

      {/* ----------------------- Section 2 ----------------------- */}
      <h2 className="text-2xl font-semibold text-[#213825] mt-8 mb-4">
        2. Delivery Process
      </h2>

      <h3 className="font-semibold mt-3">Order Confirmation</h3>
      <p className="mb-4">
        After placing an order and completing payment, an order confirmation email will be
        sent. This confirms that the order is being processed.
      </p>

      <h3 className="font-semibold">Shipping Timeframes</h3>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li><strong>Domestic (UAE):</strong> 5–7 business days</li>
        <li><strong>International:</strong> 7–15 business days (varies by destination)</li>
      </ul>
      <p className="mb-4">
        Delivery timelines are estimates and may vary due to customs delays, courier issues,
        weather conditions, or unforeseen circumstances.
      </p>

      <h3 className="font-semibold">Delivery Methods</h3>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Standard Shipping — available for all physical products and event tickets</li>
        <li>Expedited Shipping — 1–3 business days (additional charges apply)</li>
      </ul>

      <h3 className="font-semibold">Shipping Fees</h3>
      <p className="mb-6">
        Shipping fees are calculated based on address, product weight, and delivery method.
        These are shown at checkout. Additional handling fees may apply for certain items or
        locations.
      </p>

      {/* ----------------------- Section 3 ----------------------- */}
      <h2 className="text-2xl font-semibold text-[#213825] mt-8 mb-4">
        3. Event Ticket Shipment and Delivery
      </h2>

      <h3 className="font-semibold">Digital Tickets</h3>
      <p className="mb-3">
        Digital tickets with QR codes will be sent to the registered email address. The QR code
        is required for event entry. Users must ensure their email address is correct.
      </p>

      <h3 className="font-semibold">Physical Tickets</h3>
      <p className="mb-3">
        If users select physical delivery, tickets will be shipped to the address provided. The
        Website is not responsible for undelivered tickets due to incorrect addresses.
      </p>

      <h3 className="font-semibold">Pick-Up Option</h3>
      <p className="mb-6">
        Tickets must be collected within the specified timeframe. Failure to collect may result
        in cancellation without refund.
      </p>

      {/* ----------------------- Section 4 ----------------------- */}
      <h2 className="text-2xl font-semibold text-[#213825] mt-8 mb-4">
        4. Shipment Delays and Issues
      </h2>
      <p className="mb-4">
        If a shipment is delayed or not received within the expected timeframe, contact us at{" "}
        <a href="mailto:support@1XL.com" className="text-blue-600 hover:underline">
          support@1XL.com
        </a>{" "}
        immediately.
      </p>

      <p className="mb-4">
        If a shipment appears lost or damaged, notify us within 14 days of the expected delivery
        date. An investigation will be conducted, and a replacement or refund will be issued if
        applicable.
      </p>

      {/* ----------------------- Section 5 ----------------------- */}
      <h2 className="text-2xl font-semibold text-[#213825] mt-8 mb-4">
        5. Incorrect or Incomplete Address
      </h2>
      <ul className="list-disc ml-6 mb-6 space-y-2">
        <li>Users must ensure all shipping details are accurate before placing an order.</li>
        <li>The Website is not responsible for losses due to incorrect or incomplete addresses.</li>
        <li>Reshipping may incur additional charges.</li>
      </ul>

      {/* ----------------------- Section 6 ----------------------- */}
      <h2 className="text-2xl font-semibold text-[#213825] mt-8 mb-4">
        6. Refunds and Exchanges
      </h2>
      <p className="mb-6">
        For refund or exchange requests, refer to the Refund & Cancellation Policy. All returns
        and refunds are governed by that policy.
      </p>

      {/* ----------------------- Section 7 ----------------------- */}
      <h2 className="text-2xl font-semibold text-[#213825] mt-8 mb-4">
        7. Policy Updates
      </h2>
      <p className="mb-6">
        The Website may update this Shipping & Delivery Policy periodically. Updates will be
        posted on this page. Continued use of services indicates acceptance of the updated
        policy.
      </p>

      {/* ----------------------- Section 8 ----------------------- */}
      <h2 className="text-2xl font-semibold text-[#213825] mt-8 mb-4">
        8. Legal Compliance
      </h2>
      <p className="mb-6">
        This Policy is governed by applicable laws in the UAE and India. Any disputes will be
        resolved according to the terms and conditions of DrDhirajJain.com.
      </p>

      <hr className="my-10 border-gray-300" />

      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} DrDhirajJain.com. All rights reserved. This policy may
        be updated without prior notice as required by law or business needs.
      </p>
    </div>

  );
};

export default ShippingPolicy;

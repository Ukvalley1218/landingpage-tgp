import { Check, CreditCard, Shield, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import book from "../assets/book5/book_img.png";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedType = params.get("type") || "ebook"; // default ebook

  const [showForm, setShowForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setloading] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [country, setCountry] = useState("India");
  const [comboSelected, setComboSelected] = useState(false);

  const [pricing, setPricing] = useState({
    ebook: { actual: 499, discount: 99 },
    hardcopy: { actual: 1499, discount: 749 },
    combo: { actual: 1998, discount: 848 },
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // Detect country for price adjustments
  // Detect country and set pricing dynamically
  useEffect(() => {
    const fetchLocationAndSetPricing = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        const ipCountryName = data.country_name?.trim() || "Other";
        let updatedCurrency, updatedSymbol, updatedPricing;

        // 🌍 Country-based logic
        switch (ipCountryName) {
          case "India":
            updatedCurrency = "INR";
            updatedSymbol = "₹";
            updatedPricing = {
              ebook: { actual: 499, discount: 99 },
              hardcopy: { actual: 2499, discount: 899 },
              combo: { actual: 1998, discount: 848 },
            };
            break;

          case "United Arab Emirates":
          case "UAE":
          case "Dubai":
            updatedCurrency = "AED";
            updatedSymbol = "د.إ";
            updatedPricing = {
              ebook: { actual: 25, discount: 12 },
              hardcopy: { actual: 103.42, discount: 37.28 },
              combo: { actual: 95, discount: 40 },
            };
            break;

          default:
            updatedCurrency = "USD";
            updatedSymbol = "$";
            updatedPricing = {
              ebook: { actual: 5, discount: 2 },
              hardcopy: { actual: 28.14, discount: 10.14 },
              combo: { actual: 25, discount: 11 },
            };
            break;
        }

        // ✅ Update all relevant states
        setCountry(ipCountryName);
        setCurrency(updatedCurrency);
        setSymbol(updatedSymbol);
        setPricing(updatedPricing);
        setFormData((prev) => ({ ...prev, country: ipCountryName }));

        console.log("Detected Country:", ipCountryName);
      } catch (error) {
        console.error("Location detection failed:", error);

        // 🌐 Fallback (USD)
        setCountry("Other");
        setCurrency("USD");
        setSymbol("$");
        setPricing({
          ebook: { actual: 5, discount: 2 },
          hardcopy: { actual: 20, discount: 10 },
          combo: { actual: 25, discount: 11 },
        });
      }
    };

    fetchLocationAndSetPricing();
  }, []);



  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle combo selection
  const handleComboToggle = () => {
    setComboSelected(!comboSelected);
  };

  // Get current price details
  const currentPricing = comboSelected
    ? pricing.combo
    : selectedType === "hardcopy"
      ? pricing.hardcopy
      : pricing.ebook;

  const handleProceedPayment = async () => {
    const bookType = comboSelected ? "combo" : selectedType;
    const bookCode = "tfrh"; // same for all

    // Basic validation
    const requiredFields = ["name", "phone", "email", "address", "city", "state", "pincode"];
    for (const field of requiredFields) {
      if (!formData[field]?.trim()) {
        alert(`Please enter ${field}`);
        return;
      }
    }
    if (!formData.email.includes("@")) return alert("Enter a valid email");

    setIsProcessing(true);

    try {
      const paymentRes = await fetch(
        "https://drmamatajain.valleyhoster.com/api/createPayment_t2",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            mobile: formData.phone,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            country,
            book_type: bookType,
            book_code: bookCode,
            book_name: "Tax Free Rental Health",
            book_link:
              "https://drive.google.com/drive/folders/1DBla0u6dl3uXbX6KJ11UA5sUtc7fCjiB",
            book_amount: currentPricing.discount.toString(),
            currency,
          }),
        }
      );

      const text = await paymentRes.text();
      const data = JSON.parse(text);

      if (!data.success) {
        alert("Payment initiation failed!");
        setIsProcessing(false);
        return;
      }

      // ✅ Gateway selection logic
      if (country === "India") {
        // ------------------- RAZORPAY -------------------
        const options = {
          key: data.key,
          amount: data.amount,
          currency: data.currency,
          name: "Dreams To Reality",
          description: "Book Purchase",
          order_id: data.order_id,
          handler: async (response) => {
            setloading(true);
            try {
              const verifyRes = await fetch(
                "https://drmamatajain.valleyhoster.com/api/verifyPayment_t2",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    gateway: "razorpay",
                  }),
                }
              );
              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                navigate(`/books/tgp/success?gateway=razorpay`);
              } else {
                alert("Payment verification failed");
              }
            } catch (verifyErr) {
              console.error("Verification Error:", verifyErr);
              alert("Verification request failed.");
            } finally {
              setloading(false);
            }
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // ------------------- STRIPE -------------------
        window.location.href = data.url; // Stripe checkout redirect URL from backend
      }
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Something went wrong during payment.");
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT SECTION — Book Info + Combo Suggestion */}
          <div className="bg-gradient-to-b from-[#D9B0FF] via-[#7B4BB6] to-[#7B4BB6] p-10 flex flex-col justify-center text-white">
            {/* Book Title */}
            <h3 className="text-3xl font-bold mb-3">
              {comboSelected
                ? "Dreams To Reality Combo Pack"
                : selectedType === "hardcopy"
                  ? "Dreams To Reality Hardcover"
                  : "Dreams To Reality E-Book"}
            </h3>

            <p className="text-sm mb-6 max-w-md">
              Transform your journey from dreams to reality through powerful insights and actionable tools.
            </p>

            <div className="flex gap-6 text-sm mb-8">
              <span className="flex items-center gap-2">
                <Shield size={16} /> Secure Payment
              </span>
              <span className="flex items-center gap-2">
                <Check size={16} /> Instant Access
              </span>
            </div>

            {/* Combo Suggestion (only show if combo not yet selected) */}
            {!comboSelected && (
              <div className="bg-gradient-to-r from-blue-50/20 to-blue-100/20 border border-white/30 p-6 rounded-2xl shadow-inner hover:shadow-lg transition">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  🌟 Upgrade to Combo & Save More!
                </h4>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  {selectedType === "ebook" ? (
                    <>
                      <div className="bg-white text-gray-800 rounded-xl shadow-md border border-gray-100 p-4 flex flex-col items-center w-32">
                        <img loading = "lazy" src={book} alt="" />
                        <p className="text-sm font-semibold">E-Book</p>
                        <p className="text-xs text-green-600 font-semibold mt-1">
                          {symbol}{pricing.ebook.discount.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex flex-col items-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>

                      <div className="bg-white text-gray-800 rounded-xl shadow-md border border-gray-100 p-4 flex flex-col items-center w-32">
                        <img loading = "lazy" src={book} alt="" />
                        <p className="text-sm font-semibold">Hardcover</p>
                        <p className="text-xs text-green-600 font-semibold mt-1">
                          {symbol}{pricing.hardcopy.discount.toLocaleString()}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white text-gray-800 rounded-xl shadow-md border border-gray-100 p-4 flex flex-col items-center w-32">
                        <img loading = "lazy" src={book} alt="" />
                        <p className="text-sm font-semibold">Hardcover</p>
                        <p className="text-xs text-green-600 font-semibold mt-1">
                          {symbol}{pricing.hardcopy.discount.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex flex-col items-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>

                      <div className="bg-white text-gray-800 rounded-xl shadow-md border border-gray-100 p-4 flex flex-col items-center w-32">
                        <img loading = "lazy" src={book} alt="" />
                        <p className="text-sm font-semibold">E-Book</p>
                        <p className="text-xs text-green-600 font-semibold mt-1">
                          {symbol}{pricing.ebook.discount.toLocaleString()}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-5 bg-white/20 border border-white/30 rounded-xl p-4 text-sm">
                  <div className="flex justify-between border-b text-black border-white/30 pb-2 mb-2">
                    <span>Individual Total</span>
                    <span>
                      {symbol}
                      {(pricing.ebook.discount + pricing.hardcopy.discount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-black">
                    <span>Combo Offer Price</span>
                    <span>{symbol}{pricing.combo.discount.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleComboToggle}
                  className="mt-5 bg-white text-blue-700 hover:bg-blue-100 transition-all duration-200 px-6 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg"
                >
                  Add Combo & Save Now
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SECTION — Order Summary */}
          <div className="p-10 flex flex-col justify-between bg-gradient-to-b from-gray-50 to-white">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 space-y-4">
                <div className="flex justify-between text-gray-700 text-lg">
                  <span>Book Value</span>
                  <span className="font-semibold">
                    {symbol}{currentPricing.actual.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700 text-lg">
                  <span>Discounted Price</span>
                  <span className="text-black font-semibold">
                    {symbol}{currentPricing.discount.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-black">
                    {symbol}{currentPricing.discount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Combo Details (visible only when comboSelected === true) */}
              {comboSelected && (
                <div className="mt-6 bg-blue-50 border border-blue-200 p-5 rounded-2xl shadow-sm">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    📦 Combo Added
                  </h4>
                  <div className="flex justify-center items-center gap-6 mb-4">
                    <div className="flex flex-col items-center">
                      <p className="text-sm font-semibold text-gray-700">Hardcover</p>
                      <p className="text-xs text-green-600 font-semibold">
                        {symbol}{pricing.hardcopy.discount.toLocaleString()}
                      </p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <div className="flex flex-col items-center">
                      <p className="text-sm font-semibold text-gray-700">E-Book</p>
                      <p className="text-xs text-green-600 font-semibold">
                        {symbol}{pricing.ebook.discount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-center text-blue-700 font-bold">
                    Total Combo Price: {symbol}{pricing.combo.discount.toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            {/* Pay Button */}
            <div className="mt-8">
              <button
                onClick={() => setShowForm(true)}
                className="cursor-pointer w-full bg-gradient-to-b from-[#D9B0FF] via-[#7B4BB6] to-[#7B4BB6] transition-all duration-200 text-white py-4 font-bold rounded-full text-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart size={22} />
                Pay Now – {symbol}{currentPricing.discount.toLocaleString()}
              </button>
            </div>
          </div>

        </div>
      </div>





      {/* Popup Form */}
      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md md:max-w-lg  shadow-2xl p-6 sm:p-8 relative animate-fade-in-up overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Enter Your Details
            </h3>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border placeholder-gray-400 border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-teal-600 outline-none"
                  required
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Contact Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border placeholder-gray-400 border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-teal-600 outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email ID"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border placeholder-gray-400 border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-teal-600 outline-none"
                  required
                />
              </div>

              {/* Address and Location Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Full Address */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Address
                  </label>
                  <textarea
                    name="address"
                    placeholder="Enter full address (House No, Street, Area, Landmark)"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border placeholder-gray-400 border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-teal-600 outline-none min-h-[90px] resize-none"
                    maxLength={250}
                    required
                  ></textarea>
                  <p
                    className={`text-right text-sm mt-1 ${formData.address.length >= 250 ? "text-red-500" : "text-gray-500"
                      }`}
                  >
                    {formData.address.length}/250
                  </p>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border placeholder-gray-400 border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-teal-600 outline-none"
                    required
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="Enter State"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border placeholder-gray-400 border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-teal-600 outline-none"
                    required
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter 6-digit Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full border placeholder-gray-400 border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-teal-600 outline-none"
                    maxLength={6}
                    pattern="\d{6}"
                    required
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border placeholder-gray-400 text-black border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-teal-600 outline-none bg-white"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={handleProceedPayment}
                disabled={isProcessing}
                className="cursor-pointer w-full bg-gradient-to-b from-[#D9B0FF] via-[#7B4BB6] to-[#7B4BB6] text-white font-bold text-lg py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Proceed to Payment"}
              </button>
            </div>
          </div>
        </div>

      )}

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg font-medium">Processing your payment...</p>
        </div>
      )}
    </div>
  );
}

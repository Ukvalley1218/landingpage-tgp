import {
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying your payment...");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // Cross sell state
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [crossSellError, setCrossSellError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");

  // Currency/Region state
  const [userRegion, setUserRegion] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [country, setCountry] = useState("");

  // Pricing from API
  const [pricingData, setPricingData] = useState(null);

  const gateway = searchParams.get("gateway");
  const navigate = useNavigate();

  /* ================= HELPER: SET REGION + SYMBOL ================= */
  const applyRegion = (currency) => {
    setUserRegion(currency);
    setSymbol(currency === "INR" ? "₹" : currency === "AED" ? "د.إ" : "$");
    localStorage.setItem("userRegion", currency);
  };

  /* ================= FETCH PRICING FROM API ================= */
  const fetchDynamicPricing = async () => {
    try {
      const res = await fetch("https://drmamatajain.valleyhoster.com/api/price/tgp");
      const data = await res.json();
      if (data?.status && data?.product) {
        setPricingData(data.product);
        console.log("Pricing data fetched:", data.product);
      }
    } catch (err) {
      console.error("Failed to fetch pricing:", err);
    }
  };

  /* ================= DETECT USER REGION VIA IP ================= */
useEffect(() => {
  const detectRegion = async () => {
    try {
      // 1️⃣ URL param (highest priority)
      const regionParam = searchParams.get("region");
      if (regionParam) {
        console.log("Region from URL:", regionParam);
        applyRegion(regionParam.toUpperCase());
        return;
      }

      // 2️⃣ Always detect from IP (NOT localStorage first)
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();

      const ipCountryName = data.country_name?.trim() || "Unknown";

      let detectedCurrency = "USD";

      if (ipCountryName === "India") {
        detectedCurrency = "INR";
      }
      else if (
        ipCountryName === "United Arab Emirates" ||
        ipCountryName === "UAE" ||
        ipCountryName === "Dubai"
      ) {
        detectedCurrency = "AED";
      }
      else if (ipCountryName === "United States") {
        detectedCurrency = "USD";
      }

      console.log("IP Country:", ipCountryName);
      console.log("Detected Currency:", detectedCurrency);

      setCountry(ipCountryName);
      applyRegion(detectedCurrency);

    } catch (error) {
      console.error("IP detection failed:", error);

      // 3️⃣ fallback to localStorage ONLY if IP fails
      const savedRegion = localStorage.getItem("userRegion");

      if (savedRegion) {
        applyRegion(savedRegion);
      } else {
        applyRegion("USD");
      }
    }
  };

  detectRegion();

}, [searchParams]);

  useEffect(() => {
  if (!userRegion) return;

  fetchDynamicPricing();
  

}, [userRegion]);
  /* ================= HELPER: GET PRICE BY REGION ================= */
  const getPriceInfo = (item) => {
    // For cross-sell products, use item fields
    // For main product, use pricingData
    const source = item || pricingData;
    if (!source) return { symbol, discountPrice: null, originalPrice: null };

    switch (userRegion) {
      case "AED":
        return {
          currency: "AED",
          symbol: "د.إ ",
          discountPrice: source.ebook_discount_aed,
          originalPrice: source.ebook_aed,
          hardcopyDiscount: source.hardcopy_discount_aed,
          hardcopyOriginal: source.hardcopy_aed,
        };
      case "USD":
        return {
          currency: "USD",
          symbol: "$",
          discountPrice: source.ebook_discount_usd,
          originalPrice: source.ebook_usd,
          hardcopyDiscount: source.hardcopy_discount_usd,
          hardcopyOriginal: source.hardcopy_usd,
        };
      case "INR":
      default:
        return {
          currency: "INR",
          symbol: "₹",
          discountPrice: source.ebook_discount_inr,
          originalPrice: source.ebook_inr,
          hardcopyDiscount: source.hardcopy_discount_inr,
          hardcopyOriginal: source.hardcopy_inr,
        };
    }
  };

  /* ================= PAYMENT VERIFY ================= */
  useEffect(() => {
    async function verify() {
      try {
        if (gateway === "stripe") {
          const sessionId = searchParams.get("session_id");

          const res = await fetch(
            "https://drmamatajain.valleyhoster.com/api/verifyPayment_t5",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                session_id: sessionId,
                gateway: "stripe",
              }),
            }
          );

          const data = await res.json();
          console.log("Payment data:", data);

          if (data?.success) {
            setStatus("Your payment was successful!");
            setSuccess(true);
          } else {
            setStatus("Payment verification failed.");
          }
        } else if (gateway === "razorpay") {
          setStatus("Your payment was successful!");
          setSuccess(true);
        } else {
          setStatus("Unknown payment gateway.");
        }
      } catch (err) {
        console.error("Payment verify error:", err);
        setStatus("Verification failed. Please contact support.");
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [gateway, searchParams]);

  /* ================= CROSS SELL FETCH ================= */
 useEffect(() => {
  if (!success || !userRegion) return;

  async function fetchCrossSelling() {
    try {
      setLoadingProducts(true);
      setCrossSellError(false);
      setErrorDetails("");

      const res = await fetch(
        "https://drmamatajain.valleyhoster.com/api/cross_selling",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: "tgp" }),
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

      const data = await res.json();
      if (!data?.status) throw new Error("API returned status=false");

      setProducts(data.cross_sell_products || []);

    } catch (err) {
      console.error("Cross sell fetch error:", err);
      setCrossSellError(true);
      setErrorDetails(err.message);
    } finally {
      setLoadingProducts(false);
    }
  }

  fetchCrossSelling();

}, [success, userRegion]); // ✅ THIS IS THE FIX

  // Split products into two rows
  const midPoint = Math.ceil(products.length / 2);
  const topRowProducts = products.slice(0, midPoint);
  const bottomRowProducts = products.slice(midPoint);

  /* ================= PRODUCT CARD COMPONENT ================= */
  const ProductCard = ({ item }) => {
    const priceInfo = getPriceInfo(item);
    const hasPrice = priceInfo.discountPrice && priceInfo.originalPrice;

    return (
      <div className="flex-shrink-0 w-[280px] border rounded-2xl p-5 shadow hover:shadow-lg transition bg-white mx-3">
        <div className="w-full h-48 mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={`https://pluto.1xl.com/storage/app/public/funnels/${item.image}`}
            alt={item.name}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://via.placeholder.com/300x400?text=${encodeURIComponent(item.name)}`;
            }}
          />
        </div>

        <h3 className="font-bold text-lg mb-3 line-clamp-2 min-h-[3.5rem]">
          {item.name}
        </h3>

        {hasPrice && (
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-green-600">
                {priceInfo.symbol}{priceInfo.discountPrice}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {priceInfo.symbol}{priceInfo.originalPrice}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">E-book Price</p>
          </div>
        )}

        {!hasPrice && item.product_type !== "book-bundle" && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 italic">Price available on product page</p>
          </div>
        )}

        <button
          onClick={() => { window.location.href = item.live_link; }}
          className="w-full flex cursor-pointer items-center justify-center gap-2 bg-blue-900 text-white px-4 py-3 rounded-full hover:bg-blue-800 transition font-semibold"
        >
          Visit Now
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <style>{`
        @keyframes slideRightToLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes slideLeftToRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-slide-rtl {
          animation: slideRightToLeft 30s linear infinite;
        }
        .animate-slide-ltr {
          animation: slideLeftToRight 30s linear infinite;
        }
        .slider-container:hover .animate-slide-rtl,
        .slider-container:hover .animate-slide-ltr {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* ===== PAYMENT CARD ===== */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 text-center border mb-10">
          {loading ? (
            <>
              <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-700 rounded-full animate-spin mx-auto mb-6" />
              <p className="text-gray-600 text-lg">{status}</p>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                {success ? (
                  <CheckCircle className="w-20 h-20 text-green-500" />
                ) : status.includes("failed") ? (
                  <AlertTriangle className="w-20 h-20 text-yellow-500" />
                ) : (
                  <XCircle className="w-20 h-20 text-red-500" />
                )}
              </div>

              <h1 className="text-3xl font-extrabold text-blue-900 mb-3">
                {success ? "Thank You for Your Purchase!" : "Payment Issue"}
              </h1>

              <p className={`text-lg mb-6 ${success ? "text-gray-700" : "text-red-500"}`}>
                {status}
              </p>

              {success && (
                
                 <a href="/books/tgp/"
                  className="inline-flex cursor-pointer items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-600 transition"
                >
                  Back To The Page
                </a>
              )}

              <p className="text-sm text-gray-500 mt-6">
                Having an issue? Contact us at{" "}
                
                 <a href="mailto:support@1XL.com"
                  onClick={(e) => {
                    if (window.innerWidth > 768) {
                      window.open(
                        "https://mail.google.com/mail/?view=cm&fs=1&to=support@1XL.com",
                        "_blank"
                      );
                      e.preventDefault();
                    }
                  }}
                  className="text-blue-700 underline hover:text-blue-900 font-medium cursor-pointer"
                >
                  support@1XL.com
                </a>
              </p>
            </>
          )}
        </div>

        {/* ===== CROSS SELL SLIDING CAROUSEL ===== */}
        {success && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border">
            <h2 className="text-2xl font-extrabold text-center mb-7">
              📚 Recommended for You
            </h2>

            {/* Show detected currency as subtle badge - no selector */}
            {/* <div className="flex justify-center mb-6">
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                Prices shown in{" "}
                <span className="font-semibold text-gray-600">
                  {userRegion === "INR" ? "🇮🇳 INR" : userRegion === "USD" ? "🇺🇸 USD" : "🇦🇪 AED"}
                </span>
                {country ? ` · Detected: ${country}` : ""}
              </span>
            </div> */}

            {loadingProducts && (
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-700 rounded-full animate-spin" />
                <p className="text-center text-gray-500">Loading recommendations...</p>
              </div>
            )}

            {!loadingProducts && crossSellError && (
              <div className="text-center">
                <p className="text-red-500 mb-2 font-semibold">
                  ⚠️ Failed to load recommendations
                </p>
                {errorDetails && (
                  <details className="text-sm text-gray-600 mt-2 bg-red-50 p-3 rounded">
                    <summary className="cursor-pointer font-medium">Error details</summary>
                    <p className="mt-2 text-left">{errorDetails}</p>
                  </details>
                )}
              </div>
            )}

            {!loadingProducts && !crossSellError && products.length === 0 && (
              <p className="text-center text-gray-500">
                No recommendations available at the moment.
              </p>
            )}

            {!loadingProducts && products.length > 0 && (
              <div className="space-y-8">
                {/* TOP ROW - Right to Left */}
                <div className="slider-container overflow-hidden">
                  <div className="flex animate-slide-rtl">
                    {[...topRowProducts, ...topRowProducts].map((item, index) => (
                      <ProductCard key={`top-${item.id}-${index}`} item={item} />
                    ))}
                  </div>
                </div>

                {/* BOTTOM ROW - Left to Right */}
                {bottomRowProducts.length > 0 && (
                  <div className="slider-container overflow-hidden">
                    <div className="flex animate-slide-ltr">
                      {[...bottomRowProducts, ...bottomRowProducts].map((item, index) => (
                        <ProductCard key={`bottom-${item.id}-${index}`} item={item} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
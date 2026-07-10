import {
  Check,
  CreditCard,
  Shield,
  ShoppingCart,
  X,
  Trash2,
  Plus,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import book from '../assets/book3.webp'
import book from "../assets/book5/image11.png";
import { ArrowLeft } from "lucide-react";
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

export default function CheckoutPage() {
  const [similarProducts, setSimilarProducts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedType = params.get("type") || "ebook";
const scrollContainerRef = useRef(null);

  const reference =
    params.get("reference") || sessionStorage.getItem("reference") || "direct";

  // 📌 NEW UTM READ
  const utm_source = sessionStorage.getItem("utm_source");
  const utm_medium = sessionStorage.getItem("utm_medium");
  const utm_campaign = sessionStorage.getItem("utm_campaign");
  const utm_content = sessionStorage.getItem("utm_content");

  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setloading] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [country, setCountry] = useState("India");

  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [productDetails, setProductDetails] = useState(null);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");

  const getCountryISO = (dialCode) => {
    const found = countryCodes.find((c) => `+${c.phonecode}` === dialCode);
    return found?.iso || "IN";
  };

  const [pricing, setPricing] = useState({
    ebook: { actual: 199, discount: 99 },
    hardcopy: { actual: 1999, discount: 999 },
    combo: { actual: 2198, discount: 999 },
  });

  const [cartItems, setCartItems] = useState([
    {
      id: "ebook",
      product_id: "1",
      product_type: "book",
      actual: 199,
      quantity: selectedType === "ebook" ? 1 : 0,
      book_type: "e-book",
      book_name: "",
      book_code: "tgp",
      book_price: 99,
      currency: "INR",
      book_link: "",
    },
    {
      id: "hardcopy",
      product_id: "1",
      book_code: "tgp",
      book_name: "",
      book_type: "hardcopy",
      product_type: "book",
      book_price: 999,
      actual: 1999,
      quantity: selectedType === "hardcopy" ? 1 : 0,
      book_link: null,
      currency: "INR",
    },
  ]);

  const [selectedFormat, setSelectedFormat] = useState(
    selectedType === "hardcopy" ? "hardcopy" : "ebook",
  );

  const setFormat = (format) => {
    setSelectedFormat(format);

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.book_code === "tgp") {
          // Hardcopy logic
          if (item.id === "hardcopy") {
            return {
              ...item,
              quantity:
                format === "hardcopy" || format === "both"
                  ? item.quantity > 0
                    ? item.quantity // keep existing qty
                    : 1
                  : 0,
              book_price: pricing.hardcopy.discount,
            };
          }

          // Ebook logic (always max 1)
          if (item.id === "ebook") {
            return {
              ...item,
              quantity: format === "ebook" || format === "both" ? 1 : 0,
              book_price: pricing.ebook.discount,
            };
          }
        }

        return item;
      }),
    );
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    city_id: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const fetchDynamicPricing = async (detectedCurrency) => {
    try {
      const res = await fetch(
        "https://drmamatajain.valleyhoster.com/api/price/tgp",
      );
      const data = await res.json();
      console.log(data);
      if (data.status && data.product) {
        const currencyLower = detectedCurrency.toLowerCase();
        const priceData = data.product; // ✅ FIX HERE
        setProductDetails(priceData);

        const updatedPricing = {
          ebook: {
            actual: Number(priceData[`ebook_${currencyLower}`]) || 199,
            discount:
              Number(priceData[`ebook_discount_${currencyLower}`]) || 99,
          },
          hardcopy: {
            actual: Number(priceData[`hardcopy_${currencyLower}`]) || 1999,
            discount:
              Number(priceData[`hardcopy_discount_${currencyLower}`]) || 999,
          },
          combo: {
            actual:
              (Number(priceData[`ebook_${currencyLower}`]) || 0) +
              (Number(priceData[`hardcopy_${currencyLower}`]) || 0),
            discount:
              (Number(priceData[`ebook_discount_${currencyLower}`]) || 0) +
              (Number(priceData[`hardcopy_discount_${currencyLower}`]) || 0),
          },
        };

        setPricing(updatedPricing);
        return updatedPricing;
      }
    } catch (error) {
      console.error("Failed to fetch dynamic pricing:", error);
    }

    return null;
  };

  useEffect(() => {
    if (!productDetails) return;

    setCartItems((prev) =>
      prev.map((item) => ({
        ...item,
        book_name: productDetails.name,
        book_link: productDetails.book_link1 || null,
      })),
    );
  }, [productDetails]);

  // Fetch location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        const ipCountryName = data.country_name?.trim() || "Other";

        let updatedCurrency = "USD";
        let updatedSymbol = "$";

        if (ipCountryName === "India") {
          updatedCurrency = "INR";
          updatedSymbol = "₹";
        } else if (
          ipCountryName === "United Arab Emirates" ||
          ipCountryName === "UAE" ||
          ipCountryName === "Dubai"
        ) {
          updatedCurrency = "AED";
          updatedSymbol = "د.إ";
        } else {
          updatedCurrency = "USD";
          updatedSymbol = "$";
        }

        console.log({
          country: ipCountryName,
          currency: updatedCurrency,
          symbol: updatedSymbol,
        });

        setCountry(ipCountryName);
        setCurrency(updatedCurrency);
        setSymbol(updatedSymbol);

        setFormData((prev) => ({
          ...prev,
          country: ipCountryName,
        }));

        // ✅ IMPORTANT: fetch pricing AFTER currency decision
        await fetchDynamicPricing(updatedCurrency);
      } catch (error) {
        console.error("IP detection failed:", error);

        setCountry("Other");
        setCurrency("USD");
        setSymbol("$");

        await fetchDynamicPricing("USD");
      }
    };

    const fetchCountryCodes = async () => {
      try {
        const res = await fetch(
          "https://drmamatajain.valleyhoster.com/api/getCountryCode",
        );
        const data = await res.json();
        setCountryCodes(data);
      } catch (error) {
        console.error("Failed to load country codes", error);
      }
    };

    const fetchCoupons = async () => {
      try {
        const res = await fetch(
          "https://drmamatajain.valleyhoster.com/api/getCoupons",
        );
        const data = await res.json();
        if (data.status) {
          setAvailableCoupons(data.data);
        }
      } catch (error) {
        console.error("Error loading coupons", error);
      }
    };

    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://drmamatajain.valleyhoster.com/api/locations?type=country",
        );
        const data = await res.json();
        if (data.status) {
          setCountries(data.data);

          const india = data.data.find((c) => c.name === "India");
          if (india) {
            setSelectedCountryId(india.id);
            loadStates(india.id);
          }
        }
      } catch (err) {
        console.error("Country load error", err);
      }
    };

    const fetchSimilarProducts = async () => {
      try {
        const res = await fetch(
          "https://drmamatajain.valleyhoster.com/api/upskilling",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: "tgp" }),
          },
        );

        const data = await res.json();
        console.log(data);
        if (data.status) {
          setSimilarProducts(data.similar_products);
        }
      } catch (err) {
        console.error("Failed to load similar products", err);
      }
    };

    fetchCountries();
    fetchCoupons();
    fetchCountryCodes();
    fetchLocation();
    fetchSimilarProducts();
  }, []);

  const loadStates = async (countryId) => {
    try {
      const res = await fetch(
        `https://drmamatajain.valleyhoster.com/api/locations?type=state&country_id=${countryId}`,
      );
      const data = await res.json();
      if (data.status) {
        setStates(data.data);
      }
    } catch (err) {
      console.error("State load error", err);
    }
  };

  const loadCities = async (stateId) => {
    try {
      const res = await fetch(
        `https://drmamatajain.valleyhoster.com/api/locations?type=city&state_id=${stateId}`,
      );
      const data = await res.json();
      if (data.status) {
        setCities(data.data);
      }
    } catch (err) {
      console.error("City load error", err);
    }
  };

  useEffect(() => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.book_code === "tgp" && item.quantity > 0) {
          return {
            ...item,
            book_price: pricing[item.id]?.discount || item.book_price,
            actual: pricing[item.id]?.actual || item.actual,
            currency: currency,
          };
        }

        return {
          ...item,
          book_price: pricing[item.id]?.discount || item.book_price,
          actual: pricing[item.id]?.actual || item.actual,
          currency: currency,
        };
      }),
    );
  }, [pricing, currency]);

  useEffect(() => {
    setFormat(selectedFormat);
  }, []);

  const [showUpsell, setShowUpsell] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState(false);
useEffect(() => {
  if (!showUpsell || !scrollContainerRef.current) return;
  
  // Only run on mobile screens (< 768px)
  const isMobile = window.innerWidth < 768;
  if (!isMobile) return;

  const container = scrollContainerRef.current;
  
  const autoScroll = setInterval(() => {
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    if (container.scrollLeft >= maxScroll - 10) {
      // Reset to start for seamless loop
      container.scrollTo({ left: 0, behavior: 'auto' });
    } else {
      // Scroll smoothly to the right
      container.scrollBy({ left: container.clientWidth * 0.5 });
    }
  }, 10000); // Slide every 3 seconds

  return () => clearInterval(autoScroll);
}, [showUpsell]);
  useEffect(() => {
    const hasExtras = cartItems.some(
      (i) => i.book_code !== "tgp" && i.quantity > 0,
    );
    if (hasExtras && showUpsell) {
      setShowUpsell(false);
      sessionStorage.setItem("upsellShown", "true");
    }
  }, [cartItems, showUpsell]);

  const dismissUpsell = () => {
    setShowUpsell(false);
    sessionStorage.setItem("upsellShown", "true");

    // 🆕 IF USER CLOSED POPUP DURING CHECKOUT, CONTINUE PAYMENT
    if (pendingCheckout) {
      setPendingCheckout(false);
      handleProceedPayment();
    }
  };

  const addUpsellProduct = (product, type) => {
    // get original discount price
    const originalPrice = getBookPrice(product, type, true);

    // apply 50% discount for upsell
    const discountedPrice = originalPrice ? originalPrice / 2 : 0;

    increaseQty(
      {
        ...product,
        // override price values for upsell
        upsell_price: discountedPrice,
        upsell_actual: originalPrice,
      },
      type,
    );

    setShowUpsell(false);
    sessionStorage.setItem("upsellShown", "true");

    if (pendingCheckout) {
      setPendingCheckout(false);
      // wait a tick to ensure state updates
      setTimeout(() => continuePaymentProcess(), 100);
    }
  };

  const getProductPrice = (product, type = "ebook") => {
    if (currency === "INR") {
      return type === "ebook"
        ? Number(product.ebook_discount_inr)
        : Number(product.hardcopy_discount_inr);
    }

    if (currency === "AED") {
      return type === "ebook"
        ? Number(product.ebook_discount_aed)
        : Number(product.hardcopy_discount_aed);
    }

    return type === "ebook"
      ? Number(product.ebook_discount_usd)
      : Number(product.hardcopy_discount_usd);
  };

  const getProductActualPrice = (product, type = "ebook") => {
    if (currency === "INR") {
      return type === "ebook"
        ? Number(product.ebook_inr)
        : Number(product.hardcopy_inr);
    }

    if (currency === "AED") {
      return type === "ebook"
        ? Number(product.ebook_aed)
        : Number(product.hardcopy_aed);
    }

    return type === "ebook"
      ? Number(product.ebook_usd)
      : Number(product.hardcopy_usd);
  };

  const getBookPrice = (product, type = "ebook", discounted = true) => {
    const key = `${type}_${
      discounted ? "discount_" : ""
    }${currency.toLowerCase()}`;
    return product[key] ? Number(product[key]) : null;
  };

  const getCoursePrice = (product) => {
    return null;
  };

  const isBook = (p) => p.product_type === "book";
  const isCourse = (p) => p.product_type === "course";
  const isSellable = (p) =>
    p.product_type === "book" || p.product_type === "course";

  // ✅ UPDATED: Allow multiple hardcopies, limit ebooks to 1
  const increaseQty = (product, type = null) => {
    setCartItems((prev) => {
      // 🔎 Find existing item correctly
      const existingItem = prev.find((i) => {
        if (type) {
          return (
            i.book_code === (product.code || product.book_code) &&
            i.book_type === (type === "ebook" ? "e-book" : "hardcopy")
          );
        }
        return i.id === product.id;
      });

      // ✅ If item exists → update it
      if (existingItem) {
        if (existingItem.book_type === "e-book") {
          alert("Digital book can only be purchased once.");
          return prev;
        }

        return prev.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // 🆕 If not exists → create new item
      const newId = type
        ? `${product.code || product.book_code}-${type}`
        : product.id;

        const finalPrice = product.upsell_price
        ? Number(product.upsell_price)
        : getBookPrice(product, type, true);

      const finalActual = product.upsell_actual
        ? Number(product.upsell_actual)
        : getBookPrice(product, type, false);

     return [
  ...prev,
  {
    id: newId,
    product_id: product.id,
    book_name: product.name,
    book_type: type === "ebook" ? "e-book" : "hardcopy",
    book_code: product.code || product.book_code,
    quantity: 1,
    book_price: finalPrice,
    actual: finalActual,
    product_type: "book",
    currency: currency,

    // ✅ IMPORTANT: Save ebook download link from upskilling API
    book_link:
      type === "ebook"
        ? product.book_link1 || product.live_link || null
        : null,
  },
];

    });
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.book_code === "tgp") {
            return { ...item, quantity: 0 };
          }

          return item;
        })
        .filter((item) => !(item.id === id && item.book_code !== "tgp")),
    );
  };

  const getTotalPrice = () => {
    let totalActual = 0;
    let totalDiscounted = 0;

    cartItems.forEach((item) => {
      if (item.quantity > 0) {
        totalActual += item.actual * item.quantity;
        totalDiscounted += item.book_price * item.quantity;
      }
    });

    if (discountPercent > 0) {
      totalDiscounted -= (totalDiscounted * discountPercent) / 100;
    }

    return { totalActual, totalDiscounted };
  };

  const { totalActual, totalDiscounted } = getTotalPrice();

  const applyCouponToPrice = () => {
    if (!selectedCoupon) {
      alert("Please select a coupon to apply.");
      return;
    }

    if (discountPercent > 0) {
      alert("A coupon is already applied. Remove it before applying another.");
      return;
    }

    setDiscountPercent(Number(selectedCoupon.discount_value));
    alert(`Coupon Applied! You saved ${selectedCoupon.discount_value}%`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedPayment = async () => {
    // 🆕 NEW LOGIC: If upsell available & no extras → show popup first
    // const hasExtras = cartItems.some(
    //   (i) => i.book_code !== "tgp" && i.quantity > 0,
    // );

    // console.log(pendingCheckout);

    // if (
    //   !hasExtras &&
    //   similarProducts.length > 0 &&
    //   !showUpsell &&
    //   !pendingCheckout
    // ) {
    //   setPendingCheckout(true);
    //   setShowUpsell(true);
    //   return;
    // }

    // ==========================
    // 🔧 FIXED BOOK TYPE & QUANTITIES CALCULATION
    // ==========================

    // Calculate total ebook and hardcopy quantities across ALL books in cart
    const ebookQty = cartItems
      .filter((i) => i.book_type === "e-book" && i.quantity > 0)
      .reduce((sum, item) => sum + item.quantity, 0);

    const hardcopyQty = cartItems
      .filter((i) => i.book_type === "hardcopy" && i.quantity > 0)
      .reduce((sum, item) => sum + item.quantity, 0);

    // Determine book type based on what formats are in the cart
    const bookType =
      ebookQty > 0 && hardcopyQty > 0
        ? "combo"
        : ebookQty > 0
          ? "e-book"
          : "hardcopy";

    const totalAmountToPay = getTotalPrice();
    const bookQuantities = { ebook: ebookQty, hardcopy: hardcopyQty };
    const cartProducts = cartItems.filter((i) => i.quantity > 0);
    const book_code = cartProducts.map((i) => i.book_code);
    const items = cartProducts.map((i) => ({
  book_type: i.book_type,
  book_name: i.book_name,
  book_code: i.book_code,
  quantity: i.quantity,

  // ✅ total line price fix (from earlier)
  book_price: (i.book_price * i.quantity).toFixed(2),

  currency: i.currency,

  // ✅ FIX: only ebooks get a link
  book_link: i.book_type === "e-book" ? i.book_link : null,
}));


    // Validation
    if (!formData.name.trim()) return alert("Please Enter Full Name.");
    if (!formData.phone.trim()) return alert("Please Enter Contact Number.");
    if (!formData.email.trim()) return alert("Please Enter Email ID.");
    if (!formData.address.trim()) return alert("Please Enter Full Address.");
    if (!formData.country.trim()) return alert("Please Enter Country.");
    if (!formData.state.trim()) return alert("Please Enter State.");
    if (!formData.city.trim()) return alert("Please Enter City.");
    if (!formData.pincode.trim()) return alert("Please Enter Postal Code.");

    const fullNumber = selectedCountryCode + formData.phone;
    const phoneObj = parsePhoneNumberFromString(fullNumber);
    if (!phoneObj || !phoneObj.isValid())
      return alert(
        "Please enter a valid Contact number for your selected country.",
      );

    if (!/^[a-zA-Z ]+$/.test(formData.name))
      return alert("Enter A Valid Name (Letters Only)");

    if (
      !formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/)
    )
      return alert("Enter A Valid Email");

    if (!/^[a-zA-Z\s]+$/.test(formData.city.trim()))
      return alert("City Should Only Contain Letters.");

    if (!/^[a-zA-Z\s]+$/.test(formData.state.trim()))
      return alert("State Should Only Contain Letters.");

    setIsProcessing(true);

    try {
      const paymentRes = await fetch(
        "https://drmamatajain.valleyhoster.com/api/createPayment_t5",
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
            phone_code: selectedCountryCode,
            coupon_code:
              discountPercent > 0 ? selectedCoupon?.coupon_code : null,
            country,
            form_country: formData.country,
            book_type: bookType,
            reason: "books",
            book_quantity: bookQuantities,
            book_code,
            items,
            book_name: productDetails?.name,
            book_link: productDetails?.book_link1,
            book_amount: totalAmountToPay.totalDiscounted.toString(),
            currency,
            form_currency: null,
            reference,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_content,
          }),
        },
      );

      const data = await paymentRes.json();
      if (!data.success) {
        alert("Payment initiation failed!");
        setIsProcessing(false);
        return;
      }

      if (data.gateway === "razorpay") {
        const fullPhone = selectedCountryCode.replace("+", "") + formData.phone;
        const options = {
          key: data.key,
          amount: data.amount,
          currency: data.currency,
          name: productDetails?.name || "",
          description: "Book Purchase",
          order_id: data.order_id,
          handler: async function (response) {
            setloading(true);
            try {
              const verifyRes = await fetch(
                "https://drmamatajain.valleyhoster.com/api/verifyPayment_t5",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    gateway: "razorpay",
                    book_code: "tgp",
                  }),
                },
              );

              const verifyData = await verifyRes.json();

              if (verifyData.success) {
                if (selectedCoupon) {
                  await fetch(
                    "https://drmamatajain.valleyhoster.com/api/applyCoupon",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        coupon_code: selectedCoupon.coupon_code,
                        email: formData.email,
                        mobile: formData.phone,
                      }),
                    },
                  );
                }

                navigate(
                  `/success?gateway=razorpay&book_code=${verifyData.book_code}&booking_code=${verifyData.booking_code}`,
                );
              } else alert("⚠️ Payment verification failed!");
            } finally {
              setloading(false);
            }
          },
          prefill: {
            name: data.name,
            email: data.email,
            contact: fullPhone,
          },
          theme: { color: "#7B4BB6" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else if (data.gateway === "stripe") {
        const stripe = window.Stripe(data.key);
        const result = await stripe.redirectToCheckout({
          sessionId: data.session_id,
        });

        if (selectedCoupon) {
          await fetch(
            "https://drmamatajain.valleyhoster.com/api/applyCoupon",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                coupon_code: selectedCoupon.coupon_code,
                email: formData.email,
                mobile: formData.phone,
              }),
            },
          );
        }

        if (result.error)
          alert("Stripe Payment Failed: " + result.error.message);
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (!window.Razorpay) {
      const razorpayScript = document.createElement("script");
      razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(razorpayScript);
    }

    if (!window.Stripe) {
      const stripeScript = document.createElement("script");
      stripeScript.src = "https://js.stripe.com/v3/";
      document.body.appendChild(stripeScript);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center cursor-pointer gap-2 text-gray-700 hover:text-gray-900 text-sm"
          >
            <ArrowLeft size={18} /> Back to Books
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Your Order
            </h1>

            {/* Product Cards */}
            <div className="space-y-6 mb-12">
              {cartItems
                .filter((item) => item.book_code === "tgp")
                .slice(0, 1)
                .map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-6 bg-white"
                  >
                    <div className="flex gap-6">
                      <img
                        src={book}
                        alt={item.book_name}
                        className="w-24 h-32 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.book_name.replace(/\s\(.+\)/, "")}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          by Dhiraj Jain
                        </p>

                        <div className="flex gap-8 mt-6">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-4 h-4"
                              checked={
                                cartItems.find((i) => i.id === "hardcopy")
                                  ?.quantity > 0
                              }
                              onChange={(e) => {
                                const ebookSelected =
                                  cartItems.find((i) => i.id === "ebook")
                                    ?.quantity > 0;
                                if (e.target.checked) {
                                  setFormat(
                                    ebookSelected ? "both" : "hardcopy",
                                  );
                                } else {
                                  setFormat(ebookSelected ? "ebook" : "");
                                }
                              }}
                            />
                            <span className="text-gray-700">
                              Physical{" "}
                              <span className="font-semibold">
                                ({symbol}
                                {pricing.hardcopy.discount})
                              </span>
                            </span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-4 h-4"
                              checked={
                                cartItems.find((i) => i.id === "ebook")
                                  ?.quantity > 0
                              }
                              onChange={(e) => {
                                const hardcopySelected =
                                  cartItems.find((i) => i.id === "hardcopy")
                                    ?.quantity > 0;
                                if (e.target.checked) {
                                  setFormat(
                                    hardcopySelected ? "both" : "ebook",
                                  );
                                } else {
                                  setFormat(hardcopySelected ? "hardcopy" : "");
                                }
                              }}
                            />
                            <span className="text-gray-700">
                              Digital{" "}
                              <span className="font-semibold">
                                ({symbol}
                                {pricing.ebook.discount})
                              </span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Customer Details */}
            <div id="customer-details">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Customer Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Full Name*"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={selectedCountryCode}
                        onChange={(e) => setSelectedCountryCode(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
                      >
                        {countryCodes.map((c) => (
                          <option key={c.iso} value={`+${c.phonecode}`}>
                            {`+${c.phonecode}`}
                            {/* {`${c.nicename}`} */}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter Phone Number*"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Email ID
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email ID*"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Enter Postal Code*"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Your Address*"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Country*
                    </label>
                    <select
                      value={selectedCountryId}
                      onChange={(e) => {
                        const id = e.target.value;
                        setSelectedCountryId(id);
                        const sel = countries.find(
                          (c) => String(c.id) === String(id),
                        );
                        setFormData((prev) => ({
                          ...prev,
                          country: sel?.name || "",
                        }));
                        loadStates(id);
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                    >
                      <option value="">Select Country</option>
                      {countries.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      State*
                    </label>
                    <select
                      value={selectedStateId}
                      onChange={(e) => {
                        const id = e.target.value;
                        setSelectedStateId(id);
                        const sel = states.find(
                          (s) => String(s.id) === String(id),
                        );
                        setFormData((prev) => ({
                          ...prev,
                          state: sel?.name || "",
                        }));
                        loadCities(id);
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                    >
                      <option value="">Select State</option>
                      {states.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      City*
                    </label>
                    <select
                      value={formData.city_id || ""}
                      onChange={(e) => {
                        const id = e.target.value;
                        const sel = cities.find(
                          (c) => String(c.id) === String(id),
                        );
                        setFormData((prev) => ({
                          ...prev,
                          city: sel?.name || "",
                          city_id: id,
                        }));
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                    >
                      <option value="">Select City</option>
                      {cities.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                {cartItems
                  .filter((item) => item.quantity > 0)
                  .map((item) => (
                    <div key={item.id} className="text-sm text-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          {item?.book_name?.replace(/\s\(.+\)/, "")}
                        </span>
                        <span className="font-semibold">
                          {symbol}
                          {(item.book_price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* ✅ Show quantity controls for hardcopy items */}
                      {item.book_type === "hardcopy" && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="px-2 py-1 border border-gray-300 cursor-pointer rounded hover:bg-gray-100 text-xs"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs">
                            Qty: {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQty(item)}
                            className="px-2 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 text-xs"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                          {item.book_code !== "tgp" && (
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-auto text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
                            >
                              <Trash2 size={12} /> Remove
                            </button>
                          )}
                        </div>
                      )}

                      {/* ✅ Show quantity only (no controls) for ebook items */}
                      {item.book_type === "e-book" && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </span>
                          {item.book_code !== "tgp" && (
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
                            >
                              <Trash2 size={12} /> Remove
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              {/* Shipping */}
              <div className="flex justify-between mb-4 text-sm">
                <span className="text-gray-700">Shipping</span>
                <span className="font-medium text-green-600">FREE</span>
              </div>

              {/* Total */}
              <div className="flex justify-between mb-6 text-lg font-bold border-t border-gray-200 pt-4">
                <span>Total</span>
                <span>
                  {symbol}
                  {totalDiscounted.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedPayment}
                disabled={isProcessing}
                className="w-full bg-gray-900 mx-auto justify-center text-white py-3 cursor-pointer rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Complete Purchase"}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Secure checkout
              </p>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map((product) => {
                const hardId = `${product.code}-hardcopy`;
                const ebookId = `${product.code}-ebook`;
                const hardItem = cartItems.find((i) => i.id === hardId);
                const ebookItem = cartItems.find((i) => i.id === ebookId);

                return (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-4 bg-white"
                  >
                    <img
                      src={`https://pluto.1xl.com/storage/app/public/funnels/${product.image}`}
                      alt={product.name}
                      className="w-full h-100 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      by Dhiraj Jain
                    </p>

                    {product.author && (
                      <p className="text-yellow-500 text-sm mb-4">
                        ★ 4.7 (8,234)
                      </p>
                    )}

                    {/* Hardcopy controls - ✅ ALLOW MULTIPLE */}
                    {hardItem ? (
                      <div className="flex items-center gap-2 mb-2">
                        <button
                          onClick={() => decreaseQty(hardId)}
                          className="px-3 py-1 cursor-pointer border rounded hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 font-medium">
                          {hardItem.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(product, "hardcopy")}
                          className="px-3 py-1 cursor-pointer border rounded hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(hardId)}
                          className="ml-auto cursor-pointer text-red-500 text-sm hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => increaseQty(product, "hardcopy")}
                        className="w-full border cursor-pointer border-gray-300 text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-50 transition mb-2"
                      >
                        Add Hardcopy ({symbol}
                        {getProductPrice(product, "hardcopy") || 0})
                      </button>
                    )}

                    {/* Ebook controls - ✅ LIMITED TO 1 */}
                    {ebookItem ? (
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 border rounded bg-gray-50 text-sm">
                          Qty: {ebookItem.quantity}
                        </span>
                        <button
                          onClick={() => removeItem(ebookId)}
                          className="ml-auto text-red-500 text-sm hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => increaseQty(product, "ebook")}
                        className="w-full border border-gray-300 text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
                      >
                        Add Digital ({symbol}
                        {getProductPrice(product, "ebook") || 0})
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Upsell Popup - 50% OFF */}
   {showUpsell && similarProducts.length > 0 && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-5xl w-full p-8 md:p-8 relative max-h-[120vh] xl:max-h-[120vh] md:max-h-[90vh] flex flex-col">
      <button
        onClick={dismissUpsell}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        aria-label="Close upsell"
      >
        <X size={24} />
      </button>

      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Wait! Exclusive Offer Just for You
      </h3>
      <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
        Get any of these bestsellers at{" "}
        <span className="font-bold">50% off</span> before you checkout.
      </p>

      {/* Mobile: Horizontal scroll with loop, Desktop: Grid with vertical scroll */}




<div className="flex-1 overflow-hidden mb-4">
  <div 
    ref={scrollContainerRef}
    className="flex md:grid gap-3 md:gap-6 overflow-x-auto md:overflow-x-visible md:overflow-y-auto md:grid-cols-2 lg:grid-cols-3 pb-2 md:pb-0 h-full scroll-smooth snap-x snap-mandatory md:snap-none md:max-h-[60vh] lg:max-h-[55vh] xl:max-h-[70vh] md:pr-2 lg:pr-2"
    style={{ 
      scrollbarWidth: 'thin',
      msOverflowStyle: 'auto',
      WebkitOverflowScrolling: 'touch'
    }}
  >
    {/* Show duplicated array only on mobile for infinite loop */}
    {(typeof window !== 'undefined' && window.innerWidth < 768 
      ? [...similarProducts, ...similarProducts] 
      : similarProducts
    ).map((product, index) => {
      const hardPrice = getProductPrice(product, "hardcopy");
      const ebookPrice = getProductPrice(product, "ebook");
      const hardDiscounted = hardPrice
        ? (hardPrice / 2).toFixed(2)
        : 0;
      const ebookDiscounted = ebookPrice
        ? (ebookPrice / 2).toFixed(2)
        : 0;

            return (
             <div
          key={`${product.id}-${index}`}
          className="border border-gray-200 rounded-lg p-3 md:p-4 bg-white hover:shadow-lg transition w-[47%] min-w-[47%] md:w-auto md:min-w-0 flex-shrink-0 snap-start md:snap-align-none"
        >
          <img
            src={`https://pluto.1xl.com/storage/app/public/funnels/${product.image}`}
            alt={product.name}
            className="w-full h-32 md:h-75 lg:h-85 xl:h-68 object-cover  rounded-lg mb-2 md:mb-2"
          />
          <h4 className="font-bold text-gray-900 mb-1 line-clamp-2 text-xs md:text-base">
            {product.name}
          </h4>
          <p className="text-[10px] md:text-sm text-gray-500 mb-2 md:mb-4">
            by Dhiraj Jain
          </p>

          {/* Hardcopy Option */}
          <div className="mb-2 md:mb-3 xl:mb-0 p-2 md:p-3 bg-gray-50 rounded-lg">
            <p className="text-[10px] md:text-xs text-gray-600 mb-1">Hardcopy</p>
            <div className="flex items-center justify-between mb-1 md:mb-2">
              <span className="text-[10px] md:text-sm line-through text-gray-400">
                {symbol}
                {hardPrice || 0}
              </span>
              <span className="text-sm md:text-lg font-bold text-red-600">
                {symbol}
                {hardDiscounted}
              </span>
            </div>
            <button
              onClick={() => addUpsellProduct(product, "hardcopy")}
              className="w-full cursor-pointer bg-gray-900 text-white py-1.5 md:py-2 rounded-lg font-semibold hover:bg-gray-800 transition text-[10px] md:text-sm"
            >
              Add Hardcopy
            </button>
          </div>

          {/* Ebook Option */}
          <div className="p-2 md:p-3 bg-gray-50 rounded-lg">
            <p className="text-[10px] md:text-xs text-gray-600 mb-1">
              Digital (E-Book)
            </p>
            <div className="flex items-center justify-between mb-1 md:mb-2">
              <span className="text-[10px] md:text-sm line-through text-gray-400">
                {symbol}
                {ebookPrice || 0}
              </span>
              <span className="text-sm md:text-lg font-bold text-red-600">
                {symbol}
                {ebookDiscounted}
              </span>
            </div>
            <button
              onClick={() => addUpsellProduct(product, "ebook")}
              className="w-full cursor-pointer bg-gray-900 text-white py-1.5 md:py-2 rounded-lg font-semibold hover:bg-gray-800 transition text-[10px] md:text-sm"
            >
              Add Digital
            </button>
          </div>
        </div>
      );
    })}
  </div>
</div>

{/* Add CSS to hide scrollbar on mobile only */}
<style jsx>{`
  @media (max-width: 767px) {
    .overflow-x-auto::-webkit-scrollbar {
      display: none;
    }
  }
  
  @media (min-width: 1024px) {
    .overflow-y-auto::-webkit-scrollbar {
      width: 8px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
`}</style>

      <div className="text-center border-t pt-4 md:pt-6 flex-shrink-0">
        <button
          onClick={dismissUpsell}
          className="text-xs md:text-sm text-gray-600 cursor-pointer hover:text-gray-900 underline font-medium"
        >
          No thanks, I'll skip this offer
        </button>
      </div>
    </div>
  </div>
)}

{/* Add custom scrollbar styling */}
<style jsx>{`
  @media (min-width: 1024px) {
    .overflow-y-auto::-webkit-scrollbar {
      width: 8px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
`}</style>
      {/* Loading Modal */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <div className="w-12 h-12 border-4 border-gray-300 mx-auto justify-center border-t-gray-900 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-900 font-medium">
              Processing your payment...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
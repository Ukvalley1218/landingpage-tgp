import { useEffect, useState } from "react";
import ceo from "../assets/book5/dhirajsir.webp";

export default function CenterOfferPopup() {
  const [show, setShow] = useState(false);
  const [popupCount, setPopupCount] = useState(0);
  const [pricing, setPricing] = useState(null);
  const [pricingReady, setPricingReady] = useState(false);

  /* -------------------------------------------------------
     LOAD PRICING (CLIENT SAFE)
  -------------------------------------------------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("userPricing");
    if (saved) {
      setPricing(JSON.parse(saved));
      setPricingReady(true);
      return;
    }

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        let newPricing;

        switch (data.country_code) {
          case "IN":
            newPricing = { symbol: "₹", ebookAmount: "99", hardcopyAmount: "999" };
            break;
          case "AE":
            newPricing = { symbol: "AED", ebookAmount: "9", hardcopyAmount: "99" };
            break;
          default:
            newPricing = { symbol: "$", ebookAmount: "4.99", hardcopyAmount: "19.99" };
        }

        localStorage.setItem("userPricing", JSON.stringify(newPricing));
        setPricing(newPricing);
      })
      .catch(() => {
        const fallback = { symbol: "$", ebookAmount: "4.99", hardcopyAmount: "19.99" };
        localStorage.setItem("userPricing", JSON.stringify(fallback));
        setPricing(fallback);
      })
      .finally(() => setPricingReady(true));
  }, []);

  /* -------------------------------------------------------
     POPUP TIMING (ONLY AFTER PRICING)
  -------------------------------------------------------- */
  useEffect(() => {
    if (!pricingReady) return;

    const delay =
      popupCount === 0 ? 15000 :
      popupCount === 1 ? 20000 :
      25000;

    const showTimer = setTimeout(() => setShow(true), delay);
    const hideTimer = setTimeout(() => {
      setShow(false);
      setPopupCount(p => p + 1);
    }, delay + 5000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [popupCount, pricingReady]);

  /* 🔒 HARD GUARD */
  if (!show || !pricing) return null;

  const ref = sessionStorage.getItem("reference") || "direct";

  const goToCheckout = (type) => {
    const params = new URLSearchParams({
      type,
      reference: ref,
      utm_source: sessionStorage.getItem("utm_source") || "",
      utm_medium: sessionStorage.getItem("utm_medium") || "",
      utm_campaign: sessionStorage.getItem("utm_campaign") || "",
      utm_content: sessionStorage.getItem("utm_content") || ""
    }).toString();

    window.location.href = `/books/tgp/checkout?${params}`;
  };

  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <button
          style={closeBtn}
          onClick={() => {
            setShow(false);
            setPopupCount(p => p + 1);
          }}
        >
          ×
        </button>

        <h2 style={title}>The Growth PlayBook</h2>
        <p style={author}>By <strong>Dhiraj Jain</strong></p>

        <img src={ceo} alt="The Growth PlayBook" style={bookImage} />

        <p className="xl:-mt-7 xl:mb-2" style={description}>
          Build, lead, and scale your business intelligently — without burnout.
        </p>

        <div className="button-container" style={buttonContainer}>
          <button style={ctaBtn} onClick={() => goToCheckout("ebook")}>
            <span className="heartbeat-text">
              Book Ebook Now {pricing.ebookAmount} →
            </span>
          </button>

          <button style={ctaBtn} onClick={() => goToCheckout("hardcopy")}>
            <span className="heartbeat-text">
              Book HardCopy Now {pricing.hardcopyAmount} →
            </span>
          </button>
        </div>

        <div style={timerWrap}>
          <div style={timerBar} />
        </div>

        <style>{cssAnimations}</style>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10000,
  padding: 20
};

const popupStyle = {
  background: "#6A3F43",
  borderRadius: 20,
  maxWidth: 520,
  width: "100%",
  padding: 28,
  textAlign: "center",
  color: "#fff",
  position: "relative",
  animation: "slideDown 0.4s ease-out"
};

const closeBtn = {
  position: "absolute",
  top: 12,
  right: 12,
  background: "transparent",
  border: "none",
  color: "#fff",
  fontSize: 24,
  cursor: "pointer"
};

const title = { color: "#FFCD9B", fontSize: 26 };
const author = { fontSize: 14, opacity: 0.9 };
const bookImage = { width: 220, margin: "16px auto", borderRadius: 14 };
const description = { fontSize: 15, marginBottom: 18 };

const buttonContainer = {
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
  justifyContent: "center"
};

const ctaBtn = {
  background: "#FFCD9B",
  color: "#0D2C4B",
  padding: "14px 26px",
  borderRadius: 999,
  fontWeight: 700,
  border: "none",
  cursor: "pointer"
};

const timerWrap = {
  height: 4,
  background: "rgba(255,255,255,0.2)",
  marginTop: 20,
  borderRadius: 2,
  overflow: "hidden"
};

const timerBar = {
  height: "100%",
  width: "100%",
  background: "#FFCD9B",
  animation: "shrink 5s linear forwards"
};

const cssAnimations = `
@keyframes slideDown {
  from { transform: translateY(-60px); opacity: 0 }
  to { transform: translateY(0); opacity: 1 }
}
@keyframes shrink {
  from { width: 100% }
  to { width: 0% }
}
@keyframes heartbeat {
  0%,100% { transform: scale(1) }
  10%,30% { transform: scale(1.05) }
}
.heartbeat-text {
  display: inline-block;
  animation: heartbeat 3s infinite;
}
@media (max-width: 640px) {
  .button-container { flex-direction: column }
}
`;

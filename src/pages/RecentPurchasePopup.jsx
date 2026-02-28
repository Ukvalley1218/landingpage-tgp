import { useEffect, useState } from "react";

export default function RecentPurchasePopup() {
  const [show, setShow] = useState(false);
  const [person, setPerson] = useState(null);
  const [timeAgo, setTimeAgo] = useState("1m ago");

  const purchases = [
    { name: "Aarav Mehta", city: "Mumbai", country: "India" },
    { name: "Riya Patel", city: "Ahmedabad", country: "India" },
    { name: "Neha Sharma", city: "Delhi", country: "India" },
    { name: "Karthik Iyer", city: "Chennai", country: "India" },
    { name: "Pooja Nair", city: "Kochi", country: "India" },
    { name: "Rahul Verma", city: "Jaipur", country: "India" },
    { name: "Michael Brown", city: "New York", country: "USA" },
    { name: "Sophia Johnson", city: "Los Angeles", country: "USA" },
    { name: "Ahmed Khan", city: "Dubai", country: "UAE" },
    { name: "Fatima Ali", city: "Sharjah", country: "UAE" }
  ];

  const timeOptions = ["5s ago", "15s ago", "30s ago", "1m ago", "2s ago"];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPerson =
        purchases[Math.floor(Math.random() * purchases.length)];

      const randomTime =
        timeOptions[Math.floor(Math.random() * timeOptions.length)];

      setPerson(randomPerson);
      setTimeAgo(randomTime);
      setShow(true);

      setTimeout(() => setShow(false), 4000);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  if (!show || !person) return null;

  return (
   <div
  style={{
    position: "fixed",
    // Default position for mobile (small screens)
    bottom: "180px",
    left: "20px",
    // Responsive positioning using media queries in style prop
    "@media (min-width: 768px)": {
      bottom: "180px",
    },
    background: "#f7f3ff",
    color: "#1a1a1a",
    padding: "14px 18px",
    borderRadius: "14px",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
    fontSize: "14px",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "340px",
    borderLeft: "5px solid #6A3F43",
    animation: "slideIn 0.4s ease-out"
  }}
>
  <div
    style={{
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "#6A3F43",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "20px"
    }}
  >
    📚
  </div>

  <div style={{ flex: 1 }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <strong>{person.name}</strong>
      <span style={{ fontSize: "12px", color: "#6A3F43" }}>
        {timeAgo}
      </span>
    </div>

    <div style={{ fontSize: "13px", opacity: 0.8 }}>
      {person.city}, {person.country}
    </div>

    <div style={{ fontSize: "14px", marginTop: "4px" }}>
      just purchased this book
    </div>
  </div>

  <style>
    {`
      @keyframes slideIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      /* Alternative: Using inline media queries in style prop */
      @media (max-width: 767px) {
        div[style*="bottom: 110px"] {
          bottom: 180px !important;
        }
      }
    `}
  </style>
</div>
  );
}

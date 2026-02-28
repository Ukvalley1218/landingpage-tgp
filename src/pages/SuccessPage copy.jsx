import { ArrowRight, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
// import { MdWhatsapp } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying your payment....");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const gateway = searchParams.get("gateway");
  const navigate = useNavigate();

  useEffect(() => {
    async function verify() {
      try {
        if (gateway === "stripe") {
          const sessionId = searchParams.get("session_id");

          const res = await fetch(
            "https://drmamatajain.valleyhoster.com/api/verifyPayment_t2",
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
          if (data.success) {
            setStatus("Your Stripe payment was successful!");
            setSuccess(true);
          } else {
            setStatus("Stripe payment verification failed.");
          }
        } else if (gateway === "razorpay") {
          setStatus("Your Razorpay payment was successful!");
          setSuccess(true);
        } else {
          setStatus("Unknown payment gateway.");
        }
      } catch (err) {
        console.error("Verify Error:", err);
        setStatus("Verification failed. Please contact support.");
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [gateway, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center border border-gray-200">
        {loading ? (
          <>
            <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-700 rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">{status}</p>
          </>
        ) : (
          <>
            {/* ✅ Success Icon or ❌ Error Icon */}
            <div className="mb-6 flex justify-center">
              {success ? (
                <CheckCircle className="w-20 h-20 text-green-500 animate-bounce" />
              ) : status.includes("⚠️") || status.includes("failed") ? (
                <AlertTriangle className="w-20 h-20 text-yellow-500" />
              ) : (
                <XCircle className="w-20 h-20 text-red-500" />
              )}
            </div>

            {/* 🎉 Thank You Title */}
            <h1 className="text-3xl font-extrabold mb-3 text-blue-900">
              {success ? "Thank You for Your Purchase!" : "Payment Issue"}
            </h1>

            {/* Message */}
            <p
              className={`text-lg mb-8 ${success ? "text-gray-700" : "text-red-500"
                }`}
            >
              {status}
            </p>

            {/* 🟢 WhatsApp Join Button */}
            {success && (
              <div className="flex flex-col items-center text-center mt-6">
                {/* Buttons */}
                {/* <div className="flex flex-col space-y-4">
              <button
                onClick={() => navigate("/")}
                className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-gray-100 text-gray-700 font-medium py-3 rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                Continue Shopping
              </button>
            </div> */}
                {/* <a
              href="https://wa.me/1234567890" // replace with your group link
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition-all duration-300 hover:scale-105"
            >
              <MdWhatsapp className="w-7 h-7 text-white" />
              <span className="text-base font-semibold lg:text-lg">
                Join Our WhatsApp Group
              </span>
            </a> */}
                <a
                  href="https://drmamatajain.com/" // replace with your group link

                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-green-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition-all duration-300 hover:scale-105"
                >

                  <span className="text-base font-semibold lg:text-lg">
                    Back To The Page
                  </span>
                </a>
                <p className="text-gray-500 text-sm mt-3">
                  Stay updated with exclusive offers & updates!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>



  );
}

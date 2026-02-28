import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-[#1E466F]">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/books/tgp"
        className="mt-6 px-6 py-3 bg-[#1E466F] text-white rounded-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
}

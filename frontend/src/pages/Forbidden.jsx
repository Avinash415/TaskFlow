import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-7xl font-bold text-red-600">
        403
      </h1>

      <p className="mb-6">
        You don't have permission to access this page.
      </p>

      <Link
        to="/dashboard"
        className="rounded bg-blue-600 px-5 py-3 text-white"
      >
        Go Dashboard
      </Link>
    </div>
  );
};

export default Forbidden;
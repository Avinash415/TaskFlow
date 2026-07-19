import useAuth from "../../../hooks/useAuth";

const WelcomeBanner = () => {
  const { user } = useAuth();

  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow">
      <h1 className="text-3xl font-bold">
        Welcome back,
        {" "}
        {user?.fullName || "User"} 👋
      </h1>

      <p className="mt-2 text-blue-100">
        Here's what's happening with your projects today.
      </p>
    </div>
  );
};

export default WelcomeBanner;
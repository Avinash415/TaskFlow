import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-5">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
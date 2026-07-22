import { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LogIn } from "lucide-react";
import toast from "react-hot-toast";

import * as authService from "../../services/authService";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response =
        await authService.login(formData);

      const { token, user } = response.data;

      login(token, user);

      toast.success(response.message);

      // If user was redirected to login from a protected page
      const from = location.state?.from?.pathname;

      if (from) {
        navigate(from, { replace: true });
        return;
      }

      // Role based redirect
      if (user.role === "ADMIN") {
        navigate("/admin/dashboard", {
          replace: true,
        });
      } else {
        navigate("/dashboard", {
          replace: true,
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

      <h1 className="mb-2 text-center text-3xl font-bold">
        TaskFlow
      </h1>

      <p className="mb-8 text-center text-gray-500">
        Enterprise Task Management
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Email */}

        <div>
          <label>Email</label>

          <input
            type="email"
            placeholder="admin@taskflow.com"
            className="mt-2 w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
            {...register("email", {
              required: "Email is required",
            })}
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.email?.message}
          </p>
        </div>

        {/* Password */}

        <div>
          <label>Password</label>

          <div className="relative mt-2">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              className="w-full rounded-lg border p-3 pr-12 focus:border-blue-500 focus:outline-none"
              {...register("password", {
                required:
                  "Password is required",
              })}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          <p className="mt-1 text-sm text-red-500">
            {errors.password?.message}
          </p>
        </div>

        {/* Login Button */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          <LogIn size={18} />

          {isSubmitting
            ? "Signing In..."
            : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center">

        Don't have an account?

        <Link
          to="/register"
          className="ml-2 text-blue-600 hover:underline"
        >
          Register
        </Link>

      </p>

    </div>
  );
};

export default Login;
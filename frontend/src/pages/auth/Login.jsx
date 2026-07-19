import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LogIn } from "lucide-react";
import toast from "react-hot-toast";

import * as authService from "../../services/authService";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);

      login(
        response.data.token,
        response.data.user
      );

      toast.success(response.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
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
        <div>
          <label>Email</label>

          <input
            type="email"
            className="mt-2 w-full rounded-lg border p-3"
            placeholder="admin@taskflow.com"
            {...register("email", {
              required: "Email is required",
            })}
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.email?.message}
          </p>
        </div>

        <div>
          <label>Password</label>

          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-lg border p-3 pr-12"
              {...register("password", {
                required: "Password is required",
              })}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeOff />
              ) : (
                <Eye />
              )}
            </button>
          </div>

          <p className="mt-1 text-sm text-red-500">
            {errors.password?.message}
          </p>
        </div>

        <button
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-60"
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
          className="ml-2 text-blue-600"
          to="/register"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
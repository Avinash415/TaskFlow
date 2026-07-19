import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import * as authService from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      delete data.confirmPassword;

      const response = await authService.register(data);

      toast.success(response.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Create Account
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <label>Full Name</label>

          <input
            className="mt-2 w-full rounded-lg border p-3"
            {...register("fullName", {
              required: "Full Name is required",
            })}
          />

          <p className="text-sm text-red-500">
            {errors.fullName?.message}
          </p>
        </div>

        <div>
          <label>Email</label>

          <input
            className="mt-2 w-full rounded-lg border p-3"
            {...register("email", {
              required: "Email is required",
            })}
          />

          <p className="text-sm text-red-500">
            {errors.email?.message}
          </p>
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            className="mt-2 w-full rounded-lg border p-3"
            {...register("password", {
              required: "Password required",
              minLength: 8,
            })}
          />

          <p className="text-sm text-red-500">
            {errors.password?.message}
          </p>
        </div>

        <div>
          <label>Confirm Password</label>

          <input
            type="password"
            className="mt-2 w-full rounded-lg border p-3"
            {...register("confirmPassword", {
              validate: (value) =>
                value === password ||
                "Passwords do not match",
            })}
          />

          <p className="text-sm text-red-500">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 py-3 text-white"
        >
          {isSubmitting
            ? "Creating..."
            : "Register"}
        </button>
      </form>

      <p className="mt-6 text-center">
        Already have an account?

        <Link
          className="ml-2 text-blue-600"
          to="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
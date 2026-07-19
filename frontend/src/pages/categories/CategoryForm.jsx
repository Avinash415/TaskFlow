import { useForm } from "react-hook-form";

const CategoryForm = ({
  defaultValues = {},
  onSubmit,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label>Category Name</label>

        <input
          className="mt-2 w-full rounded-lg border p-3"
          {...register("name", {
            required: "Category name is required",
          })}
        />

        <p className="text-red-500">
          {errors.name?.message}
        </p>
      </div>

      <button
        disabled={loading}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default CategoryForm;
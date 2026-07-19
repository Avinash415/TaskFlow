import { useForm } from "react-hook-form";

const ProjectForm = ({
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
        <label>Project Name</label>

        <input
          className="mt-2 w-full rounded-lg border p-3"
          {...register("name", {
            required: "Project name is required",
          })}
        />

        <p className="text-red-500">
          {errors.name?.message}
        </p>
      </div>

      <div>
        <label>Description</label>

        <textarea
          rows="4"
          className="mt-2 w-full rounded-lg border p-3"
          {...register("description")}
        />
      </div>

      <button
        disabled={loading}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white"
      >
        {loading ? "Saving..." : "Save Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
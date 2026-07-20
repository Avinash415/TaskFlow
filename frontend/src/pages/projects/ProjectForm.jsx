import { useForm } from "react-hook-form";
import { Save, ArrowLeft } from "lucide-react";

const ProjectForm = ({
  defaultValues = {},
  onSubmit,
  loading = false,
  isEdit = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? "Edit Project" : "Create New Project"}
        </h1>
        <p className="text-gray-500 mt-2">
          {isEdit 
            ? "Update your project details below" 
            : "Start a new project and organize your tasks"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-3xl shadow-sm border p-8 space-y-8"
      >
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg"
            placeholder="Website Redesign 2026"
            {...register("name", {
              required: "Project name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows={6}
            className="w-full px-5 py-4 border border-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y"
            placeholder="Redesign the company website with modern UI/UX, improve performance, and implement new branding..."
            {...register("description")}
          />
          <p className="text-xs text-gray-400 mt-1.5">
            Provide a clear description of the project goals and scope.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:from-indigo-700 hover:to-blue-700 disabled:opacity-70 transition-all active:scale-[0.985]"
          >
            <Save size={22} />
            {loading ? "Saving Project..." : isEdit ? "Update Project" : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
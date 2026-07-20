import { useForm } from "react-hook-form";

import useProjects from "../../hooks/useProjects";
import useCategories from "../../hooks/useCategories";

import TextInput from "../../components/common/Form/TextInput";
import TextArea from "../../components/common/Form/TextArea";
import SelectField from "../../components/common/Form/SelectField";
import DateField from "../../components/common/Form/DateField";

import { TASK_PRIORITY, TASK_STATUS } from "../../utils/constants";

import Button from "../../components/common/Button/Button";

const TaskForm = ({
  defaultValues = {},
  onSubmit,
  loading = false,
  isEdit = false,
}) => {
  const { projects } = useProjects();
  const { categories } = useCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? "Edit Task" : "Create New Task"}
        </h1>
        <p className="text-gray-500 mt-2">
          {isEdit 
            ? "Update task details" 
            : "Break down your work into actionable tasks"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-3xl shadow-sm border p-8 space-y-8"
      >
        {/* Title */}
        <TextInput
          label="Task Title"
          registration={register("title", {
            required: "Task title is required",
            minLength: { value: 5, message: "Title must be at least 5 characters" }
          })}
          error={errors.title?.message}
          placeholder="Design new login page"
        />

        {/* Description */}
        <TextArea
          label="Description"
          registration={register("description")}
          placeholder="Create a clean, modern login interface with email/password and social login options..."
        />

        {/* Project & Category */}
        <div className="grid gap-6 md:grid-cols-2">
          <SelectField
            label="Project"
            registration={register("projectId", {
              required: "Please select a project",
            })}
            error={errors.projectId?.message}
            options={projects.map((p) => ({
              label: p.name,
              value: p.id,
            }))}
            placeholder="Select Project"
          />

          <SelectField
            label="Category"
            registration={register("categoryId")}
            options={categories.map((c) => ({
              label: c.name,
              value: c.id,
            }))}
            placeholder="Select Category"
          />
        </div>

        {/* Priority, Status, Due Date */}
        <div className="grid gap-6 md:grid-cols-3">
          <SelectField
            label="Priority"
            registration={register("priority")}
            options={TASK_PRIORITY}
          />

          <SelectField
            label="Status"
            registration={register("status")}
            options={TASK_STATUS}
          />

          <DateField
            label="Due Date"
            registration={register("dueDate")}
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
            className="flex-1"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="flex-1"
          >
            {loading ? "Saving Task..." : isEdit ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
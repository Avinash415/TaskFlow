import { useForm } from "react-hook-form";

import useProjects from "../../hooks/useProjects";
import useCategories from "../../hooks/useCategories";

import TextInput from "../../components/common/Form/TextInput";
import TextArea from "../../components/common/Form/TextArea";
import SelectField from "../../components/common/Form/SelectField";
import DateField from "../../components/common/Form/DateField";

import {
  TASK_PRIORITY,
  TASK_STATUS,
} from "../../utils/constants";

import Button from "../../components/common/Button/Button";

const TaskForm = ({
  defaultValues = {},
  onSubmit,
  loading,
}) => {
  const {
    projects,
  } = useProjects();

  const {
    categories,
  } = useCategories();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <TextInput
        label="Task Title"
        registration={register("title", {
          required: "Task title is required",
        })}
        error={errors.title?.message}
      />

      <TextArea
        label="Description"
        registration={register("description")}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <SelectField
          label="Project"
          registration={register("projectId", {
            required: "Project is required",
          })}
          error={errors.projectId?.message}
          options={projects.map((project) => ({
            label: project.name,
            value: project.id,
          }))}
        />

        <SelectField
          label="Category"
          registration={register("categoryId")}
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
      </div>

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

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Task"}
      </Button>
    </form>
  );
};

export default TaskForm;
import { useForm } from "react-hook-form";

import TextInput from "../../components/common/Form/TextInput";
import SelectField from "../../components/common/Form/SelectField";
import Button from "../../components/common/Button/Button";

const UserForm = ({
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

  const roleOptions = [
    {
      label: "Admin",
      value: "ADMIN",
    },
    {
      label: "User",
      value: "USER",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <TextInput
        label="Full Name"
        registration={register(
          "fullName",
          {
            required:
              "Full name is required",
          }
        )}
        error={errors.fullName?.message}
      />

      <TextInput
        label="Email"
        type="email"
        registration={register("email", {
          required:
            "Email is required",
        })}
        error={errors.email?.message}
      />

      <TextInput
        label="Password"
        type="password"
        registration={register(
          "password",
          {
            required:
              "Password is required",
            minLength: {
              value: 8,
              message:
                "Minimum 8 characters",
            },
          }
        )}
        error={errors.password?.message}
      />

      <SelectField
        label="Role"
        registration={register("role")}
        options={roleOptions}
      />

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save User"}
      </Button>
    </form>
  );
};

export default UserForm;
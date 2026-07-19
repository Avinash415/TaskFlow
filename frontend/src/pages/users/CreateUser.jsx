import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import UserForm from "./UserForm";
import * as userService from "../../services/userService";

const CreateUser = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const submit = async (values) => {
    try {
      setLoading(true);

      await userService.createUser(values);

      toast.success(
        "User created successfully."
      );

      navigate("/users");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to create user."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserForm
      onSubmit={submit}
      loading={loading}
    />
  );
};

export default CreateUser;
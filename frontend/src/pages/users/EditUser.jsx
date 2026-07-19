import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import UserForm from "./UserForm";
import * as userService from "../../services/userService";

const EditUser = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response =
        await userService.getUser(id);

      setUser(response.data);
    } catch {
      toast.error("Unable to load user.");
    }
  };

  const submit = async (values) => {
    try {
      setLoading(true);

      await userService.updateUser(
        id,
        values
      );

      toast.success(
        "User updated successfully."
      );

      navigate("/users");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update user."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <UserForm
      defaultValues={{
        ...user,
        password: "",
      }}
      onSubmit={submit}
      loading={loading}
    />
  );
};

export default EditUser;
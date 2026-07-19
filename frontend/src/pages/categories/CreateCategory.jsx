import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import * as categoryService from "../../services/categoryService";
import CategoryForm from "./CategoryForm";

const CreateCategory = () => {
  const navigate = useNavigate();

  const submit = async (values) => {
    try {
      await categoryService.createCategory(values);

      toast.success("Category created.");

      navigate("/categories");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to create category."
      );
    }
  };

  return <CategoryForm onSubmit={submit} />;
};

export default CreateCategory;
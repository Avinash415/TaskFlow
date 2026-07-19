import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import * as categoryService from "../../services/categoryService";
import CategoryForm from "./CategoryForm";

const EditCategory = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [category, setCategory] =
    useState(null);

  useEffect(() => {
    categoryService
      .getCategoryById(id)
      .then((res) => setCategory(res.data));
  }, [id]);

  const submit = async (values) => {
    try {
      await categoryService.updateCategory(
        id,
        values
      );

      toast.success("Category updated.");

      navigate("/categories");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Update failed."
      );
    }
  };

  if (!category) return null;

  return (
    <CategoryForm
      defaultValues={category}
      onSubmit={submit}
    />
  );
};

export default EditCategory;
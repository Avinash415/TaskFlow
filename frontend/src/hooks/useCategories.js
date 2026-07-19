import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as categoryService from "../services/categoryService";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    try {
      setLoading(true);

      const response =
        await categoryService.getCategories();

      setCategories(response.data || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    refresh: loadCategories,
  };
};

export default useCategories;
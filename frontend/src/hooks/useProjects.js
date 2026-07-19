import { useEffect, useState } from "react";
import * as projectService from "../services/projectService";
import toast from "react-hot-toast";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const response =
        await projectService.getProjects();

      setProjects(response.data || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return {
    projects,
    loading,
    refresh: loadProjects,
  };
};

export default useProjects;
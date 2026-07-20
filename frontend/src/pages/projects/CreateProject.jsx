import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ProjectForm from "./ProjectForm";
import * as projectService from "../../services/projectService";

const CreateProject = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await projectService.createProject(values);
      toast.success("Project created successfully! 🎉");
      navigate("/projects");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create project."
      );
    }
  };

  return <ProjectForm onSubmit={handleSubmit} />;
};

export default CreateProject;
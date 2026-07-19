import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import ProjectForm from "./ProjectForm";
import * as projectService from "../../services/projectService";

const EditProject = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  useEffect(() => {
    projectService
      .getProjectById(id)
      .then((res) => setProject(res.data));
  }, [id]);

  const submit = async (values) => {
    try {
      await projectService.updateProject(
        id,
        values
      );

      toast.success("Project updated.");

      navigate("/projects");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Update failed."
      );
    }
  };

  if (!project) return null;

  return (
    <ProjectForm
      defaultValues={project}
      onSubmit={submit}
    />
  );
};

export default EditProject;
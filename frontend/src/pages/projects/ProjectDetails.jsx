import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Card from "../../components/common/Card/Card";
import Loader from "../../components/Loader/Loader";
import * as projectService from "../../services/projectService";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response =
          await projectService.getProjectById(id);

        setProject(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <Card title="Project Details">
      <div className="space-y-5">
        <div>
          <p className="font-semibold">
            Project Name
          </p>

          <p>{project.name}</p>
        </div>

        <div>
          <p className="font-semibold">
            Description
          </p>

          <p>{project.description}</p>
        </div>

        <div>
          <p className="font-semibold">
            Created At
          </p>

          <p>{project.createdAt}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProjectDetails;
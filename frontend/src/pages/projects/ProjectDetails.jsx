import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Edit3, ArrowLeft, Users } from "lucide-react";

import Card from "../../components/common/Card/Card";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/common/Button/Button";
import * as projectService from "../../services/projectService";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectService.getProjectById(id);
        setProject(response.data);
      } catch (error) {
        console.error("Failed to fetch project", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <Loader />;

  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Project not found</h2>
        <button
          onClick={() => navigate("/projects")}
          className="mt-4 text-indigo-600 hover:underline"
        >
          ← Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/projects")}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-gray-500 flex items-center gap-2 mt-1">
              <Calendar size={16} />
              Created on {new Date(project.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        <Button
          onClick={() => navigate(`/projects/edit/${id}`)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Edit3 size={18} />
          Edit Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-xl font-semibold mb-6">Project Overview</h2>
            
            <div className="prose max-w-none">
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                {project.description || "No description provided for this project."}
              </p>
            </div>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Status</h3>
              <span className="px-4 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
                <Users size={28} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Owner</p>
                <p className="font-medium">You (Admin)</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
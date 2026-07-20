import { useMemo, useState } from "react";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useProjects from "../../hooks/useProjects";
import * as projectService from "../../services/projectService";

import DataTable from "../../components/common/Table/DataTable";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog/ConfirmDialog";

const ProjectList = () => {
  const navigate = useNavigate();
  const { projects, loading, refresh } = useProjects();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [projects, search]);

  const deleteProject = async () => {
    try {
      await projectService.deleteProject(deleteId);
      toast.success("Project deleted successfully");
      setDeleteId(null);
      refresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete project");
    }
  };

  const columns = [
    {
      key: "name",
      title: "Project Name",
      className: "font-medium text-gray-900",
    },
    {
      key: "description",
      title: "Description",
      className: "text-gray-600 max-w-md truncate",
    },
    {
      key: "actions",
      title: "Actions",
      className: "text-right",
      render: (project) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => navigate(`/projects/${project.id}`)}
            className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 hover:text-blue-700 transition-colors"
            title="View Details"
          >
            <Eye size={20} />
          </button>
          <button
            onClick={() => navigate(`/projects/edit/${project.id}`)}
            className="p-2 hover:bg-amber-50 rounded-lg text-amber-600 hover:text-amber-700 transition-colors"
            title="Edit"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => setDeleteId(project.id)}
            className="p-2 hover:bg-red-50 rounded-lg text-red-600 hover:text-red-700 transition-colors"
            title="Delete"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="Projects"
        subtitle="Manage your team projects and workflows"
        buttonText="New Project"
        buttonIcon={<Plus size={20} />}
        onClick={() => navigate("/projects/new")}
      />

      {/* Search */}
      <div className="max-w-md">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredProjects}
        loading={loading}
        emptyMessage="No projects found. Create your first project to get started."
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Project"
        message="This action cannot be undone. All tasks associated with this project will also be deleted."
        confirmText="Delete Project"
        confirmVariant="destructive"
        onCancel={() => setDeleteId(null)}
        onConfirm={deleteProject}
      />
    </div>
  );
};

export default ProjectList;
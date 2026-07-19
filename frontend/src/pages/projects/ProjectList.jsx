import { useMemo, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
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

  const {
    projects,
    loading,
    refresh,
  } = useProjects();

  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] =
    useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [projects, search]);

  const deleteProject = async () => {
    try {
      await projectService.deleteProject(
        deleteId
      );

      toast.success(
        "Project deleted successfully."
      );

      setDeleteId(null);

      refresh();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed."
      );
    }
  };

  const columns = [
    {
      key: "name",
      title: "Project",
    },

    {
      key: "description",
      title: "Description",
    },

    {
      key: "actions",
      title: "Actions",

      render: (project) => (
        <div className="flex gap-3">
          <button
            onClick={() =>
              navigate(`/projects/${project.id}`)
            }
          >
            <Eye
              size={18}
              className="text-blue-600"
            />
          </button>

          <button
            onClick={() =>
              navigate(
                `/projects/edit/${project.id}`
              )
            }
          >
            <Pencil
              size={18}
              className="text-green-600"
            />
          </button>

          <button
            onClick={() =>
              setDeleteId(project.id)
            }
          >
            <Trash2
              size={18}
              className="text-red-600"
            />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Projects"
        buttonText="New Project"
        onClick={() =>
          navigate("/projects/new")
        }
      />

      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredProjects}
        loading={loading}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Project"
        message="Are you sure you want to delete this project?"
        onCancel={() =>
          setDeleteId(null)
        }
        onConfirm={deleteProject}
      />
    </>
  );
};

export default ProjectList;
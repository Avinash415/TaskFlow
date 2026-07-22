import {
  FolderKanban,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "../../../components/common/Card/Card";
import EmptyState from "../../../components/EmptyState/EmptyState";

const projects = [];

const RecentProjects = () => {

  const navigate = useNavigate();

  return (
    <Card>

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            Recent Projects
          </h2>

          <p className="text-sm text-gray-500">
            Your recently created projects
          </p>

        </div>

        <button
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View All
          <ArrowRight size={16} />
        </button>

      </div>

      {projects.length === 0 ? (

        <EmptyState
          title="No Projects Yet"
          description="Create your first project to start collaborating."
        />

      ) : (

        <div className="space-y-4">

          {projects.map((project) => (

            <div
              key={project.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-md"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-blue-100 p-3">

                  <FolderKanban
                    className="text-blue-600"
                    size={22}
                  />

                </div>

                <div>

                  <h3 className="font-semibold">
                    {project.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Owner: {project.owner}
                  </p>

                </div>

              </div>

              <span className="rounded-full bg-green-100 px-4 py-1 text-xs font-semibold text-green-700">
                {project.status}
              </span>

            </div>

          ))}

        </div>

      )}

    </Card>
  );
};

export default RecentProjects;
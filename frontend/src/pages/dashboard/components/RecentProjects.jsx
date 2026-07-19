import Card from "../../../components/common/Card/Card";
import EmptyState from "../../../components/EmptyState/EmptyState";

const projects = [
  {
    id: 1,
    name: "TaskFlow",
    owner: "Avinash",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "HR Portal",
    owner: "Admin",
    status: "ACTIVE",
  },
];

const RecentProjects = () => {
  return (
    <Card title="Recent Projects">
      {projects.length === 0 ? (
        <EmptyState
          title="No Projects"
          description="Create your first project."
        />
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h3 className="font-semibold">
                  {project.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Owner: {project.owner}
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
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
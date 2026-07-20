import Card from "../../../components/common/Card/Card";
import StatusBadge from "../../tasks/components/StatusBadge";
import PriorityBadge from "../../tasks/components/PriorityBadge";
import useDashboard from "../../../hooks/useDashboard";

const RecentTasks = () => {
  const { dashboard, loading } = useDashboard();

  if (loading) {
    return (
      <Card>
        <h2 className="mb-5 text-lg font-semibold">Recent Tasks</h2>
        <p className="text-gray-500">Loading recent tasks...</p>
      </Card>
    );
  }

  const recentTasks = dashboard?.recentTasks || [];

  return (
    <Card>
      <h2 className="mb-5 text-lg font-semibold">Recent Tasks</h2>

      <div className="space-y-4">
        {recentTasks.length === 0 ? (
          <p className="text-gray-500 italic">No recent tasks found.</p>
        ) : (
          recentTasks.map((task) => (
            <div
              key={task.id}
              className="rounded-lg border p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-base">{task.title}</h3>
              {task.projectName && (
                <p className="text-sm text-gray-500 mt-1">
                  {task.projectName}
                </p>
              )}
              <div className="mt-3 flex gap-2">
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default RecentTasks;
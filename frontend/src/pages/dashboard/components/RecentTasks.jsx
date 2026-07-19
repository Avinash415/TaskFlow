import Card from "../../../components/common/Card/Card";
import StatusBadge from "../../tasks/components/StatusBadge";
import PriorityBadge from "../../tasks/components/PriorityBadge";

import useDashboard from "../../../hooks/useDashboard";

const RecentTasks = () => {

  const {
    dashboard,
    loading,
  } = useDashboard();

  if (loading) return null;

  return (

    <Card>

      <h2 className="mb-5 text-lg font-semibold">
        Recent Tasks
      </h2>

      <div className="space-y-4">

        {dashboard.recentTasks.length === 0 ? (

          <p>No recent tasks.</p>

        ) : (

          dashboard.recentTasks.map(task => (

            <div
              key={task.id}
              className="rounded-lg border p-4"
            >

              <h3 className="font-semibold">

                {task.title}

              </h3>

              <p className="text-sm text-gray-500">

                {task.projectName}

              </p>

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
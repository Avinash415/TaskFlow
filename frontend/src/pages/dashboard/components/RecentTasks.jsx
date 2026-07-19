import Card from "../../../components/common/Card/Card";
import Badge from "../../../components/common/Badge/Badge";

const tasks = [
  {
    id: 1,
    title: "Design Dashboard",
    priority: "HIGH",
    status: "IN_PROGRESS",
  },
  {
    id: 2,
    title: "Setup Backend",
    priority: "MEDIUM",
    status: "TODO",
  },
];

const RecentTasks = () => {
  return (
    <Card title="Recent Tasks">
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <h3 className="font-semibold">
                {task.title}
              </h3>
            </div>

            <div className="flex gap-2">
              <Badge value={task.priority} />
              <Badge value={task.status} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentTasks;
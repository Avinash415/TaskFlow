import { TASK_STATUS } from "../../../utils/constants";

const TaskFilters = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row">
      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search task..."
        className="flex-1 rounded-lg border p-3"
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="rounded-lg border p-3"
      >
        <option value="">
          All Status
        </option>

        {TASK_STATUS.map((item) => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskFilters;
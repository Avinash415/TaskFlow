const colors = {
  TODO:
    "bg-gray-100 text-gray-700",

  IN_PROGRESS:
    "bg-yellow-100 text-yellow-700",

  COMPLETED:
    "bg-green-100 text-green-700",
};

const StatusBadge = ({
  status,
}) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[status]
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
};

export default StatusBadge;
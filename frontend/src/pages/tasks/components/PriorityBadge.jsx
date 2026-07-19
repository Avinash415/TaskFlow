const colors = {
  LOW:
    "bg-blue-100 text-blue-700",

  MEDIUM:
    "bg-orange-100 text-orange-700",

  HIGH:
    "bg-red-100 text-red-700",
};

const PriorityBadge = ({
  priority,
}) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[priority]
      }`}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;
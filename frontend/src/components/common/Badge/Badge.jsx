const colors = {
  COMPLETED:
    "bg-green-100 text-green-700",

  IN_PROGRESS:
    "bg-yellow-100 text-yellow-700",

  TODO:
    "bg-gray-100 text-gray-700",

  HIGH:
    "bg-red-100 text-red-700",

  MEDIUM:
    "bg-orange-100 text-orange-700",

  LOW:
    "bg-blue-100 text-blue-700",
};

const Badge = ({ value }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[value] ??
        "bg-gray-100 text-gray-600"
      }`}
    >
      {value}
    </span>
  );
};

export default Badge;
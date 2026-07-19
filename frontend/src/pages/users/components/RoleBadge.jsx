const colors = {
  ADMIN:
    "bg-red-100 text-red-700",

  USER:
    "bg-blue-100 text-blue-700",
};

const RoleBadge = ({ role }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[role]}`}
    >
      {role}
    </span>
  );
};

export default RoleBadge;
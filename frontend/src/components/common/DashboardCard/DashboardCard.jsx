const DashboardCard = ({
  title,
  value,
  icon,
  color = "text-blue-600",
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {value ?? 0}
          </h2>
        </div>

        <div className={color}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
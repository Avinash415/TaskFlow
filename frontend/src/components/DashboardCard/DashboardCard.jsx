const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        <div>{icon}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
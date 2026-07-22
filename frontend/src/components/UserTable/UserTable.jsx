import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

const UserTable = ({
  users,
  onView,
  onRoleChange,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Name
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-center">
              Role
            </th>

            <th className="px-6 py-4 text-center">
              Status
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-medium">
                {user.fullName}
              </td>

              <td className="px-6 py-4">
                {user.email}
              </td>

              <td className="px-6 py-4 text-center">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.role === "ADMIN"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user.role}
                </span>

              </td>

              <td className="px-6 py-4 text-center">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.enabled
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.enabled
                    ? "Active"
                    : "Disabled"}
                </span>

              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => onView(user)}
                    className="rounded-lg p-2 hover:bg-slate-200"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() =>
                      onRoleChange(user)
                    }
                    className="rounded-lg p-2 hover:bg-blue-100"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(user)
                    }
                    className="rounded-lg p-2 hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default UserTable;
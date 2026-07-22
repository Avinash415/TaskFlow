import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import RoleBadge from "../users/components/RoleBadge";
import StatusBadge from "../users/components/StatusBadge";

export const getUserColumns = ({
  onView,
  onRoleChange,
  onDelete,
}) => [
  {
    key: "fullName",
    title: "Full Name",
  },

  {
    key: "email",
    title: "Email",
  },

  {
    key: "role",
    title: "Role",

    render: (user) => (
      <RoleBadge role={user.role} />
    ),
  },

  {
    key: "enabled",
    title: "Status",

    render: (user) => (
      <StatusBadge
        enabled={user.enabled}
      />
    ),
  },

  {
    key: "actions",
    title: "Actions",

    render: (user) => (
      <div className="flex items-center justify-center gap-3">

        <button
          type="button"
          title="View User"
          onClick={() => onView(user)}
          className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100"
        >
          <Eye size={18} />
        </button>

        <button
          type="button"
          title="Change Role"
          onClick={() => onRoleChange(user)}
          className="rounded-lg p-2 text-green-600 transition hover:bg-green-100"
        >
          <Pencil size={18} />
        </button>

        <button
          type="button"
          title="Delete User"
          onClick={() => onDelete(user)}
          className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={18} />
        </button>

      </div>
    ),
  },
];
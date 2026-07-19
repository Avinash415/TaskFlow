import { useMemo, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useUsers from "../../hooks/useUsers";
import * as userService from "../../services/userService";

import DataTable from "../../components/common/Table/DataTable";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import ConfirmDialog from "../../components/common/ConfirmDialog/ConfirmDialog";

import RoleBadge from "./components/RoleBadge";
import StatusBadge from "./components/StatusBadge";

const UserList = () => {
  const navigate = useNavigate();

  const { users, loading, refresh } = useUsers();

  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return (
        user.fullName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [users, search]);

  const handleDelete = async () => {
    try {
      await userService.deleteUser(deleteId);

      toast.success("User deleted successfully.");

      setDeleteId(null);

      refresh();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete user."
      );
    }
  };

  const columns = [
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
        <StatusBadge enabled={user.enabled} />
      ),
    },

    {
      key: "actions",
      title: "Actions",

      render: (user) => (
        <div className="flex gap-3">
          <button
            onClick={() =>
              navigate(`/users/${user.id}`)
            }
          >
            <Eye
              size={18}
              className="text-blue-600"
            />
          </button>

          <button
            onClick={() =>
              navigate(`/users/edit/${user.id}`)
            }
          >
            <Pencil
              size={18}
              className="text-green-600"
            />
          </button>

          <button
            onClick={() =>
              setDeleteId(user.id)
            }
          >
            <Trash2
              size={18}
              className="text-red-600"
            />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Users"
        buttonText="New User"
        onClick={() =>
          navigate("/users/new")
        }
      />

      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        loading={loading}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        onCancel={() =>
          setDeleteId(null)
        }
        onConfirm={handleDelete}
      />
    </>
  );
};

export default UserList;
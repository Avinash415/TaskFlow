import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAdminUsers from "../../hooks/admin/useAdminUsers";

import PageHeader from "../../components/common/PageHeader/PageHeader";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import DataTable from "../../components/common/Table/DataTable";
import Loader from "../../components/Loader/Loader";
import ConfirmDialog from "../../components/common/ConfirmDialog/ConfirmDialog";

import { getUserColumns } from "./userColumns";

const AdminUsers = () => {
  const navigate = useNavigate();

  const { users, loading, removeUser, refresh } = useAdminUsers();

  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [updatingRole, setUpdatingRole] = useState(false);

  const filteredUsers = useMemo(() => {
    const keyword = search.toLowerCase();

    return users.filter((user) => {
      return (
        user.fullName?.toLowerCase().includes(keyword) ||
        user.email?.toLowerCase().includes(keyword)
      );
    });
  }, [users, search]);

  const handleView = (user) => {
    navigate(`/users/${user.id}`);
  };

  const handleRoleChange = (user) => {
  navigate(`/users/edit/${user.id}`);
};

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    const success = await removeUser(selectedUser.id);

    if (success) {
      setDeleteDialogOpen(false);
      setSelectedUser(null);

      refresh();
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const columns = useMemo(
    () =>
      getUserColumns({
        onView: handleView,
        onRoleChange: handleRoleChange,
        onDelete: handleDeleteClick,
      }),
    [],
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader
        title="User Management"
        description="Manage application users."
      />

      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
        />
      </div>

      <DataTable columns={columns} data={filteredUsers} loading={loading} />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete User"
        message={`Are you sure you want to delete "${selectedUser?.fullName}"?`}
        confirmText="Delete User"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
};

export default AdminUsers;

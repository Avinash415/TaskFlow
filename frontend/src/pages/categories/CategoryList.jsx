import { useMemo, useState } from "react";
import { FolderOpen, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useCategories from "../../hooks/useCategories";
import * as categoryService from "../../services/categoryService";

import DataTable from "../../components/common/Table/DataTable";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog/ConfirmDialog";

const CategoryList = () => {
  const navigate = useNavigate();

  const { categories, loading, refresh } = useCategories();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const handleDelete = async () => {
    try {
      await categoryService.deleteCategory(deleteId);

      toast.success("Category deleted successfully.");

      setDeleteId(null);

      refresh();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete category."
      );
    }
  };

  const columns = [
    {
      key: "name",
      title: "Category Name",
    },
    {
      key: "actions",
      title: "Actions",
      render: (category) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              navigate(`/categories/edit/${category.id}`)
            }
            className="rounded-lg bg-green-50 p-2 transition hover:bg-green-100"
            title="Edit Category"
          >
            <Pencil
              size={18}
              className="text-green-600"
            />
          </button>

          <button
            onClick={() => setDeleteId(category.id)}
            className="rounded-lg bg-red-50 p-2 transition hover:bg-red-100"
            title="Delete Category"
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
        title="Categories"
        buttonText="+ New Category"
        onClick={() =>
          navigate("/categories/new")
        }
      />

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Categories
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {categories.length}
          </h2>
        </div>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        {/* Search */}
        <div className="border-b border-gray-100 p-5">
          <SearchBar
            value={search}
            placeholder="Search categories..."
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* Table */}
        <div className="p-5">
          {!loading &&
          filteredCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">

              <div className="mb-5 rounded-full bg-blue-100 p-5">
                <FolderOpen
                  size={48}
                  className="text-blue-600"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800">
                No Categories Found
              </h2>

              <p className="mt-2 max-w-md text-center text-gray-500">
                {search
                  ? "No category matches your search."
                  : "You haven't created any categories yet. Create your first category to organize your tasks."}
              </p>

              {!search && (
                <button
                  onClick={() =>
                    navigate("/categories/new")
                  }
                  className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                  Create Category
                </button>
              )}
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredCategories}
              loading={loading}
            />
          )}
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default CategoryList;
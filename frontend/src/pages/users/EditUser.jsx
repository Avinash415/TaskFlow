import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  UserCircle2,
  Pencil,
} from "lucide-react";

import UserForm from "./UserForm";
import * as userService from "../../services/userService";

import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] =
    useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response =
        await userService.getUser(id);

      // Change this according to your API response
      setUser(response.data);
    } catch {
      toast.error("Unable to load user.");
    } finally {
      setPageLoading(false);
    }
  };

  const submit = async (values) => {
    try {
      setLoading(true);

      await userService.updateUser(
        id,
        values
      );

      toast.success(
        "User updated successfully."
      );

      navigate("/users");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update user."
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <UserCircle2
              size={34}
              className="text-blue-600"
            />

            <div>

              <h1 className="text-3xl font-bold">
                Edit User
              </h1>

              <p className="mt-1 text-gray-500">
                Update user information and
                account settings.
              </p>

            </div>

          </div>

        </div>

        <Button
          variant="outline"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft
            size={18}
            className="mr-2"
          />
          Back
        </Button>

      </div>

      {/* Profile Card */}

      <Card className="overflow-hidden rounded-3xl border shadow-lg">

        <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        <div className="-mt-12 px-8 pb-8">

          <div className="flex items-center gap-5">

            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white shadow-lg">

              <span className="text-4xl font-bold text-blue-600">

                {user?.fullName?.charAt(0)}

              </span>

            </div>

            <div>

              <h2 className="text-2xl font-bold">

                {user?.fullName}

              </h2>

              <p className="text-gray-500">

                {user?.email}

              </p>

            </div>

          </div>

        </div>

      </Card>

      {/* Form */}

      <Card className="rounded-3xl border shadow-md">

        <div className="mb-8 flex items-center gap-3">

          <div className="rounded-xl bg-blue-100 p-3">

            <Pencil
              className="text-blue-600"
              size={20}
            />

          </div>

          <div>

            <h3 className="text-xl font-semibold">

              User Information

            </h3>

            <p className="text-sm text-gray-500">

              Modify user details and save
              your changes.

            </p>

          </div>

        </div>

        <UserForm
          defaultValues={{
            ...user,
            password: "",
          }}
          onSubmit={submit}
          loading={loading}
        />

      </Card>

    </div>
  );
};

export default EditUser;
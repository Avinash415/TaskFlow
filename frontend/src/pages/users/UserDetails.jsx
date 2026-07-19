import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import * as userService from "../../services/userService";

import Card from "../../components/common/Card/Card";

import RoleBadge from "./components/RoleBadge";
import StatusBadge from "./components/StatusBadge";

const UserDetails = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response =
        await userService.getUser(id);

      setUser(response.data);
    } catch {
      toast.error("Unable to load user.");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card>

      <h2 className="mb-6 text-2xl font-bold">
        User Details
      </h2>

      <div className="space-y-5">

        <div>
          <p className="text-sm text-gray-500">
            Full Name
          </p>

          <h3 className="text-lg font-semibold">
            {user.fullName}
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Email
          </p>

          <p>{user.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Role
          </p>

          <RoleBadge role={user.role} />
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>

          <StatusBadge
            enabled={user.enabled}
          />
        </div>

      </div>

    </Card>
  );
};

export default UserDetails;
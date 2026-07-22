import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Mail,
  User,
  Shield,
  CheckCircle2,
  ArrowLeft,
  Edit,
} from "lucide-react";

import * as userService from "../../services/userService";

import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";

import RoleBadge from "./components/RoleBadge";
import StatusBadge from "./components/StatusBadge";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await userService.getUser(id);
      setUser(response.data);
    } catch {
      toast.error("Unable to load user.");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center py-24">
        <div className="text-gray-500">Loading user...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">User Details</h1>
          <p className="text-gray-500 mt-1">
            View complete information about this user.
          </p>
        </div>

        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} className="mr-2" />
          Back
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="rounded-3xl shadow-lg border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32" />

        <div className="px-8 pb-8 -mt-14">
          <div className="w-28 h-28 rounded-full bg-white shadow-lg border-4 border-white flex items-center justify-center text-4xl font-bold text-blue-600">
            {user.fullName?.charAt(0)}
          </div>

          <div className="mt-5">
            <h2 className="text-3xl font-bold">{user.fullName}</h2>

            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
      </Card>

      {/* Details */}
      <Card className="rounded-3xl shadow-sm">
        <h3 className="text-xl font-semibold mb-8">Personal Information</h3>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-100">
              <User className="text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Full Name</p>

              <h4 className="font-semibold text-lg">{user.fullName}</h4>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-green-100">
              <Mail className="text-green-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Email Address</p>

              <h4 className="font-semibold text-lg">{user.email}</h4>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-yellow-100">
              <Shield className="text-yellow-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">User Role</p>

              <RoleBadge role={user.role} />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-100">
              <CheckCircle2 className="text-emerald-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Account Status</p>

              <StatusBadge enabled={user.enabled} />
            </div>
          </div>
        </div>
      </Card>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>

        <Button onClick={() => navigate(`/users/edit/${user.id}`)}>
          <Edit size={18} className="mr-2" />
          Edit User
        </Button>
      </div>
    </div>
  );
};

export default UserDetails;

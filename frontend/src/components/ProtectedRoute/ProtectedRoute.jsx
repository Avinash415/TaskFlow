import { Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({
  children,
  roles = [],
}) => {
  const {
    loading,
    isAuthenticated,
    user,
  } = useAuth();

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    roles.length &&
    !roles.includes(user?.role)
  ) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default ProtectedRoute;
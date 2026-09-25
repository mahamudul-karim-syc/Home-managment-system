
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Context/AuthProvider";

const AdminProtecd = ({ children }) => {
  const { authuser, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading.........</p>;
  }

  
  if (!authuser) {
    return <Navigate to="/login" replace />;
  }

  if (authuser.role !== "admin") {
    return <Navigate to="/Home" replace />;
  }

  return children;
};

export default AdminProtecd;


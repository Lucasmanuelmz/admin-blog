import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authContex";

export default function ProtectedRoute({ element }) {
  const isAuthenticated = useAuth(); 
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

// Wraps a page/route that requires a logged-in user (e.g. table booking).
// Unauthenticated visitors are redirected to /login with a toast explaining why,
// and are sent back to the page they wanted once they log in.
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      showToast("Please login to book a table.", "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layouts/Loader";

function ProtectedRoute({ children, isAdmin }) {
  const { isAuthunticated, user, loading } = useSelector(
    (state) => state.authState
  );
  // console.log(isAuthunticated, loading);

  if (!isAuthunticated && !loading) {
    if (user) {
      return <Navigate to="/myprofile" />;
    }
    // console.log("protcet");
    return <Navigate to="/login" />;
  }
  if (isAuthunticated) {
    if (isAdmin && user.role !== "admin") {
      return <Navigate to="/" />;
    }
    return children;
  }
  if (loading) {
    return <Loader />;
  }
}

export default ProtectedRoute;

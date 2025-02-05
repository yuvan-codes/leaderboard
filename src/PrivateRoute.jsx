import { useContext, useState } from "react";
import AdminInterface from "./AdminInterface";
import PasswordPrompt from "./components/PasswordPrompts";
import { PointsContext } from "./context/PointsContext";
import useAuth from "./hooks/useAuth";

function PrivateRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { verifyAdmin } = useAuth();
  const { admin } = useContext(PointsContext);

  const handlePasswordSubmit = async (password) => {
    await verifyAdmin(password);
    if (admin) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  return isAuthenticated ? (
    <AdminInterface />
  ) : (
    <PasswordPrompt onPasswordSubmit={handlePasswordSubmit} />
  );
}

export default PrivateRoute;

import { useContext } from "react";
import { PointsContext } from "../context/PointsContext";

const useAuth = () => {
  const { setAdmin } = useContext(PointsContext);
  const verifyAdmin = async (password) => {
    try {
      // console.log(team);
      const response = await fetch(
        "https://hackathonbackend-0zxm.onrender.com/api/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: Internal Server Error`);
      }
      const data = await response.json();
      setAdmin(data.correct);
    } catch (error) {
      console.error("Failed to add team:", error);
    }
  };
  return { verifyAdmin };
};

export default useAuth;

import { useContext } from "react";
import { PointsContext } from "../context/PointsContext";

const useGetTeams = () => {
  const { allPoints, setAllPoints } = useContext(PointsContext);
  const getTeams = async () => {
    try {
      const response = await fetch(
        "https://hackathonbackend-0zxm.onrender.com/api/leaderboard",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: Internal Server Error`);
      }

      const data = await response.json();
      setAllPoints(data);
      // console.log("Teams Data:", data);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    }
  };

  const addNewTeam = async (team) => {
    try {
      // console.log(team);
      const response = await fetch(
        "https://hackathonbackend-0zxm.onrender.com/api/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ team }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: Internal Server Error`);
      }
      const data = await response.json();
      setAllPoints(data);
    } catch (error) {
      console.error("Failed to add team:", error);
    }
  };
  const eraseTeam = async (team) => {
    try {
      console.log("To be deleted: " + team);
      const response = await fetch(
        "https://hackathonbackend-0zxm.onrender.com/api/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ team }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: Internal Server Error`);
      }
      const data = await response.json();
      setAllPoints(data);
    } catch (error) {
      console.error("Failed to add team:", error);
    }
  };

  const addPoints = async (team, value) => {
    try {
      const response = await fetch(
        "https://hackathonbackend-0zxm.onrender.com/api/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ team, value }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: Internal Server Error`);
      }
      const data = await response.json();
      setAllPoints(data);
    } catch (error) {
      console.error("Failed to add team:", error);
    }
  };

  return { getTeams, addNewTeam, eraseTeam, addPoints };
};

export default useGetTeams;

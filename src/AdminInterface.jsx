import React, { useContext, useEffect, useState } from "react";
import { Trash, Plus, Edit, CheckCircle, XCircle } from "lucide-react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./components/Dialog";
import useGetTeams from "./hooks/useGetTeams";
import { PointsContext } from "./context/PointsContext";

const AdminInterface = () => {
  const [teams, setTeams] = useState([]);
  const [scores, setScores] = useState([]);
  const { allPoints, setAllPoints } = useContext(PointsContext);
  const { addNewTeam, eraseTeam, getTeams, addPoints } = useGetTeams();
  useEffect(() => {
    getTeams();
  }, []);

  useEffect(() => {
    if (allPoints?.Scores) {
      setTeams(allPoints.Scores);
    }
  });
  const [newTeam, setNewTeam] = useState("");
  // const [points, setPoints] = useState({});
  const [deleteTeam, setDeleteTeam] = useState(null);

  const addTeam = async () => {
    if (newTeam.trim() !== "") {
      await addNewTeam(newTeam);
      setTeams([...teams, { name: newTeam, points: 0 }]);
      setNewTeam("");
    }
  };

  const updatePoints = async (name, value) => {
    await addPoints(name, value);
    setTeams(
      teams.map((team) =>
        team.teamName === name ? { ...team, points: team.points + value } : team
      )
    );
  };

  const confirmDelete = async () => {
    // console.log(deleteTeam);
    await eraseTeam(deleteTeam.teamName);
    setTeams(teams.filter((team) => team.id !== deleteTeam.id));
    setDeleteTeam(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 to-indigo-800 flex flex-col items-center p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white flex items-center gap-2">
        Admin Panel
      </h1>

      {/* Add Team */}
      <div className="flex space-x-4">
        <Input
          placeholder="Enter team name"
          value={newTeam}
          onChange={(e) => setNewTeam(e.target.value)}
          className="w-64"
        />
        <Button
          onClick={addTeam}
          className="bg-blue-500 hover:bg-blue-600 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Team
        </Button>
      </div>

      {/* Team List */}
      <div className="w-full max-w-3xl bg-slate-900/50 backdrop-blur-sm p-6 rounded-lg shadow-xl">
        <table className="w-full text-white">
          <thead>
            <tr className="bg-slate-800 text-gray-300">
              <th className="p-4 text-left">Team</th>
              <th className="p-4 text-center">Points</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams
              .sort((a, b) => {
                if (b.score !== a.score) {
                  return b.score - a.score;
                }
                return 0;
              })
              .map((team) => (
                <tr
                  key={team.id}
                  className="border-t border-slate-700 hover:bg-slate-700/30 transition-all"
                >
                  <td className="p-4">{team.teamName}</td>
                  <td className="p-4 text-center">{team.score}</td>
                  <td className="p-4 text-right space-x-2">
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => updatePoints(team.teamName, 10)}
                    >
                      <Plus className="w-4 h-4" /> 10
                    </Button>
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => updatePoints(team.teamName, 1)}
                    >
                      <Plus className="w-4 h-4" /> 10
                    </Button>
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => updatePoints(team.teamName, 0.1)}
                    >
                      <Plus className="w-4 h-4" /> 10
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => setDeleteTeam(team)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Popup */}
      {deleteTeam && (
        <Dialog open={!!deleteTeam} onOpenChange={() => setDeleteTeam(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p className="text-white">
              Are you sure you want to delete <strong>{deleteTeam.name}</strong>
              ?
            </p>
            <DialogFooter className="flex justify-end space-x-2">
              <Button
                className="bg-gray-600 hover:bg-gray-700"
                onClick={() => setDeleteTeam(null)}
              >
                <XCircle className="w-5 h-5 mr-2" /> Cancel
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={confirmDelete}
              >
                <CheckCircle className="w-5 h-5 mr-2" /> Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminInterface;

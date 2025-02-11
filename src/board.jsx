import React, { useContext, useEffect, useState } from "react";
import { Brain, Trophy, TrendingUp } from "lucide-react";
import useGetTeams from "./hooks/useGetTeams";
import { PointsContext } from "./context/PointsContext";

const Leaderboard = () => {
  const [teams] = useState([
    { rank: 1, name: "DataMinds", points: 2850, trend: "up", accuracy: 98.5 },
    {
      rank: 2,
      name: "Neural Ninjas",
      points: 2720,
      trend: "down",
      accuracy: 97.8,
    },
    { rank: 3, name: "ML Masters", points: 2695, trend: "up", accuracy: 96.9 },
    {
      rank: 4,
      name: "PyTorch Pioneers",
      points: 2580,
      trend: "up",
      accuracy: 95.7,
    },
    {
      rank: 5,
      name: "TensorFlow Tigers",
      points: 2495,
      trend: "down",
      accuracy: 94.8,
    },
  ]);
  const [scores, setScores] = useState([]);
  const { allPoints } = useContext(PointsContext);
  const { getTeams } = useGetTeams();
  useEffect(() => {
    getTeams();
  }, []);

  useEffect(() => {
    if (allPoints?.Scores) {
      setScores(allPoints.Scores);
    }
  });
  // console.log(allPoints);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 to-indigo-800 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-6">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white flex items-center gap-2 animate__animated animate__fadeIn animate__delay-1s">
              <Brain className="w-10 h-10 text-blue-400" />
              DataQuest 2.0 2025
              <p className="text-sm text-gray-300">By DSC VITC</p>
            </h1>
            <Trophy className="w-10 h-10 text-yellow-400 animate__animated animate__fadeIn animate__delay-1s" />
          </div>
          <p className="text-slate-300 text-lg animate__animated animate__fadeIn animate__delay-1.2s">
            Overall Leaderboard • February 2025
          </p>
        </div>

        <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900/50 backdrop-blur-sm shadow-xl">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-slate-300">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-medium">
                  Rank
                </th>
                <th className="py-4 px-6 text-left text-sm font-medium">
                  Team
                </th>
                <th className="py-4 px-6 text-right text-sm font-medium">
                  Accuracy
                </th>
                <th className="py-4 px-6 text-right text-sm font-medium">
                  Points
                </th>
                <th className="py-4 px-6 text-center text-sm font-medium">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {scores
                .sort((a, b) => {
                  return b.score - a.score;
                })
                .map((team, index) => (
                  <tr
                    key={index + 1}
                    className={`border-t border-slate-700  ${
                      index + 1 === 1
                        ? "bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800"
                        : "hover:bg-slate-700/30"
                    } transition-all duration-200 hover:scale-[1.02]`}
                  >
                    <td className="py-4 px-6 text-sm">
                      {index + 1 === 1 ? (
                        <span className="inline-flex items-center justify-center w-10 h-10 bg-yellow-500/20 text-yellow-400 rounded-full font-semibold text-lg">
                          1
                        </span>
                      ) : (
                        index + 1
                      )}
                    </td>
                    <td className="py-4 px-6 font-semibold text-white">
                      {team.teamName}
                    </td>
                    <td className="py-4 px-6 text-right text-sm">
                      {team.accuracy}%
                    </td>
                    <td className="py-4 px-6 text-right font-semibold text-white">
                      {team.score.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <TrendingUp
                        className={`inline-block w-6 h-6 ${
                          team.trend === "up"
                            ? "text-green-400 rotate-0"
                            : "text-red-400 rotate-180"
                        } transition-transform hover:scale-110`}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

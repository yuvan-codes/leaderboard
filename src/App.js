import { Routes, Route } from "react-router-dom";
import Leaderboard from "./board";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Leaderboard />} />
        <Route path="/admin" element={<PrivateRoute />} />
      </Routes>
    </>
  );
}

export default App;

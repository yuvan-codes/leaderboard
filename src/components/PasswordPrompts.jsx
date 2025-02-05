import { useState } from "react";

function PasswordPrompt({ onPasswordSubmit }) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onPasswordSubmit(password);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 to-indigo-800 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6 bg-slate-900/50 rounded-lg shadow-xl backdrop-blur-sm p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Enter Admin Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordPrompt;

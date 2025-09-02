import { lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

const DotaMatch = lazy(() => import("./pages/dota2/DotaMatch"));
const AppList = lazy(() => import("./pages/AppList"));

function App() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="text-xl font-bold">SteamLet</div>
        <nav className="flex gap-4">
          <button className="hover:underline" onClick={() => navigate("/apps")}>Library</button>
          <button className="hover:underline" onClick={() => navigate("/dota-match")}>Dota 2 Live</button>
          <button className="hover:underline">Settings</button>
        </nav>
        <input
          type="text"
          placeholder="Search games..."
          className="px-2 py-1 rounded text-black"
        />
      </header>

      {/* Routes */}
      <div className="flex-1 overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/apps" element={<AppList />} />
            <Route path="/dota-match" element={<DotaMatch />} />
          </Routes>
        </Suspense>
      </div>

      {/* Footer */}
      <footer className="p-4 bg-gray-800 text-white text-center">
        SteamLet – Custom Dota 2 Launcher
      </footer>
    </div>
  );
}

export default App;

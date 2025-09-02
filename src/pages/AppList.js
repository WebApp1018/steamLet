import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppList = () => {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);

    useEffect(() => {
        // Fetch games from Electron main process
        if (window.electron) {
            window.electron.invoke("get-games").then(setGames);
        } else {
            // fallback for testing
            setGames([
                { appid: 570, name: "Dota 2" },
                { appid: 730, name: "CS:GO" },
                { appid: 440, name: "Team Fortress 2" },
            ]);
        }
    }, []);

    return (
        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 p-4">
                <h2 className="font-bold mb-4">Categories</h2>
                <ul className="space-y-2">
                    <li className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">All Games</li>
                    <li className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">Favorites</li>
                    <li className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">Installed</li>
                    <li className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">Recently Played</li>
                </ul>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-4 grid grid-cols-3 gap-4 overflow-auto">
                {games.map((g) => (
                    <div key={g.appid} className="bg-gray-200 p-4 rounded shadow flex flex-col items-center">
                        <div className="h-32 w-32 bg-gray-400 mb-2"></div> {/* Placeholder for cover */}
                        <h3 className="font-bold mb-2">{g.name}</h3>
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            onClick={() => {
                                if (g.appid === 570) navigate("/dota-match");
                                if (window.electron) window.electron.invoke("launch-game", g.appid);
                            }}
                        >
                            Play
                        </button>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default AppList;
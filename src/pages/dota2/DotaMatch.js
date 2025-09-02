import { useEffect, useState } from "react";

const DotaMatch = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        window.electron.on("gsi-update", (data) => {
            setEvents((prev) => [...prev, data]);
        });
    }, []);

    return (
        <div>
            <h2>Live Dota 2 Match Events</h2>
            <pre>{JSON.stringify(events, null, 2)}</pre>
        </div>
    );
}

export default DotaMatch;
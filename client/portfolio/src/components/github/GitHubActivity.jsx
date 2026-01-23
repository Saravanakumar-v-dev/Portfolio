import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GitHubActivity({ username = "your-github" }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchActivity() {
      try {
        // GitHub public events API
        const res = await axios.get(`https://api.github.com/users/${username}/events`);
        setEvents(res.data.slice(0, 10)); // show latest 10 events
      } catch (err) {
        console.error("GitHub activity fetch failed", err);
      }
    }
    fetchActivity();
  }, [username]);

  return (
    <section className="my-16">
      <h2 className="text-2xl font-semibold mb-6">GitHub Recent Activity</h2>

      <div className="space-y-4">
        {events.map((ev) => (
          <div key={ev.id} className="card">
            <p className="font-semibold">{ev.type}</p>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
              Repo: {ev.repo.name}
            </p>
            <p className="text-xs mt-1 text-gray-500">
              {new Date(ev.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

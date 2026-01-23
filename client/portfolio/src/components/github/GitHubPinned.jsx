import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GitHubPinned({ username }) {
  const [repos, setRepos] = useState([]);   // ALWAYS start as array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPinned() {
      try {
        const res = await axios.get(`/api/github/pinned?user=${username}`);

        // Ensure repos is ALWAYS an array
        const data = Array.isArray(res.data) ? res.data : [];

        setRepos(data);
      } catch (err) {
        console.error("GitHub pinned fetch error:", err);
        setError("Failed to load pinned repositories.");
      } finally {
        setLoading(false);
      }
    }

    fetchPinned();
  }, [username]);

  if (loading)
    return <p className="text-gray-500 dark:text-gray-300">Loading pinned repositories...</p>;

  if (error)
    return <p className="text-red-500">{error}</p>;

  if (!repos.length)
    return <p className="text-gray-500 dark:text-gray-300">No pinned repos found.</p>;

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold mb-4">Pinned Repositories</h3>

      <div className="space-y-4">
        {repos.map((repo) => (
          <div key={repo.id} className="p-4 border rounded-md shadow-sm dark:border-gray-700">
            <h4 className="font-bold">{repo.name}</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{repo.description}</p>
            <a
              href={repo.html_url}
              target="_blank"
              className="text-indigo-600 dark:text-indigo-400 text-sm underline"
            >
              View Repo
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

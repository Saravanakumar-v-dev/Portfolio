import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("adminToken");

  const fetchMessages = async () => {
    const res = await axios.get("http://localhost:8000/api/admin/messages", {
  headers: { Authorization: `Bearer ${token}` },
});
    setMessages(res.data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    const res = await axios.get("http://localhost:8000/api/admin/messages", {
  headers: { Authorization: `Bearer ${token}` },
});
    fetchMessages();
  };
  

  return (
    <div className="min-h-screen p-10 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Admin Dashboard
      </h1>

      <div className="space-y-6">
        {messages.map((msg) => (
          <motion.div
            key={msg._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <p className="font-semibold">{msg.name}</p>
            <p className="text-sm text-gray-500">{msg.email}</p>
            <p className="mt-3">{msg.message}</p>

            <button
              onClick={() => deleteMessage(msg._id)}
              className="mt-4 px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

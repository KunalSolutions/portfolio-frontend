import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET;

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null); // For modal

  const login = () => {
    if (password === ADMIN_SECRET) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Invalid admin password");
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        headers: { "x-admin-secret": ADMIN_SECRET },
      });
      const data = await res.json();
      if (res.ok) setMessages(data);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsReplied = async (id) => {
    await fetch(`${API_URL}/api/contact/${id}`, {
      method: "PATCH",
      headers: { "x-admin-secret": ADMIN_SECRET },
    });
    fetchMessages();
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await fetch(`${API_URL}/api/contact/${id}`, {
      method: "DELETE",
      headers: { "x-admin-secret": ADMIN_SECRET },
    });
    fetchMessages();
  };

  useEffect(() => {
    if (authenticated) fetchMessages();
  }, [authenticated]);

  /* LOGIN SCREEN */
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Admin Login
          </h2>

          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            onClick={login}
            className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  /* DASHBOARD */
  return (
    <div
      className={`min-h-screen p-8 transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={() => setAuthenticated(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {loading && <p>Loading messages...</p>}
        {messages.length === 0 && <p>No messages found</p>}

        <div className="grid md:grid-cols-2 gap-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-l-4 flex flex-col justify-between cursor-pointer hover:shadow-lg transition ${
                msg.status === "unread"
                  ? "border-yellow-500"
                  : "border-green-500"
              }`}
              onClick={() => setSelectedMessage(msg)} // Open modal
            >
              <div>
                <h4 className="font-semibold text-lg">{msg.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {msg.email}
                </p>
                <p className="mt-2 text-gray-700 dark:text-gray-200 truncate">
                  {msg.message}
                </p>
                <p className="mt-2 text-sm">
                  Status:{" "}
                  <span
                    className={
                      msg.status === "unread"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-green-600 dark:text-green-400"
                    }
                  >
                    {msg.status}
                  </span>
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                {msg.status === "unread" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsReplied(msg._id);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Mark as Replied
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMessage(msg._id);
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2">{selectedMessage.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
              {selectedMessage.email}
            </p>
            <p className="mb-4">{selectedMessage.message}</p>
            <p className="text-sm">
              Status:{" "}
              <span
                className={
                  selectedMessage.status === "unread"
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-green-600 dark:text-green-400"
                }
              >
                {selectedMessage.status}
              </span>
            </p>

            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

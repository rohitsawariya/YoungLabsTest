import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000";

  const fetchGreeting = async () => {
    if (!name.trim()) {
      setGreeting("Error: Name is required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/greet?name=${name}`);
      const data = await response.json();
      setGreeting(data.message || data.error);
    } catch (error) {
      setGreeting("Failed to fetch greeting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Enter Your Name</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchGreeting();
            }
          }}
          placeholder="Your Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />


        <button
          onClick={fetchGreeting}
          disabled={loading}
          className={`w-full px-6 py-2 rounded-lg transition duration-200 ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
        >
          {loading ? "Loading..." : "Get Greeting"}
        </button>

        {greeting && <h3 className="mt-4 text-lg font-medium text-gray-800">{greeting}</h3>}
      </div>
    </div>
  );
}

export default App;

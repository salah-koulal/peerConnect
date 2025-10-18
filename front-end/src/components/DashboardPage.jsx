import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const DashboardPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/groups");
        const data = await response.json();
        if (response.ok) {
          setGroups(data);
        } else {
          console.error("Failed to fetch groups:", data.message);
        }
      } catch (err) {
        console.error("Error fetching groups:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const handleJoinGroup = async (groupId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:4000/api/groups/${groupId}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Joined group successfully!");
        setGroups((prev) =>
          prev.map((g) =>
            g._id === groupId ? { ...g, members: [...g.members, userId] } : g
          )
        );
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Join group error:", err);
    }
  };

  const handleEnterGroup = (groupId) => {
    navigate(`/groups/${groupId}`); // Use react-router for navigation
  };

  return (
    <>
      <Navbar currentPage="dashboard" />
      <main className="px-6 py-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-semibold mb-1">
              Welcome back, <span className="text-indigo-400">Student</span> 👋
            </h2>
            <p className="text-gray-400">Find your next study group or peer to collaborate with.</p>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading groups...</p>
        ) : (
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => {
              const isMember = group.members.includes(userId);
              return (
                <div
                  key={group._id}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition"
                >
                  <h3 className="text-xl font-semibold mb-2 text-indigo-400">{group.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{group.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>🕒 {group.schedule || "N/A"}</span>
                    <span>👥 {group.members.length} Members</span>
                  </div>
                  <button
                    onClick={() =>
                      isMember ? handleEnterGroup(group._id) : handleJoinGroup(group._id)
                    }
                    className={`w-full py-2 rounded-md font-semibold text-sm ${
                      isMember
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {isMember ? "Enter Group" : "Join Group"}
                  </button>
                </div>
              );
            })}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default DashboardPage;

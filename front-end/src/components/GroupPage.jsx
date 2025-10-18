import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const GroupPage = () => {
  const { groupId } = useParams(); // get ID from URL
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/groups/${groupId}`);
        const data = await response.json();

        if (response.ok) {
          setGroup(data);
          setMessages(data.messages || []); // backend may store messages
        } else {
          console.error("Failed to fetch group:", data.message);
        }
      } catch (err) {
        console.error("Error fetching group:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);

  const handleJoinGroup = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:4000/api/groups/${groupId}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: JSON.parse(localStorage.getItem("user"))?._id }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("You joined the group!");
        setGroup(data.group);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Join group error:", err);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:4000/api/groups/${groupId}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: message }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessages(data.messages);
        setMessage("");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  if (loading) return <p className="text-center mt-12 text-gray-400">Loading group...</p>;
  if (!group) return <p className="text-center mt-12 text-red-400">Group not found</p>;

  return (
    <>
      <Navbar currentPage="groups" />
      <main className="px-6 py-12 max-w-5xl mx-auto">
        {/* Group Info */}
        <section className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-indigo-400 mb-2">{group.name}</h2>
              <p className="text-gray-400 mb-4 max-w-lg">{group.description}</p>
              <div className="text-sm text-gray-400 space-y-1">
                <p>
                  🕒 <span className="font-medium text-gray-200">{group.schedule || "TBD"}</span>
                </p>
                <p>📚 Topics: {group.subject || "Various"}</p>
                <p>👥 Current Members: {group.members?.length || 0}</p>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="mt-6 md:mt-0">
  {group.members?.includes(userId) ? (
    <button
      onClick={async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:4000/api/groups/${groupId}/leave`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId }),
          });
          const data = await response.json();
          if (response.ok) {
            alert('You have left the group.');
            setGroup((prev) => ({
              ...prev,
              members: prev.members.filter((m) => m !== userId),
            }));
          } else {
            alert(data.message);
          }
        } catch (err) {
          console.error('Leave group error:', err);
        }
      }}
      className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition"
    >
      Leave Group
    </button>
  ) : (
    <button
      onClick={async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:4000/api/groups/${groupId}/join`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId }),
          });
          const data = await response.json();
          if (response.ok) {
            alert('You joined the group!');
            setGroup((prev) => ({
              ...prev,
              members: [...prev.members, userId],
            }));
          } else {
            alert(data.message);
          }
        } catch (err) {
          console.error('Join group error:', err);
        }
      }}
      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold transition"
    >
      Join Group
    </button>
  )}
</div>
            </div>
          </div>
        </section>

        {/* Group Members */}
<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
  {group.members?.map((member) => (
    <div
      key={member?._id || Math.random()}
      className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition"
    >
      <h4 className="font-semibold text-lg mb-1 text-gray-200">{member?.username || "Unknown"}</h4>
      <p className="text-gray-400 text-sm mb-2">{member?.role || "Student"}</p>
      <p className="text-gray-400 text-xs">Skills: {member?.skills || "N/A"}</p>
    </div>
  ))}
</div>

{/* Group Chat */}
        <section className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h3 className="text-2xl font-semibold mb-6 text-indigo-400">Group Chat</h3>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 h-64 overflow-y-auto mb-4">
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-3">
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-indigo-400">{msg.user.username || msg.user}:</span>{" "}
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold transition"
            >
              Send
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GroupPage;

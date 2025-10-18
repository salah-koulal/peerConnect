import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CreateGroupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    hoursPerDay: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Group name is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Group created successfully!");
        window.location.hash = "#dashboard"; // redirect after creation
      } else {
        alert(data.message || "Error creating group");
      }
    } catch (err) {
      console.error("Create group error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <Navbar currentPage="groups" />
      <main className="px-6 py-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-indigo-400">Create a New Study Group</h1>
        <form className="bg-gray-800 rounded-xl p-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-gray-300">Group Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md bg-gray-700 border ${
                errors.name ? "border-red-500" : "border-gray-600"
              } text-gray-200 focus:outline-none focus:ring-2 ${errors.name ? "focus:ring-red-500" : "focus:ring-indigo-500"}`}
              placeholder="Frontend Wizards"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Subject / Topic</label>
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md bg-gray-700 border ${
                errors.subject ? "border-red-500" : "border-gray-600"
              } text-gray-200 focus:outline-none focus:ring-2 ${errors.subject ? "focus:ring-red-500" : "focus:ring-indigo-500"}`}
              placeholder="React / JavaScript / Python"
            />
            {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe your group..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-300">Start Date</label>
              <input
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md bg-gray-700 border ${
                  errors.startDate ? "border-red-500" : "border-gray-600"
                } text-gray-200 focus:outline-none focus:ring-2 ${errors.startDate ? "focus:ring-red-500" : "focus:ring-indigo-500"}`}
              />
              {errors.startDate && <p className="text-red-400 text-sm mt-1">{errors.startDate}</p>}
            </div>

            <div>
              <label className="block mb-1 text-gray-300">End Date</label>
              <input
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md bg-gray-700 border ${
                  errors.endDate ? "border-red-500" : "border-gray-600"
                } text-gray-200 focus:outline-none focus:ring-2 ${errors.endDate ? "focus:ring-red-500" : "focus:ring-indigo-500"}`}
              />
              {errors.endDate && <p className="text-red-400 text-sm mt-1">{errors.endDate}</p>}
            </div>
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Hours Per Day</label>
            <input
              name="hoursPerDay"
              type="number"
              value={formData.hoursPerDay}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="2"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Online / Campus Room 101"
            />
          </div>

          <button type="submit" className="w-full py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold mt-4">
            Create Group
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default CreateGroupPage;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardPage from "./components/DashboardPage";
import GroupPage from "./components/GroupPage";
import CreateGroupPage from "./components/CreateGroupPage";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-900 text-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/groups/:groupId" element={<GroupPage />} />
          <Route path="/create-group" element={<CreateGroupPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

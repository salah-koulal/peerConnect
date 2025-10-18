import Footer from "./Footer";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar currentPage="home" />
      <section className="flex flex-col items-center text-center justify-center min-h-[80vh] px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Connect. Collaborate. <span className="text-indigo-400">Code Together.</span>
        </h2>
        <p className="text-gray-400 max-w-xl mb-8">
          Find study partners or groups who share your goals, interests, and learning pace.
          Grow together through coding peerConnect :)
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate("/login")}
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg text-lg font-semibold transition"
          >
            Get Started
          </button>
          <button 
            onClick={() => navigate("/dashboard")}
            className="border border-indigo-500 text-indigo-400 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-500/10 transition"
          >
            Explore Groups
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;

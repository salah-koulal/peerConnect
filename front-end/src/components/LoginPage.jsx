import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard'); // redirect using react-router
      } else {
        alert(data.message); // show error from backend
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-900">
      <main className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center text-indigo-400">peerConnect</h1>
        <p className="mb-8 text-center text-gray-400">
          Connect with fellow learners and find your perfect study group.
        </p>
        <div className="space-y-6">
          <div>
            <label htmlFor="login" className="block mb-2 text-sm font-medium text-gray-300">
              Username or Email
            </label>
            <input
              id="login"
              name="login"
              type="text"
              value={formData.login}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your login"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors font-semibold text-lg"
          >
            Log In
          </button>
        </div>
        <p className="mt-6 text-center text-gray-500 text-sm">
          New to peerConnect?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-indigo-400 hover:underline"
          >
            Create an account
          </button>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;

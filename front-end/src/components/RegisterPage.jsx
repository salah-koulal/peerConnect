import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    try {
      const response = await fetch('http://localhost:4000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard'); // navigate using react-router
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Server error. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // navigate using react-router
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center px-4">
      <main className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center text-indigo-400">peerConnect</h1>
        <p className="mb-8 text-center text-gray-400">Connect with fellow learners and find your perfect study group.</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">Username</label>
            <input id="username" name="username" type="text" value={formData.username} onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md bg-gray-700 border ${errors.username ? 'border-red-500' : 'border-gray-600'} text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 ${errors.username ? 'focus:ring-red-500' : 'focus:ring-indigo-500'}`}
              placeholder="Enter your username" />
            {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-indigo-500'}`}
              placeholder="Enter your email" />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">Password</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md bg-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-600'} text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-indigo-500'}`}
              placeholder="Enter your password" />
            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
          </div>
          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-300">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md bg-gray-700 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-indigo-500'}`}
              placeholder="Confirm your password" />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
          </div>
          {/* Submit */}
          <button type="submit" className="w-full py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 font-semibold text-lg">Register</button>
        </form>
        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account? <button onClick={handleLoginRedirect} className="text-indigo-400 hover:underline">Login</button>
        </p>
      </main>
    </div>
  );
};

export default RegisterPage;

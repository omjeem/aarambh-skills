import React, { useState } from 'react';
import Nav from '../Common/Nav';
import Bannertemp from '../AboutPage/Bannertemp';
import { useNavigate } from 'react-router-dom';
import envConfig from '../../utils/envConfig';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${envConfig.backendUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.status) {
        setSuccess(data.message);
        // Store token and user data in localStorage
        localStorage.setItem('token', data.token);
        console.log(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.user?.is_superuser) {
          setTimeout(() => {
            navigate('/admin/dashboard');
          }, 1000);
        } else if (data.user) {
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        }
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <Bannertemp value="Login Page" />
      <div className="flex items-center justify-center py-12 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full flex gap-8 items-center">
          {/* Left side - Image */}
          <div className="hidden md:block w-1/2">
            <img
              src="/images/Login.png"
              alt="Learning illustration"
              className="w-full h-auto"
            />
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Login</h2>
              <p className="mt-4 text-sm text-gray-600">
                Hey enter your details to login your account
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg"
                  required
                />
              </div>
              <h2 onClick={() => navigate("/forget-password")} className='ml-2 text-sm cursor-pointer text-gray-600 hover:text-gray-800'>Forgot Password ?</h2>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full mt-10 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#020A47] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Logging in...' : 'Continue'}
                </button>
              </div>
            </form>
            {error && (
              <div className="text-red-500 text-center p-2 bg-red-50 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-500 text-center p-2 bg-green-50 rounded-md">
                {success}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
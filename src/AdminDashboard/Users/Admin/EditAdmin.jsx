import React, { useState } from 'react';
import Nav from '../../Common/Nav';
import Sidebar from '../../Common/Sidebar';
import Bannertemp from '../../../components/AboutPage/Bannertemp';




const EditStudent = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    courses: [],
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // API 
    console.log('Admin Data:', form);
  };

  return (
    <div className='bg-gray-50'>
      <Nav />
      <Bannertemp value={"Dashboard"} />
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="lg:w-64">
          <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold"} />
        </div>
        <div className="flex-1 flex justify-center items-start">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mt-4">
            <h2 className="text-2xl font-bold mb-6 text-[#020A47]">Edit Admin</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder='Enter Admin Name'
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder='Enter Admin Email'
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder='Enter Admin Phone Number'
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    required
                  />

                </div>
              </div>
              <button
                type="submit"
                className="bg-[#020A47]  text-white px-4 py-2 rounded  mt-2 font-semibold"
                disabled={!form.name || !form.email || !form.phone || !form.password}
              >
                Edit Admin
              </button>
              {submitted && (
                <div className="text-green-600 font-medium mt-2 w-full flex justify-center items-center ">Admin Edit successfully</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;

import React, { useState } from 'react';

const initialForm = {
    name: '',
    role: 'Student',
    timeZone: '',
    currency: '',
    organization: '',
    email: '',
    mobile: '',
    password: '',
    bio: '',
    about: '',
    additional: '',
    status: 'active',
    language: 'English',
    ban: false,
    blueBadge: true,
    affiliate: true,
    store: false,
    disableContent: false,
};

const timeZones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Asia/Kolkata',
    'Europe/London',
    'Europe/Berlin',
    'Asia/Dubai',
    'Asia/Tokyo',
    'Australia/Sydney',
];

export default function GeneralTab() {
    const [form, setForm] = useState(initialForm);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('User updated!');
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]" placeholder="Enter Name" required />
                </div>
                <div>
                    <label className="block mb-1 font-medium">User Role</label>
                    <select name="role" value={form.role} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]">
                        <option>Student</option>
                        <option>Instructor</option>
                        <option>Admin</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Time Zone</label>
                    <select
                        name="timeZone"
                        value={form.timeZone}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                        required
                    >
                        <option value="">Select Time Zone</option>
                        {timeZones.map((tz) => (
                            <option key={tz} value={tz}>{tz}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Currency</label>
                    <select name="currency" value={form.currency} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]">
                        <option value="">Select Currency</option>
                        <option>United States Dollar ($)</option>
                        <option>Indian Rupee (₹)</option>
                        <option>Euro (€)</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Organization</label>
                    <input type="text" name="organization" value={form.organization} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]" placeholder="Organization" />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]" placeholder="Email" required />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Mobile</label>
                    <input type="text" name="mobile" value={form.mobile} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]" placeholder="Mobile" />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]" placeholder="Password" />
                </div>
            </div>
            <div>
                <label className="block mb-1 font-medium">Bio</label>
                <textarea name="bio" value={form.bio} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]" rows={2} placeholder="Bio" />
            </div>
            <div>
                <label className="block mb-1 font-medium">About</label>
                <textarea name="about" value={form.about} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]" rows={3} placeholder="About" />
            </div>
            <div>
                <label className="block mb-1 font-medium">Additional data field</label>
                <input type="text" name="additional" value={form.additional} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]" placeholder="Additional data" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]">
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Language</label>
                    <select name="language" value={form.language} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]">
                        <option>English</option>
                        <option>Hindi</option>
                    </select>
                </div>
            </div>
            {/* Toggles */}
            <div className="flex flex-wrap gap-6 mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="ban" checked={form.ban} onChange={handleChange} className="form-checkbox h-5 w-5 " />
                    <span>Ban</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="blueBadge" checked={form.blueBadge} onChange={handleChange} className="form-checkbox h-5 w-5 " />
                    <span>Enable Blue Badge</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="affiliate" checked={form.affiliate} onChange={handleChange} className="form-checkbox h-5 w-5 " />
                    <span>Affiliate</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="store" checked={form.store} onChange={handleChange} className="form-checkbox h-5 w-5 " />
                    <span>Store</span>
                    <span className="text-xs text-gray-400">(User will have access to Store feature)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="disableContent" checked={form.disableContent} onChange={handleChange} className="form-checkbox h-5 w-5 " />
                    <span>Disable Content Access</span>
                    <span className="text-xs text-gray-400">(User won't have access to all courses content)</span>
                </label>
            </div>
            <div className="mt-6 w-full flex justify-end">
                <button type="submit" className="bg-[#020A47]  text-white px-6 py-2 rounded shadow font-semibold ">Save</button>
            </div>
        </form>
    );
} 
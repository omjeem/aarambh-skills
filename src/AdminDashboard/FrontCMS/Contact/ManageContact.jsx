import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';


const initialContact = {
  whatsappNumber: '+1234567890',
  phoneNumber: '+0987654321',
};

const ManageContact = () => {
  const [contactData, setContactData] = useState(initialContact);
  const [loading, setLoading] = useState(false); 

  // In a real application, use useEffect to fetch data on component mount
  // useEffect(() => {
  //   const fetchContact = async () => {
  //     setLoading(true);
  //     // Fetch data from API
  //     // setContactData(fetchedData);
  //     setLoading(false);
  //   };
  //   fetchContact();
  // }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSave = async () => {
    // In a real application, send contactData to your backend API
    setLoading(true);
    try {
      // Example API call:
      // const response = await fetch('/api/contact', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(contactData),
      // });
      // if (!response.ok) throw new Error('Failed to save contact data');

      toast.success('Contact data saved successfully!');
    } catch (error) {
      toast.error('Failed to save contact data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#020A47] mb-6">Manage Contact Information</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-[#020A47] mb-4">Edit Contact Numbers</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="whatsappNumber">Whatsapp Number</label>
            <input
              type="text"
              id="whatsappNumber"
              name="whatsappNumber"
              value={contactData.whatsappNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
              placeholder="Enter Whatsapp number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={contactData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
              placeholder="Enter Phone number"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-[#020A47] text-white rounded-md hover:bg-[#020A47]/90 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : <><FaSave /> Save Contact</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageContact; 
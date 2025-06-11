import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ApiPage = () => {
    const [formData, setFormData] = useState({
        apiKey: '',
        phoneNumberId: '',
        businessAccountId: '',
        accessToken: '',
        isEnabled: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           
            toast.success('WhatsApp API settings saved successfully!');
        } catch (error) {
            toast.error('Failed to save WhatsApp API settings');
        }
    };

    return (
        <div className="bg-white w-[70%] m-auto rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#020A47] mb-6">WhatsApp API Configuration</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            API Key
                        </label>
                        <input
                            type="password"
                            name="apiKey"
                            value={formData.apiKey}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            placeholder="Enter your WhatsApp API key"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number ID
                        </label>
                        <input
                            type="text"
                            name="phoneNumberId"
                            value={formData.phoneNumberId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            placeholder="Enter your WhatsApp Phone Number ID"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Account ID
                        </label>
                        <input
                            type="text"
                            name="businessAccountId"
                            value={formData.businessAccountId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            placeholder="Enter your Business Account ID"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Access Token
                        </label>
                        <input
                            type="password"
                            name="accessToken"
                            value={formData.accessToken}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            placeholder="Enter your Access Token"
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="isEnabled"
                        checked={formData.isEnabled}
                        onChange={handleChange}
                        className="h-4 w-4  border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                        Enable WhatsApp API Integration
                    </label>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#020A47] text-white rounded-md  "
                    >
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ApiPage;

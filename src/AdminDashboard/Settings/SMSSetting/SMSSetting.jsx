import { useState } from 'react';

const smsGateways = [
  {
    key: 'clickatell',
    label: 'Clickatell Sms Gateway',
    fields: [
      { name: 'username', label: 'Clickatell Username', type: 'text', required: true },
      { name: 'password', label: 'Clickatell Password', type: 'text', required: true },
      { name: 'apiKey', label: 'Api Key', type: 'text', required: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Inactive'] },
    ],
  },
  {
    key: 'twilio',
    label: 'Twilio SMS Gateway',
    fields: [
      { name: 'accountSid', label: 'Twilio Account SID', type: 'text', required: true },
      { name: 'authToken', label: 'Authentication Token', type: 'text', required: true },
      { name: 'phone', label: 'Registered Phone Number', type: 'text', required: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Inactive'] },
    ],
  },
  {
    key: 'msg91',
    label: 'MSG91',
    fields: [
      { name: 'authKey', label: 'Auth Key', type: 'text', required: true },
      { name: 'senderId', label: 'Sender ID', type: 'text', required: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Inactive'] },
    ],
  },
  {
    key: 'textlocal',
    label: 'Text Local',
    fields: [
      { name: 'username', label: 'Username', type: 'text', required: true },
      { name: 'hashkey', label: 'Hashkey', type: 'text', required: true },
      { name: 'senderId', label: 'Sender ID', type: 'text', required: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Inactive'] },
    ],
  },
  {
    key: 'smscountry',
    label: 'SMS Country',
    fields: [
      { name: 'username', label: 'Username', type: 'text', required: true },
      { name: 'authKey', label: 'Auth Key', type: 'text', required: true },
      { name: 'authToken', label: 'Authentication Token', type: 'text', required: true },
      { name: 'senderId', label: 'Sender ID', type: 'text', required: true },
      { name: 'password', label: 'Password', type: 'text', required: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Inactive'] },
    ],
  },
  {
    key: 'bulksms',
    label: 'Bulk SMS',
    fields: [
      { name: 'username', label: 'Username', type: 'text', required: true },
      { name: 'password', label: 'Password', type: 'text', required: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Inactive'] },
    ],
  },
  {
    key: 'mobireach',
    label: 'Mobi Reach',
    fields: [
      { name: 'authKey', label: 'Auth Key', type: 'text', required: true },
      { name: 'senderId', label: 'Sender ID', type: 'text', required: true },
      { name: 'routeId', label: 'Route ID', type: 'text', required: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Inactive'] },
    ],
  },
  {
    key: 'nexmo',
    label: 'Nexmo',
    fields: [
      { name: 'apiKey', label: 'Nexmo Api Key', type: 'text', required: true },
      { name: 'apiSecret', label: 'Nexmo Api Secret', type: 'text', required: true },
      { name: 'fromNumber', label: 'Registered / From Number', type: 'text', required: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Inactive'] },
    ],
  },
  {
    key: 'africastalking',
    label: 'AfricasTalking',
    fields: [
      { name: 'username', label: 'Username', type: 'text', required: true },
      { name: 'apiKey', label: 'Api Key', type: 'text', required: true },
      { name: 'shortCode', label: 'Short Code', type: 'text', required: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Inactive'] },
    ],
  },
  {
    key: 'smsegypt',
    label: 'SMS Egypt',
    fields: [
      { name: 'username', label: 'Username', type: 'text', required: true },
      { name: 'password', label: 'Password', type: 'text', required: true },
      { name: 'senderId', label: 'Sender ID', type: 'text', required: true },
      { name: 'type', label: 'Type', type: 'select', required: true, options: ['Local SMS', 'International SMS'] },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Inactive'] },
    ],
  },
  {
    key: 'custom',
    label: 'Custom SMS Gateway',
    fields: [
      { name: 'gatewayName', label: 'Gateway Name', type: 'text', required: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Inactive'] },
    ],
  },
];

const SMSSetting = () => {
  const [activeTab, setActiveTab] = useState(smsGateways[0].key);
  const [formData, setFormData] = useState({});

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [activeTab]: {
        ...formData[activeTab],
        [field.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic here
    alert('Saved');
  };

  const currentGateway = smsGateways.find((g) => g.key === activeTab);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6 w-[90%] m-auto">
      <h2 className="text-2xl font-semibold text-[#020A47] mb-4">SMS Setting</h2>
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        {smsGateways.map((gateway) => (
          <button
            key={gateway.key}
            onClick={() => setActiveTab(gateway.key)}
            className={`px-5 py-2 text-sm font-medium focus:outline-none border-b-2 transition-colors
              ${activeTab === gateway.key
                ? 'border-[#020A47] text-[#020A47] bg-white'
                : 'border-transparent text-gray-600 hover:text-[#020A47] bg-white'}`}
            style={{ minWidth: 120 }}
          >
            {gateway.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <form onSubmit={handleSubmit} className="flex-1">
          {currentGateway.fields.map((field) => (
            <div className="mb-4" key={field.name}>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                {field.label} <span className="text-red-500">*</span>
              </label>
              {field.type === 'select' ? (
                <select
                  required={field.required}
                  value={formData[activeTab]?.[field.name] || ''}
                  onChange={(e) => handleInputChange(e, field)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                >
                  <option value="">Select</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  required={field.required}
                  value={formData[activeTab]?.[field.name] || ''}
                  onChange={(e) => handleInputChange(e, field)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="mt-2 px-6 py-2 bg-[#020A47] text-white rounded hover:bg-[#03105a] transition-colors font-medium"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default SMSSetting;

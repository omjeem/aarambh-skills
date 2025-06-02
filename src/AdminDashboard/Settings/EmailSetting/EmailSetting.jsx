import { useState } from 'react';

const emailEngines = [
  {
    key: 'sendmail',
    label: 'SendMail',
    fields: [], 
  },
  {
    key: 'smtp',
    label: 'SMTP',
    fields: [
      { name: 'smtpUsername', label: 'SMTP Username', type: 'text', required: true },
      { name: 'smtpPassword', label: 'SMTP Password', type: 'text', required: true },
      { name: 'smtpServer', label: 'SMTP Server', type: 'text', required: true },
      { name: 'smtpPort', label: 'SMTP Port', type: 'text', required: true },
      { name: 'smtpSecurity', label: 'SMTP Security', type: 'select', required: true, options: ['OFF', 'SSL', 'TLS'] },
      { name: 'smtpAuth', label: 'SMTP Auth', type: 'select', required: true, options: ['ON', 'OFF'] },
    ],
  },
  {
    key: 'aws_ses',
    label: 'AWS SES',
    fields: [
      { name: 'email', label: 'Email', type: 'text', required: true },
      { name: 'accessKeyId', label: 'Access Key ID', type: 'text', required: true },
      { name: 'secretAccessKey', label: 'Secret Access Key', type: 'text', required: true },
      { name: 'region', label: 'Region', type: 'text', required: true },
    ],
  },
];

const EmailSetting = () => {
  const [selectedEngine, setSelectedEngine] = useState(emailEngines[0].key);
  const [formData, setFormData] = useState({});

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [selectedEngine]: {
        ...formData[selectedEngine],
        [field.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic here
 
  };

  const currentEngine = emailEngines.find((e) => e.key === selectedEngine);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6 w-[70%] m-auto">
      <h2 className="text-2xl font-semibold text-[#020A47] mb-4">Email Setting</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">Email Engine</label>
        <select
          value={selectedEngine}
          onChange={(e) => {
            setSelectedEngine(e.target.value);
            // Optionally reset form data when changing engine
            // setFormData({});
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
        >
          {emailEngines.map((engine) => (
            <option key={engine.key} value={engine.key}>{engine.label}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {currentEngine.fields.map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === 'select' ? (
              <select
                required={field.required}
                value={formData[selectedEngine]?.[field.name] || ''}
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
                value={formData[selectedEngine]?.[field.name] || ''}
                onChange={(e) => handleInputChange(e, field)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-[#020A47] text-white rounded hover:bg-[#03105a] transition-colors font-medium self-start"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EmailSetting;

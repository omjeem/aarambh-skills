import { useState } from 'react';

const paymentGateways = [
  {
    key: 'instamojo',
    label: 'InstaMojo',
    logo: 'https://seeklogo.com/images/I/instamojo-logo-6B6B6B6B6B-seeklogo.com.https://th.bing.com/th/id/OIP.0fQW30zGSM9ims6KFDs3SQHaBs?w=330&h=79&c=7&r=0&o=5&pid=1.7',
    url: 'https://www.instamojo.com/',
    fields: [
      { name: 'apiKey', label: 'Private API Key', type: 'text', required: true },
      { name: 'authToken', label: 'Private Auth Token', type: 'text', required: true },
      { name: 'salt', label: 'Private Salt', type: 'text', required: true },
    ],  
    info: 'Payment Gateway For India',
  },
  {
    key: 'razorpay',
    label: 'Razorpay',
    logo: 'https://razorpay.com/favicon.png',
    url: 'https://razorpay.com/',
    fields: [
      { name: 'keyId', label: 'Razorpay Key ID', type: 'text', required: true },
      { name: 'keySecret', label: 'Razorpay Key Secret', type: 'text', required: true },
    ],
    info: 'Payment Gateway For India',
  },
  {
    key: 'paytm',
    label: 'Paytm',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Paytm_logo.png',
    url: 'https://paytm.com/',
    fields: [
      { name: 'merchantId', label: 'Merchant ID', type: 'text', required: true },
      { name: 'merchantKey', label: 'Merchant Key', type: 'text', required: true },
      { name: 'website', label: 'Website', type: 'text', required: true },
      { name: 'industryType', label: 'Industry Type', type: 'text', required: true },
    ],
    info: 'Payment Gateway For India',
  },
  {
    key: 'cashfree',
    label: 'Cashfree',
    logo: 'https://assets.cashfree.com/prod/assets/img/cf-logo.png',
    url: 'https://www.cashfree.com/',
    fields: [
      { name: 'appId', label: 'App ID', type: 'text', required: true },
      { name: 'secretKey', label: 'Secret Key', type: 'text', required: true },
    ],
    info: 'Payment Gateway For India',
  },
];

const PaymentMethods = () => {
  const [activeTab, setActiveTab] = useState(paymentGateways[0].key);
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
    alert('Saved ');
  };

  const currentGateway = paymentGateways.find((g) => g.key === activeTab);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6 w-[70%] m-auto">
      <h2 className="text-2xl font-semibold text-[#020A47] mb-4">Payment Methods</h2>
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        {paymentGateways.map((gateway) => (
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
              <input
                type={field.type}
                required={field.required}
                value={formData[activeTab]?.[field.name] || ''}
                onChange={(e) => handleInputChange(e, field)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020A47]"
              />
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

export default PaymentMethods;

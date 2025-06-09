import React, { useState } from 'react';

const initialFinancial = {
  accountType: '',
  identityScan: '',
  identityPreview: '',
  address: '',
  approval: false,
  installments: true,
  installmentVerification: false,
  disableCashback: false,
  enableBonus: true,
  bonusAmount: '',
};

export default function FinancialTab() {
  const [financial, setFinancial] = useState(initialFinancial);

  const handleFinancialChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFinancial((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleIdentityScan = (e) => {
    const file = e.target.files[0];
    setFinancial((prev) => ({
      ...prev,
      identityScan: file,
      identityPreview: file ? URL.createObjectURL(file) : '',
    }));
  };

  const handleFinancialSave = (e) => {
    e.preventDefault();
    // Save logic here
    alert('Financial info updated!');
  };

  return (
    <form className="flex flex-col gap-6 " onSubmit={handleFinancialSave}>
      <div>
        <label className="block mb-1 font-medium">Account type</label>
        <select
          name="accountType"
          value={financial.accountType}
          onChange={handleFinancialChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
          required
        >
          <option value="">Select account type</option>
          <option>Savings</option>
          <option>Current</option>
          <option>Salary</option>
          <option>Business</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Identity scan</label>
        <div className="flex items-center w-[20%] gap-2">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleIdentityScan}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#020A47] file:text-white"
          />
          {financial.identityPreview && (
            <a href={financial.identityPreview} target="_blank" rel="noopener noreferrer" className="ml-2 text-[#020A47]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </a>
          )}
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium">Address</label>
        <input
          type="text"
          name="address"
          value={financial.address}
          onChange={handleFinancialChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
          placeholder="Jeevan Tara Building, 1Sr Floor, Gate No.4, 5 Sansad Marg, New Delhi"
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="approval" checked={financial.approval} onChange={handleFinancialChange} className="form-checkbox h-5 w-5" />
          <span>Financial Approval</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="installments" checked={financial.installments} onChange={handleFinancialChange} className="form-checkbox h-5 w-5" />
          <span>Enable Installments</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="installmentVerification" checked={financial.installmentVerification} onChange={handleFinancialChange} className="form-checkbox h-5 w-5" />
          <span>Installment Verification</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="disableCashback" checked={financial.disableCashback} onChange={handleFinancialChange} className="form-checkbox h-5 w-5" />
          <span>Disable Cashback</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="enableBonus" checked={financial.enableBonus} onChange={handleFinancialChange} className="form-checkbox h-5 w-5" />
          <span>Enable registration bonus</span>
        </label>
      </div>
      {financial.enableBonus && (
        <div>
          <label className="block mb-1 font-medium">Registration bonus amount</label>
          <input
            type="text"
            name="bonusAmount"
            value={financial.bonusAmount}
            onChange={handleFinancialChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
            placeholder="Registration bonus amount for user"
          />
        </div>
      )}
      <div className="w-full flex justify-end mt-2">
        <button type="submit" className=" bg-[#020A47] text-white px-6 py-2 rounded shadow font-semibold ">Save</button>
      </div>
    </form>
  );
} 
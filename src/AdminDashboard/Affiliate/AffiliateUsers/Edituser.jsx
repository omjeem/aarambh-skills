import React, { useState } from 'react';
import GeneralTab from './EditUserTabs/GeneralTab';
import ImagesTab from './EditUserTabs/ImagesTab';
import FinancialTab from './EditUserTabs/FinancialTab';
import BadgesTab from './EditUserTabs/BadgesTab';
import PurchasedCoursesTab from './EditUserTabs/PurchasedCoursesTab';
import PurchasedBundlesTab from './EditUserTabs/PurchasedBundlesTab';
import PurchasedProductsTab from './EditUserTabs/PurchasedProductsTab';
import ForumTopicsTab from './EditUserTabs/ForumTopicsTab';
import LoginHistoryTab from './EditUserTabs/LoginHistoryTab';

const tabs = [
  'General',
  'Images',
  'Financial',
  'Badges',
  'Purchased Courses',
  'Purchased Bundles',
  'Purchased Products',
  'Forum topics',
  'Login History',
];

export default function EditUser() {
  const [activeTab, setActiveTab] = useState('General');

  return (
    <div className="bg-gray-50  min-h-screen p-6">
      <div className=" mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-[#020A47]">Edit User</h2>
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium focus:outline-none transition border-b-2 ${activeTab === tab
                ? 'border-[#020A47] text-[#020A47]'
                : 'border-transparent text-gray-600 hover:text-[#020A47]'
                }`}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Tabs */}
        {activeTab === 'General' && <GeneralTab />}

        {activeTab === 'Images' && <ImagesTab />}

        {activeTab === 'Financial' && <FinancialTab />}

        {activeTab === 'Badges' && <BadgesTab />}

        {activeTab === 'Purchased Courses' && <PurchasedCoursesTab />}

        {activeTab === 'Purchased Bundles' && <PurchasedBundlesTab />}

        {activeTab === 'Purchased Products' && <PurchasedProductsTab />}

        {activeTab === 'Forum topics' && <ForumTopicsTab />}

        {activeTab === 'Login History' && <LoginHistoryTab />}
      </div>
    </div>
  );
}

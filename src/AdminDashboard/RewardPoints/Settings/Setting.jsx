import React, { useState } from 'react';

const Setting = () => {
    const [active, setActive] = useState(true);
    const [conversion, setConversion] = useState(true);
    const [rate, setRate] = useState(200);
    const [policyPage, setPolicyPage] = useState('/pages/reward_points_system');

    const handleSave = (e) => {
        e.preventDefault();
        // Save logic here
     
    };

    return (
        <div className="w-[70%] mx-auto   bg-white rounded-md shadow-md p-6 mt-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-[#020A47]">Reward Points Settings</h1>
            </div>
            <form className="space-y-8" onSubmit={handleSave}>
            
                <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <span className="relative">
                            <input
                                type="checkbox"
                                checked={active}
                                onChange={() => setActive((v) => !v)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer  peer-checked:bg-[#020A47] transition-all"></div>
                            <div className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${active ? 'translate-x-5' : ''}`}></div>
                        </span>
                        <span className="font-semibold text-[#020A47]">Active</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-1 ml-1">By activating this feature, the system will calculate point rewards based on user actions</p>
                </div>
                {/* Points Conversion Toggle */}
                <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <span className="relative">
                            <input
                                type="checkbox"
                                checked={conversion}
                                onChange={() => setConversion((v) => !v)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#020A47] transition-all"></div>
                            <div className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${conversion ? 'translate-x-5' : ''}`}></div>
                        </span>
                        <span className="font-semibold text-[#020A47]">Points conversion</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-1 ml-1">Enable this feature to allow users to convert their point rewards to the wallet charge</p>
                </div>
                {/* Points Conversion Rate */}
                <div>
                    <label className="block text-sm font-medium text-[#020A47] mb-1">Points conversion rate</label>
                    <input
                        type="number"
                        min={1}
                        value={rate}
                        onChange={e => setRate(e.target.value)}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    />
                    <p className="text-xs text-gray-500 mt-1">The user will get 1 currency unit for this amount of points. e.g. if you enter 500, the user will get Rs1 for each 500 points</p>
                </div>
                {/* Points Policy Page */}
                <div>
                    <label className="block text-sm font-medium text-[#020A47] mb-1">Points policy page</label>
                    <input
                        type="text"
                        value={policyPage}
                        onChange={e => setPolicyPage(e.target.value)}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    />
                    <p className="text-xs text-gray-500 mt-1">You can create a page for encouraging users to become familiar with this feature and put the link here. This link will be displayed in the user's panel.</p>
                </div>
                {/* Save Button */}
                <div>
                    <button
                        type="submit"
                        className="bg-[#020A47] text-white px-8 py-1.5 rounded font-semibold text-lg shadow transition"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Setting;
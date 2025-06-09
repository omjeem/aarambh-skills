import React, { useState } from 'react';

const productOptions = [
  'Painting tools',
  'Sherlock Holmes e-book',
  'Where the Crawdads Sing e-book',
];
const initialManuallyAdded = [];
const initialManuallyRemoved = [
  {
    product: 'Where the Crawdads Sing e-book',
    type: 'Virtual',
    price: '₹20',
    seller: 'Admin',
  },
];
const initialPurchased = [
  { product: 'Painting tools', type: 'Physical', price: '₹25', seller: 'Robert Ransdell', date: '25 Jun 2022 | 05:20' },
  { product: 'Sherlock Holmes e-book', type: 'Virtual', price: '₹5', seller: 'Ricardo dave', date: '24 Jun 2022 | 16:50' },
];

export default function PurchasedProductsTab() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [manuallyAdded, setManuallyAdded] = useState(initialManuallyAdded);
  const [manuallyRemoved, setManuallyRemoved] = useState(initialManuallyRemoved);
  const [purchased, setPurchased] = useState(initialPurchased);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setManuallyAdded([
      ...manuallyAdded,
      {
        product: selectedProduct,
        type: 'Virtual',
        price: '-',
        seller: 'Unknown',
        date: new Date().toLocaleString(),
      },
    ]);
    setSelectedProduct('');
    alert('Product added!');
  };

  const handleRemove = (type, idx) => {
    if (type === 'added') {
      setManuallyAdded(manuallyAdded.filter((_, i) => i !== idx));
    } else if (type === 'removed') {
      setManuallyRemoved(manuallyRemoved.filter((_, i) => i !== idx));
    } else if (type === 'purchased') {
      setPurchased(purchased.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Add a product to the user */}
      <form className="flex flex-col gap-4" onSubmit={handleAddProduct}>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-lg">Add a product to the user</span>
          <div className="flex-1 border-b border-gray-200 ml-2"></div>
        </div>
        <div className="w-full md:w-1/2">
          <label className="block mb-1 font-medium">Product</label>
          <select
            value={selectedProduct}
            onChange={e => setSelectedProduct(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
          >
            <option value="">Search Products</option>
            {productOptions.map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>
        </div>
        <div className="w-full flex justify-start">
          <button type="submit" className=" bg-[#020A47] text-white px-6 py-2 rounded shadow font-semibold ">Save</button>
        </div>
      </form>
      {/* Manually Added Products */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-lg">Manually Added Products</span>
          <div className="flex-1 border-b border-gray-200 ml-2"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Seller</th>
                <th className="px-4 py-2">Added Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {manuallyAdded.length === 0 && (
                <tr><td colSpan={6} className="text-center text-gray-400">No manually added products</td></tr>
              )}
              {manuallyAdded.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-4 py-2 text-[#6C63FF] cursor-pointer hover:underline">{row.product}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.price}</td>
                  <td className="px-4 py-2">{row.seller}</td>
                  <td className="px-4 py-2">{row.date}</td>
                  <td className="px-4 py-2">
                    <button type="button" onClick={() => handleRemove('added', idx)} className="text-[#6C63FF] hover:text-red-600 text-lg">&#10006;</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-gray-400 text-sm mt-2">List of contents that the student added to them manually.</div>
        </div>
      </div>
      {/* Manually Removed Products */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-lg">Manually Removed Products</span>
          <div className="flex-1 border-b border-gray-200 ml-2"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Seller</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {manuallyRemoved.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-4 py-2 text-[#6C63FF] cursor-pointer hover:underline">{row.product}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.price}</td>
                  <td className="px-4 py-2">{row.seller}</td>
                  <td className="px-4 py-2">
                    <button type="button" onClick={() => handleRemove('removed', idx)} className="text-[#6C63FF] hover:text-red-600 text-lg">&#10006;</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-gray-400 text-sm mt-2">List of contents that the user purchased but the user's access removed by admin.</div>
        </div>
      </div>
      {/* Purchased */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-lg">Purchased</span>
          <div className="flex-1 border-b border-gray-200 ml-2"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Seller</th>
                <th className="px-4 py-2">Purchase Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchased.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-4 py-2 text-[#6C63FF] cursor-pointer hover:underline">{row.product}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.price}</td>
                  <td className="px-4 py-2">{row.seller}</td>
                  <td className="px-4 py-2">{row.date}</td>
                  <td className="px-4 py-2">
                    <button type="button" onClick={() => handleRemove('purchased', idx)} className="text-[#6C63FF] hover:text-red-600 text-lg">&#10006;</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 
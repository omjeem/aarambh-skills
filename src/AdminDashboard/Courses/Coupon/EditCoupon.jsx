import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../../Common/Nav';
import Bannertemp from '../../../components/AboutPage/Bannertemp';
import Sidebar from '../../Common/Sidebar';

const dummyCoupons = [
  { id: 1, code: 'VWGNGQETFP2', discount: 18, discountType: 'percent', expiry: '2024-04-07', status: 'Active' },
  { id: 2, code: 'AKGMRMFRU3', discount: 100, discountType: 'amount', expiry: '2024-05-10', status: 'Inactive' },
  // ... add all dummy coupons here
];

const EditCoupon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    code: '',
    discount: '',
    discountType: 'percent',
    expiry: '',
    status: 'Active',
  });

  useEffect(() => {
    // In real app, fetch coupon by id
    const coupon = dummyCoupons.find(c => c.id === Number(id));
    if (coupon) setForm(coupon);
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDiscountTypeChange = e => {
    setForm({ ...form, discountType: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    let discountDisplay = form.discountType === 'percent' ? `${form.discount} %` : `₹ ${form.discount}`;
    // alert('Coupon updated!\n' + JSON.stringify({ ...form, discount: discountDisplay }, null, 2));
    
    navigate('/admin/dashboard/coupon');
  };

  return (
    <div className='bg-gray-50'>
        <Nav/>
        <Bannertemp value={"Dashboard"} />
        <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
          <div className='lg:w-72'>
            <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold"}/>
          </div>
          <div className="p-6 w-1/2 mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Coupon</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block mb-1 font-medium">Coupon Code</label>
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Discount</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <select
              name="discountType"
              value={form.discountType}
              onChange={handleDiscountTypeChange}
              className="px-2 py-2 border rounded-lg"
            >
              <option value="percent">%</option>
              <option value="amount">₹</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Expiry Date</label>
          <input
            type="date"
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-[#020A47] text-white rounded-lg">Update Coupon</button>
          <button type="button" onClick={() => navigate('/admin/dashboard/coupon')} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
        </div>
      </form>
    </div>
        </div>
    </div>
  );
};

export default EditCoupon;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../Common/Nav';
import Bannertemp from '../../../components/AboutPage/Bannertemp';
import Sidebar from '../../Common/Sidebar';
import apiServices from "../../../api/index"


const AddCoupon = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    coupon_code: '',
    discount: '',
    discountType: 'percent',
    expiry_date: '',
    status: 'active',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDiscountTypeChange = e => {
    setForm({ ...form, discountType: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>")
    const response = await apiServices.course.createCoupenCode(form)
    if(response.data){

    }
    // let discountDisplay = form.discountType === 'percent' ? `${form.discount} %` : `₹ ${form.discount}`;
    // alert('Coupon added!\n' + JSON.stringify({ ...form, discount: discountDisplay }, null, 2));
    // navigate('/admin/dashboard/coupon');
    console.log("Form is ", form)
  };

  return (
    <div className='bg-gray-50'>
      <Nav />
      <Bannertemp value={"Dashboard"} />
      <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
        <div className='lg:w-72'>
          <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold"} />
        </div>
        <div className="p-6 w-1/2 mx-auto">
          <h1 className="text-xl font-bold mb-4">Add Coupon</h1>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
            <div>
              <label className="block mb-1 font-medium">Coupon Code</label>
              <input
                type="text"
                name="coupon_code"
                value={form.coupon_code}
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
                  {/* <option value="amount">₹</option> */}
                </select>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Expiry Date</label>
              <input
                type="date"
                name="expiry_date"
                value={form.expiry_date}
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
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-[#020A47] text-white rounded-lg">Add Coupon</button>
              <button type="button" onClick={() => navigate('/admin/dashboard/coupon')} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoupon;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiServices from "../../../api/index"

const AddCouponSkeleton = () => {
  return (
    <div className='bg-gray-50'>
    
      <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
       
        <div className="p-6 w-1/2 mx-auto">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            {/* Form fields skeleton */}
            {[1, 2, 3, 4].map((index) => (
              <div key={index}>
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
            {/* Buttons skeleton */}
            <div className="flex gap-2">
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddCoupon = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    coupon_code: '',
    discount: '',
    discountType: 'percent',
    expiry_date: '',
    status: 'active',
  });

  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
    navigate('/admin/dashboard/coupon');
    console.log("Form is ", form)
  };

  if (loading) {
    return <AddCouponSkeleton />;
  }

  return (
    <div className='bg-gray-50'>
    
      <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
     
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

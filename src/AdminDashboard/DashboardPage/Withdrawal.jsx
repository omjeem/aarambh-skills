import React from 'react'
import { Link } from 'react-router-dom'


const Withdrawal = () => {
  const withdrawals = [
    {
      id: 1,
      course: "Website Development",
      amount: "₹200",
      date: "28 February 2025 04:50",
      image: "/images/web-development.jpg"
    },
    {
      id: 2,
      course: "Website Development",
      amount: "₹250",
      date: "28 February 2025 04:50",
      image: "/images/web-development.jpg"
    }
  ]

  return (
    <div className='w-full'>
    <div className='flex justify-between items-center p-4 '>
    <h2 className="text-2xl font-bold text-[#020A47] mb-6">Requested Withdrawal</h2>
    <Link to="/admin/dashboard/withdrawal/request" className=" bg-[#020A47] text-white px-4 py-2 rounded-md">Payout</Link>
    </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left">
                <th className="pb-4 text-center">Course</th>
                <th className="pb-4 text-center">Withdrawal Amount</th>
                <th className="pb-4 text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal.id} className="border-t">
                  <td className="py-4">
                    <div className="flex justify-around items-center gap-3">
                      <img 
                        src={withdrawal.image} 
                        alt={withdrawal.course} 
                        className="w-16 h-12 object-cover rounded"
                      />
                      <span className='text-center'>{withdrawal.course}</span>
                    </div>
                  </td>
                  <td className="py-4 text-center">{withdrawal.amount}</td>
                  <td className="py-4 text-center">{withdrawal.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


export default Withdrawal

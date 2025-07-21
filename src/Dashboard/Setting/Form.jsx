import { useEffect, useState } from "react";
import { AiOutlineProject } from "react-icons/ai";
import { FaGraduationCap, FaUsers, FaBook, FaHeart, FaCog, FaHistory, FaUser, FaComments, FaMoneyBill, FaShoppingCart, FaCommentDots } from "react-icons/fa";
import { HiMiniDocumentCurrencyRupee } from "react-icons/hi2";
import { FaChalkboardUser } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { LiaAwardSolid } from "react-icons/lia";
import { PiCertificateFill } from "react-icons/pi";
import { RiShareForwardBoxLine } from "react-icons/ri";
import envConfig from '../../utils/envConfig';


const Form = ({ col }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${envConfig.backendUrl}/api/auth/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="w-full mx-4 h-full bg-white shadow-lg border-gray-50 border-[1px] rounded-2xl p-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-start rounded">
        <img
          src="https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG1vZGVsfGVufDB8fDB8fHww"
          alt="User"
          className="h-24 w-24 bg-cover bg-center rounded-full mb-2"
        />
        {user && (
          <>
            <div>
            <h3 className="text-lg text-center lg:text-left font-semibold">{user.name}</h3>
            <p className="text-gray-500 text-center text-sm">Update your profile photo and personal details</p>
            </div>
          </>
        )}

       
      </div>
      <div className="border-b-[1px] border-gray-500 py-4">
        <h1 className="text-2xl font-semibold">Account Information</h1>
     </div>
     <div className="lg:pr-40">
        
     <div className="flex flex-col mt-2  py-2">
                <label className="text-[#020A47] py-1">Email Id</label>
                <input type="email" placeholder="Enter your email" value={user?.email} className=" border-[1px] border-gray-500 bg-[#EDF3F5] rounded-md p-2" />
            </div>
            <div className="flex flex-col  py-1">
                <label className="text-[#020A47] py-1 " >Name</label>
                <input type="text" placeholder="Enter your name"  className=" border-[1px] border-gray-500 bg-[#EDF3F5] rounded-md p-2" />
            </div>

            <div className="flex flex-col  py-1">
                <label className="text-[#020A47] py-1 " >Phone Number</label>
                <input type="number" placeholder="Enter your Phone Number"  className=" border-[1px] border-gray-500 bg-[#EDF3F5] rounded-md p-2" />
            </div>
            <div className="flex flex-col  py-1">
                <label className="text-[#020A47] py-1 " >Current Password </label>
                <input type="password" placeholder="Enter your Current Password"  className=" border-[1px] border-gray-500 bg-[#EDF3F5] rounded-md p-2" />
            </div>
            <div className="flex flex-col  py-1">
                <label className="text-[#020A47] py-1 " >New Password </label>
                <input type="password" placeholder="Enter your New Password"  className=" border-[1px] border-gray-500 bg-[#EDF3F5] rounded-md p-2" />
            </div>
            <div className="flex flex-col  py-1">
                <label className="text-[#020A47] py-1 " >Confirm Password </label>
                <input type="password" placeholder="Enter your Confirm Password"  className=" border-[1px] border-gray-500 bg-[#EDF3F5] rounded-md p-2" />
            </div>
            <div className="flex justify-center items-center  py-8">
                <button className="bg-[#020A47]   text-white px-10 py-3 rounded-md">Submit Now</button>
            </div>
     </div>
    </div>
  );
};

export default Form;
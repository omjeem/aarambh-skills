import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Nav from "../Common/Nav";
import Bannertemp from "../AboutPage/Bannertemp";
import { FaEdit, FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



export default function OTPVerification({ phoneNumber = "", onVerify = () => {}, onEditPhone = () => {} }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [otpSent, setOtpSent] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [otpSent]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    try {
      const response = await fetch(`${envConfig.backendUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber, otp: otpCode }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("OTP Verified Successfully!");
        onVerify(otpCode);
        navigate("/confirmpass");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await fetch(`${envConfig.backendUrl}/api/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("OTP Resent Successfully!");
        setTimer(30);
        setOtpSent(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  return (
    <div>
      <Nav />
      <Bannertemp value={"Join Now"} />
      <div className="flex items-center py-36 justify-center p-4">
        <div className="relative max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex md:text-xl justify-center cursor-pointer items-center gap-2 absolute -top-20 right-0">
            <FaExclamationCircle className="md:text-2xl" />
            <h1>Help</h1>
          </div>
          <div className="hidden md:block">
            <img src="/images/Login.png" alt="Educational illustration" className="w-full h-auto" />
          </div>

          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="text-center flex flex-col gap-4 md:text-left">
              <h2 className="text-3xl font-bold text-black">Just One More Step</h2>
              <p className="mt-2 text-sm text-gray-600">Please enter the code sent to your phone</p>
            </div>

            <div className="flex items-center justify-center md:justify-start text-xl gap-4 md:gap-5">
              <span>(+91) {phoneNumber}</span>
              <button className="text-gray-500 hover:text-gray-700" onClick={onEditPhone}>
                <FaEdit />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex justify-center md:justify-start gap-8">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    className="w-12 h-12 shadow-lg border-2 rounded text-center text-xl"
                    onFocus={(e) => e.target.select()}
                  />
                ))}
              </div>

              <div className="mt-6 ml-10 md:ml-1 text-sm md:text-lg">
                <span className="border-r-2 px-2 font-bold border-black">
                  {String(Math.floor(timer / 60)).padStart(2, "0")}:
                  {String(timer % 60).padStart(2, "0")}
                </span>
                {otpSent && <span className="text-green-600 ml-2">OTP has been sent.</span>}
              </div>

              <button type="button" onClick={handleResendOTP} className="text-sm ml-12 md:ml-3 text-gray-700 cursor-pointer mt-2" disabled={timer > 0}>
                Resend OTP
              </button>

              <button type="submit" className="w-full lg:w-[85%] mt-6 py-2 rounded-md text-lg font-medium text-white bg-[#020A47]">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

OTPVerification.propTypes = {
  phoneNumber: PropTypes.string,
  onVerify: PropTypes.func,
  onEditPhone: PropTypes.func,
};

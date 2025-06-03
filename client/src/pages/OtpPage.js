import React, { useRef, useState } from 'react';
import { signup } from '../services/operations/authApi';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const OtpPage = () => {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const updateOtpFromInputs = () => {
    const otpValue = inputsRef.current.map((input) => input.value).join('');
    setOtp(otpValue);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    inputsRef.current[index].value = value;
    updateOtpFromInputs();

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    paste.split('').forEach((digit, i) => {
      if (i < inputsRef.current.length) {
        inputsRef.current[i].value = digit;
      }
    });
    updateOtpFromInputs();
    const nextIndex = Math.min(paste.length, inputsRef.current.length - 1);
    inputsRef.current[nextIndex].focus();
  };

  const handleVerify = () => {
    signup(location.state, otp, dispatch, navigate);
  };

  return (
    <div className="mt-32 flex flex-col gap-5 items-center justify-center bg-gray-900 text-white px-4">
      <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>

      <div className="flex justify-center gap-2 mb-4" onPaste={handlePaste}>
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            ref={(el) => (inputsRef.current[i] = el)}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-12 h-12 text-center text-xl border rounded-lg border-pure-greys-500 bg-transparent text-white focus:outline-none focus:border-yellow-50"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        className="bg-yellow-50 text-black px-6 py-2 rounded-md font-semibold hover:brightness-90 transition duration-200"
      >
        Verify and Sign Up
      </button>
      <Link to={'/signup'} className='text-blue-50 hover:text-blue-200 transition-all hover:underline'>signup again</Link>

    </div>
  );
};

export default OtpPage;

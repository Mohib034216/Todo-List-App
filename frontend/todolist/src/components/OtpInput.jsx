import React, { useRef, useState } from 'react';
import './css/OtpInput.css';
import { useDispatch } from 'react-redux';
import { UserOtp } from '../redux/authSlice';

const OtpInput = ({ length = 6, onSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputsRef = useRef([]);
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  
    // ✅ Make sure the next input exists before focusing
    if (value && index < length - 1 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };
  
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, length);
    const pasteArray = paste.split('');
    const newOtp = [...otp];
    pasteArray.forEach((char, i) => {
      if (/^[0-9]$/.test(char)) {
        newOtp[i] = char;
      }
    });
    setOtp(newOtp);
  
    // ✅ Focus next empty or last field safely
    const nextIndex = pasteArray.length < length ? pasteArray.length : length - 1;
    if (inputsRef.current[nextIndex]) {
      inputsRef.current[nextIndex].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res  = await dispatch(UserOtp({'email':user.email,'code':otp.join('')}))
    if(res.status === 200){

      console.log(res)
      alert('verified')
    }
  };

  return (
    <form className="otp-form" onSubmit={handleSubmit}>
      <h2>Enter OTP Code</h2>
      <div className="otp-inputs" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otp-box"
          />
        ))}
      </div>
      <button type="submit" className="verify-btn">Verify</button>
    </form>
  );
};

export default OtpInput;

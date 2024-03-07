import React, { useState } from 'react';
import axios from 'axios';
import './OTPVerification.css';
import { useNavigate } from "react-router-dom";

function OTPVerification() {
    const [userEmail, setUserEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [message, setMessage] = useState('');
    const [showOTPField, setShowOTPField] = useState(false); // State to control the visibility of OTP field
    const navigate = useNavigate();

    const handleSendOTP = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/getOtp', { userEmail });
            setMessage(response.data.message);
            setShowOTPField(true); // Show OTP field and button after sending OTP
        } catch (error) {
            setMessage('Failed to send OTP');
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/checkOtp', { otp });
            console.log(response.data.message);
            setMessage(response.data.messsage);
            navigate('/home');
        } catch (error) {
            setMessage('Invalid OTP');
        }
    };

    return (
        <div className="otp-container">
            <h1>OTP Verification</h1>
            <div className="input-container">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                <button onClick={handleSendOTP}>Send OTP</button>
            </div>
            {showOTPField && ( 
                <div className="input-container">
                    <label htmlFor="otp">OTP:</label>
                    <input type="text" id="otp" value={otp} onChange={(e) => setOTP(e.target.value)} />
                    <button onClick={handleVerifyOTP}>Verify OTP</button>
                </div>
            )}
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default OTPVerification;

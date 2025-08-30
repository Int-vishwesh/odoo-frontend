'use client';
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import { useState } from 'react';

export default function Signup() {
  // Form states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  // OTP states
  const [step, setStep] = useState(1); // 1: Form, 2: OTP Verification
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);

  // Handle initial form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!username || !email || !phone || !password) {
      alert('Please fill all fields');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setOtpLoading(true);
    
    try {
      // Generate OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otpCode);
      
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production: await sendOtpToEmail(email, otpCode);
      alert(`OTP sent to ${email}: ${otpCode}`); // For demo
      
      setStep(2); // Move to OTP step
      
    } catch (error) {
      alert('Failed to send OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    
    if (!otp) {
      alert('Please enter OTP');
      return;
    }

    if (otp === generatedOtp) {
      alert('Account created successfully!');
      // In production: create user account, redirect to login or dashboard
      // resetForm(); // Reset all fields
    } else {
      alert('Invalid OTP. Please try again.');
      setOtp('');
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    setOtpLoading(true);
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`New OTP sent: ${newOtp}`);
    setOtpLoading(false);
    setOtp('');
  };

  // Go back to form
  const goBackToForm = () => {
    setStep(1);
    setOtp('');
    setGeneratedOtp(null);
  };

  return (
    <>
      <div>
        <Navbar/>
        <div className="w-full flex justify-center items-center gap-30 mt-20">
          <div className="w-[800px] flex flex-col items-center gap-4">
            
            {/* Step 1: Signup Form */}
            {step === 1 && (
              <form onSubmit={handleSignupSubmit} className="flex flex-col items-center gap-5 border-slate-300 border rounded-xl p-10">
                <p className="text-xl">Sign Up</p>
                
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-slate-200 rounded-sm px-3 py-1 w-52 border-b border-slate-700"
                  required
                />
                
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-200 rounded-sm px-3 py-1 w-52 border-b border-slate-700"
                  required
                />
                
                <input 
                  type="tel" 
                  placeholder="Phone" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-slate-200 rounded-sm px-3 py-1 w-52 border-b border-slate-700"
                  required
                />
                
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-200 rounded-sm px-3 py-1 w-52 border-b border-slate-700"
                  minLength={6}
                  required
                />
                
                <button 
                  type="submit" 
                  disabled={otpLoading}
                  className="bg-[#c853fe] rounded px-3 py-1 hover:bg-[#ff55d3] disabled:bg-gray-400 min-w-[100px]"
                >
                  {otpLoading ? 'Sending...' : 'Sign up'}
                </button>
                
                <p>Already have an account<Link href="/" className="text-[#43a7fc] hover:underline "> Login</Link></p>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <form onSubmit={handleOtpSubmit} className="flex flex-col items-center gap-5 border-slate-300 border rounded-xl p-10">
                <p className="text-xl">Verify Email</p>
                <p className="text-sm text-gray-600 text-center mb-2">
                  We've sent a 6-digit verification code to<br />
                  <strong>{email}</strong>
                </p>
                
                <input 
                  type="text" 
                  placeholder="Enter 6-digit OTP" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="bg-slate-200 rounded-sm px-3 py-1 w-52 border-b border-slate-700 text-center text-xl tracking-widest"
                  maxLength={6}
                  required
                />
                
                <div className="flex gap-2 text-sm">
                  <span className="text-gray-600">Didn't receive code?</span>
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={otpLoading}
                    className="text-[#43a7fc] hover:underline disabled:text-gray-400"
                  >
                    {otpLoading ? 'Sending...' : 'Resend OTP'}
                  </button>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={goBackToForm}
                    className="bg-gray-300 hover:bg-gray-400 rounded px-3 py-1"
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="bg-[#c853fe] rounded px-3 py-1 hover:bg-[#ff55d3]"
                  >
                    Continue
                  </button>
                </div>
                
                <p>Already have an account<Link href="/" className="text-[#43a7fc] hover:underline "> Login</Link></p>
              </form>
            )}
          </div>
          
          <div>
            <Image src="/landing.jpg" alt="Landing" width={550} height={400} className="mr-10"/>
          </div>
        </div>
      </div>
    </>
  )
}

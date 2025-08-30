'use client';
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import { useState } from 'react';

export default function Signup() {
  // Role state
  const [role, setRole] = useState('end-user'); // Default to end-user
  
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
      // Call backend API with role
      const response = await fetch('http://localhost:8000/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username, 
          email, 
          phone, 
          password,
          role // Include role in signup data
        })
      });

      const data = await response.json();

      if (data.success) {
        alert(`OTP sent to ${email}: ${data.otp}`);
        setStep(2); // Move to OTP step
      } else {
        alert('Failed to send OTP. Please try again.');
      }
      
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    if (!otp) {
      alert('Please enter OTP');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();

      if (data.success) {
        alert(`Account created successfully as ${role}!`);
        // Redirect based on role
        if (role === 'admin') {
          window.location.href = '/admin/dashboard';
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        alert('Invalid OTP. Please try again.');
        setOtp('');
      }
      
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    setOtpLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, phone, password, role })
      });

      const data = await response.json();
      if (data.success) {
        alert(`New OTP sent: ${data.otp}`);
        setOtp('');
      }
    } catch (error) {
      alert('Failed to resend OTP');
    } finally {
      setOtpLoading(false);
    }
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
            
            {/* Role Selection Tabs - Same as Login Page */}
            <div className="flex bg-gray-200 rounded-lg p-1 mb-6">
              <button
                type="button"
                onClick={() => setRole('end-user')}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  role === 'end-user' 
                    ? 'bg-[#c853fe] text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-300'
                }`}
              >
                End User
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  role === 'admin' 
                    ? 'bg-[#c853fe] text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-300'
                }`}
              >
                Admin
              </button>
            </div>
            
            {/* Step 1: Signup Form */}
            {step === 1 && (
              <form onSubmit={handleSignupSubmit} className="flex flex-col items-center gap-5 border-slate-300 border rounded-xl p-10">
                <p className="text-xl">
                  Sign Up as {role === 'end-user' ? 'End User' : 'Admin'}
                </p>
                
                {/* Role indicator */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className={`w-3 h-3 rounded-full ${role === 'admin' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                  <span>{role === 'admin' ? 'Administrator Account' : 'User Account'}</span>
                </div>
                
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
                  className="bg-[#c853fe] rounded px-4 py-2 hover:bg-[#ff55d3] disabled:bg-gray-400 min-w-[100px] text-white font-semibold transition-colors"
                >
                  {otpLoading ? 'Sending...' : `Sign up`}
                </button>
                
                <p>Already have an account<Link href="/" className="text-[#43a7fc] hover:underline"> Login</Link></p>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <form onSubmit={handleOtpSubmit} className="flex flex-col items-center gap-5 border-slate-300 border rounded-xl p-10">
                <p className="text-xl">Verify Email</p>
                <p className="text-sm text-gray-600 text-center mb-2">
                  We have sent a 6-digit verification code to<br />
                  <strong>{email}</strong>
                </p>
                
                {/* Role reminder */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className={`w-3 h-3 rounded-full ${role === 'admin' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                  <span>Creating {role === 'admin' ? 'Administrator' : 'User'} account</span>
                </div>
                
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
                    className="bg-[#c853fe] rounded px-3 py-1 hover:bg-[#ff55d3] text-white font-semibold"
                  >
                    Create Account
                  </button>
                </div>
                
                <p>Already have an account<Link href="/" className="text-[#43a7fc] hover:underline"> Login</Link></p>
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

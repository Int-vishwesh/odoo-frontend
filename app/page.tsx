'use client';
import Link from "next/link";
import Navbar from "./components/navbar";
import Image from "next/image";
import { useState } from 'react';

export default function Home() {
  const [role, setRole] = useState('end-user'); // Default to end-user
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!username || !password) {
      alert('Please fill all fields');
      return;
    }

    // Here you would call your login API with the role
    console.log('Login attempt:', { username, password, role });
    
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: username,
          password, 
          role 
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`Login successful as ${role}!`);
        if (role === 'admin') {
          window.location.href = '/admin/dashboard';
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="w-full flex justify-center items-center gap-30 mt-20">
          <div className="w-[800px] flex flex-col items-center gap-4 -mr-30">
            
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

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 border-slate-300 border rounded-xl p-10">
              <p className="text-xl">
                Login as {role === 'end-user' ? 'End User' : 'Admin'}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className={`w-3 h-3 rounded-full ${role === 'admin' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                <span>{role === 'admin' ? 'Administrator Access' : 'User Access'}</span>
              </div>
              
              <input 
                type="text" 
                placeholder="Email or Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-slate-200 rounded-sm px-3 py-1 w-52 border-b border-slate-700"
                required
              />
              
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-200 rounded-sm px-3 py-1 w-52 border-b border-slate-700"
                required
              />
              
              <button 
                type="submit" 
                className="bg-[#c853fe] rounded px-4 py-2 text-white font-semibold hover:bg-[#ff55d3] transition-colors"
              >
                Login
              </button>
              
              <p>
                Don't have an account?
                <Link href="/signup" className="text-[#43a7fc] hover:underline ml-1">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
          
          <div>
            <Image 
              src="/landing-1.jpg" 
              alt="Landing" 
              width={750} 
              height={400} 
              className="mr-10"
            />
          </div>
        </div>
      </div>
    </>
  );
}

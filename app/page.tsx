'use client';
import Link from "next/link";
import Navbar from "./components/navbar";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState('end-user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/login', {
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
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn', 'true');
        
        alert(`${data.message}!`);
        
        // Redirect based on user role from server response
        if (data.user.role === 'admin') {
          router.push('/admin/events');
        } else {
          router.push('/homepage');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different error types
      if (error instanceof TypeError) {
        alert('Cannot connect to server. Please check if the backend is running.');
      } else {
        alert('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="w-full flex justify-center items-center gap-30 mt-20">
          <div className="w-[800px] flex flex-col items-center gap-4 -mr-30">
            
            {/* Role Selection Tabs */}
            <div className="flex bg-gray-200 rounded-lg p-1 mb-6">
              <button
                type="button"
                onClick={() => setRole('end-user')}
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 ${
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
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 ${
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
              
              {/* Role indicator */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className={`w-3 h-3 rounded-full ${role === 'admin' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                <span>{role === 'admin' ? 'Administrator Access' : 'User Access'}</span>
              </div>

              {/* Demo credentials display */}
              <div className="text-xs text-gray-500 text-center p-2 bg-gray-50 rounded">
                <p><strong>Demo Credentials:</strong></p>
                <p>User: user@example.com / password123</p>
                <p>Admin: admin@example.com / password123</p>
              </div>
              
              <input 
                type="email" 
                placeholder="Email address" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-slate-200 rounded-sm px-3 py-1 w-52 border-b border-slate-700"
                disabled={loading}
                required
              />
              
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-200 rounded-sm px-3 py-1 w-52 border-b border-slate-700"
                disabled={loading}
                required
              />
              
              <button 
                type="submit" 
                disabled={loading}
                className="bg-[#c853fe] rounded px-4 py-2 text-white font-semibold hover:bg-[#ff55d3] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[100px]"
              >
                {loading ? 'Logging in...' : 'Login'}
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

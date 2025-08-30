'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/navbar';

interface UserProfile {
  name: string;
  email: string;
  address: string;
  phone: string;
  avatar?: string;
  eventsAttended: number;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo user data
    const demoUser: UserProfile = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St, San Francisco, CA',
      phone: '+1 (555) 123-4567',
      avatar: '/landing.jpg',
      eventsAttended: 8
    };
    
    setUser(demoUser);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            
            {/* Avatar and Name */}
            <div className="flex items-center space-x-6 mb-8">
              <Image
                src={user.avatar || '/default-avatar.png'}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-gray-600 text-sm">Email</label>
                <p className="text-gray-900 font-medium">{user.email}</p>
              </div>
              
              <div>
                <label className="text-gray-600 text-sm">Phone</label>
                <p className="text-gray-900 font-medium">{user.phone}</p>
              </div>
              
              <div>
                <label className="text-gray-600 text-sm">Address</label>
                <p className="text-gray-900 font-medium">{user.address}</p>
              </div>
            </div>

            {/* Events Attended */}
            <div className="bg-blue-50 rounded-lg p-4 mb-8 text-center">
              <h3 className="text-lg font-semibold text-gray-900">Events Attended</h3>
              <p className="text-3xl font-bold text-blue-600">{user.eventsAttended}</p>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  href="/homepage"
                  className="block w-full p-3 bg-green-500 text-white text-center rounded-lg hover:bg-green-600 transition-colors"
                >
                  Browse Events
                </Link>
                
                <Link 
                  href="/my-bookings"
                  className="block w-full p-3 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 transition-colors"
                >
                  My Bookings
                </Link>
                
                <button className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

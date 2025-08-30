'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/navbar';

interface Booking {
  id: string;
  eventTitle: string;
  date: string;
  time: string;
  location: string;
  tickets: number;
  totalPrice: number;
  image?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/user/bookings');
      // const data = await response.json();
      
      // Demo bookings data
      const demoBookings: Booking[] = [
        {
          id: '1',
          eventTitle: 'Live Music Festival',
          date: '10 Nov, 2025',
          time: '7:00 PM',
          location: 'Central Park Amphitheater',
          tickets: 2,
          totalPrice: 100,
          image: '/landing.jpg',
          status: 'confirmed'
        },
        {
          id: '2',
          eventTitle: 'Tech Conference 2025',
          date: '15 Nov, 2025',
          time: '9:00 AM',
          location: 'Convention Center',
          tickets: 1,
          totalPrice: 75,
          image: '/landing.jpg',
          status: 'confirmed'
        },
        {
          id: '3',
          eventTitle: 'Art Exhibition',
          date: '20 Nov, 2025',
          time: '10:00 AM',
          location: 'Downtown Gallery',
          tickets: 3,
          totalPrice: 90,
          image: '/landing.jpg',
          status: 'pending'
        }
      ];
      
      setBookings(demoBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600">View and manage your event registrations</p>
          </div>

          {bookings.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎫</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">No bookings yet</h2>
              <p className="text-gray-600 mb-6">Start exploring events and book your first ticket!</p>
              <Link 
                href="/homepage"
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Browse Events
              </Link>
            </div>
          ) : (
            /* Bookings List */
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    
                    {/* Event Image */}
                    <div className="relative h-48 md:h-auto md:w-64">
                      <Image
                        src={booking.image || '/default-event.jpg'}
                        alt={booking.eventTitle}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Booking Details */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {booking.eventTitle}
                          </h3>
                          <div className="space-y-1 text-gray-600">
                            <p>📅 {booking.date} at {booking.time}</p>
                            <p>📍 {booking.location}</p>
                            <p>🎫 {booking.tickets} ticket{booking.tickets > 1 ? 's' : ''}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">${booking.totalPrice}</span>
                          <span className="text-gray-600 ml-2">Total Paid</span>
                        </div>
                        
                        <div className="flex space-x-3">
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                            View Details
                          </button>
                          {booking.status === 'confirmed' && (
                            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Stats */}
          {bookings.length > 0 && (
            <div className="mt-12 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{bookings.length}</div>
                  <div className="text-gray-600">Total Bookings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </div>
                  <div className="text-gray-600">Confirmed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${bookings.reduce((sum, b) => sum + b.totalPrice, 0)}
                  </div>
                  <div className="text-gray-600">Total Spent</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

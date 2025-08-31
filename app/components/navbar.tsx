'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const showHomeOnly = pathname === '/' || pathname === '/signup' || pathname === '/admin-events' || pathname === '/admin-events/add-event';
  
  // State for notification count
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  // Handle notification click
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    // You can add logic here to open notification dropdown/modal
    console.log('Notification clicked!');
    // Optional: Reset notification count when clicked
    // setNotificationCount(0);
  };

  return (
    <>
      <header className="w-full flex justify-between p-1 px-5">
        <h1 className="text-[30px] font-semibold">
          event<span className="text-[#c853fe]">Hive</span>
        </h1>
        
        {showHomeOnly ? (
          <Link href="/" className="text-[18px] mr-5 font-semibold hover:text-[#c853fe] transition-colors"> 
            Home 
          </Link>
        ) : (
          <nav className="flex items-center space-x-6 mr-5">
            <Link 
              href="/my-bookings" 
              className="text-[18px] font-semibold hover:text-[#c853fe] transition-colors"
            >
              My Bookings
            </Link>
            
            {/* Clickable Notification Button */}
            <div className="relative">
              <button 
                className="text-[18px] font-semibold hover:text-[#c853fe] transition-colors cursor-pointer p-1 rounded-md hover:bg-gray-100 hover:bg-opacity-10"
                aria-label="Notifications"
                onClick={handleNotificationClick}
                type="button"
              >
                🔔
                {/* Notification Badge */}
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-normal">
                    {notificationCount}
                  </span>
                )}
              </button>
              
              {/* Optional: Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white text-black rounded-lg shadow-lg border z-50">
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Notifications</h3>
                    <div className="space-y-2">
                      <div className="text-sm p-2 bg-gray-50 rounded">
                        New event booking confirmed
                      </div>
                      <div className="text-sm p-2 bg-gray-50 rounded">
                        Event reminder: Music Festival tomorrow
                      </div>
                      <div className="text-sm p-2 bg-gray-50 rounded">
                        Payment received for Tennis Tournament
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Link 
              href="/profile" 
              className="text-[18px] font-semibold hover:text-[#c853fe] transition-colors"
            >
              Profile
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}

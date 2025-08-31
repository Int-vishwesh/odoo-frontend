'use client';
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/navbar";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

// TypeScript interfaces
interface AttendeeDetail {
  type: 'Standard' | 'VIP';
  name: string;
  phone: string;
  gender: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  category: string;
  standardPrice: number;
  vipPrice: number;
  organizer: {
    name: string;
    phone: string;
    email: string;
  };
  registeredUsers?: number;
}

export default function Events() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.event as string;

  // Event state
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  // Modal and booking states
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [standardTickets, setStandardTickets] = useState(0);
  const [vipTickets, setVipTickets] = useState(0);
  const [attendeeDetails, setAttendeeDetails] = useState<AttendeeDetail[]>([]);

  // Fetch event data
  useEffect(() => {
    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/events/${eventId}`);
      const data = await response.json();
      
      if (data.success) {
        setEvent(data.event);
      } else {
        // Fallback to demo data for this specific event
        setEvent(getDemoEvent());
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      setEvent(getDemoEvent());
    } finally {
      setLoading(false);
    }
  };

  // Demo event data fallback
const getDemoEvent = (): Event => {
  const events: { [key: string]: Event } = {
    '1': {
      id: eventId,
      title: 'Live Music Festival',
      description: 'Amazing live music with top artists from around the world. Food trucks, craft drinks, and unforgettable performances.',
      image: '/landing.jpg',
      date: '10 nov, 2025',
      time: '7:00pm - 11:00pm',
      location: 'Central Park Amphitheater',
      category: 'music',
      standardPrice: 50,
      vipPrice: 100,
      organizer: {
        name: 'Music Events Co.',
        phone: '91 123456789',
        email: 'music@events.com'
      },
      registeredUsers: 156
    },
    '2': {
      id: eventId,
      title: 'Tech Conference 2025',
      description: 'Latest trends in AI, blockchain, and web development. Network with industry leaders.',
      image: '/landing.jpg',
      date: '15 nov, 2025',
      time: '9:00am - 6:00pm',
      location: 'Convention Center',
      category: 'tech',
      standardPrice: 75,
      vipPrice: 150,
      organizer: {
        name: 'Tech Summit',
        phone: '91 987654321',
        email: 'info@techsummit.com'
      },
      registeredUsers: 234
    },
    '3': {
      id: eventId,
      title: 'Art Exhibition',
      description: 'Contemporary art showcase featuring local and international artists.',
      image: '/landing.jpg',
      date: '20 nov, 2025',
      time: '10:00am - 8:00pm',
      location: 'Art Gallery Downtown',
      category: 'art',
      standardPrice: 30,
      vipPrice: 60,
      organizer: {
        name: 'Art Gallery',
        phone: '91 456789123',
        email: 'info@artgallery.com'
      },
      registeredUsers: 89
    },
    '4': {
      id: eventId,
      title: 'Sports Championship',
      description: 'Annual championship featuring multiple competitive games.',
      image: '/landing.jpg',
      date: '25 nov, 2025',
      time: '2:00pm - 10:00pm',
      location: 'Sports Stadium',
      category: 'sports',
      standardPrice: 40,
      vipPrice: 80,
      organizer: {
        name: 'Sports Federation',
        phone: '91 789123456',
        email: 'sports@championship.com'
      },
      registeredUsers: 567
    },
    '5': {
      id: eventId,
      title: 'Jazz Night',
      description: 'Smooth jazz evening with renowned musicians.',
      image: '/landing.jpg',
      date: '30 nov, 2025',
      time: '8:00pm - 12:00am',
      location: 'Jazz Club',
      category: 'music',
      standardPrice: 60,
      vipPrice: 120,
      organizer: {
        name: 'Jazz Club',
        phone: '91 321654987',
        email: 'info@jazzclub.com'
      },
      registeredUsers: 45
    },
    '6': {
      id: eventId,
      title: 'Startup Pitch',
      description: 'Young entrepreneurs presenting innovative ideas.',
      image: '/landing.jpg',
      date: '5 dec, 2025',
      time: '6:00pm - 9:00pm',
      location: 'Business Center',
      category: 'tech',
      standardPrice: 25,
      vipPrice: 50,
      organizer: {
        name: 'Startup Incubator',
        phone: '91 654987321',
        email: 'pitch@startup.com'
      },
      registeredUsers: 123
    }
  };

  // Return event based on eventId, fallback to first event
  return events[eventId] || events['1'];
};


  // Calculate totals
  const totalTickets = standardTickets + vipTickets;
  const totalPrice = event ? (
    standardTickets * event.standardPrice + vipTickets * event.vipPrice
  ) : 0;

  const handleNext = () => {
    if (totalTickets === 0) {
      alert('Please select at least one ticket');
      return;
    }
    
    const details: AttendeeDetail[] = [];
    
    for (let i = 0; i < standardTickets; i++) {
      details.push({ type: 'Standard', name: '', phone: '', gender: '' });
    }
    for (let i = 0; i < vipTickets; i++) {
      details.push({ type: 'VIP', name: '', phone: '', gender: '' });
    }
    
    setAttendeeDetails(details);
    setStep(2);
  };

  const handleMakePayment = () => {
    const allFilled = attendeeDetails.every(detail => 
      detail.name && detail.phone && detail.gender
    );
    
    if (!allFilled) {
      alert('Please fill all attendee details');
      return;
    }
    
    alert('Payment Successful! Registration Complete.');
    closeModal();
  };

  const updateAttendeeDetail = (index: number, field: keyof AttendeeDetail, value: string) => {
    const updated = [...attendeeDetails];
    updated[index] = { ...updated[index], [field]: value };
    setAttendeeDetails(updated);
  };

  const closeModal = () => {
    setShowModal(false);
    setStep(1);
    setStandardTickets(0);
    setVipTickets(0);
    setAttendeeDetails([]);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  // Event not found
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Event Not Found</h1>
          <Link href="/homepage" className="text-blue-600 hover:underline mt-4 block">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex gap-20 justify-center mt-10">
        <div id="left" className="w-[50%] flex flex-col gap-5 items-start p-5">
          <div>
            {/* Dynamic Breadcrumb */}
            <nav className="mb-4">
              <Link href="/homepage" className="text-blue-600 hover:underline">
                Events
              </Link>
              <span className="mx-2 text-gray-400">→</span>
              <span className="text-gray-600">{event.title}</span>
            </nav>
            
            <p className="text-green-600 text-sm">✅ Registration Open</p>
            <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
            <p className="text-gray-600">{event.description}</p>
          </div>
          
          <p className="rounded-full py-1 px-3 bg-blue-600 text-white text-sm capitalize">
            {event.category}
          </p>
          
          <div className="prose prose-gray max-w-none">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non inventore aliquid sapiente, error distinctio quos praesentium, dolorum architecto voluptas ipsa perspiciatis provident accusantium hic doloribus, placeat fugit. Aut nostrum esse corporis labore repudiandae vitae molestiae accusamus possimus ipsum reprehenderit quis laborum numquam, iusto, unde nulla laboriosam officiis id modi qui vero quia exercitationem enim. Tenetur, tempora aperiam, unde est et eius eveniet ipsum omnis fugit illo aspernatur explicabo accusantium atque dolores! Autem ratione, culpa ipsam obcaecati recusandae ipsa aliquid!</p>
          </div>
        </div>
        
        <div id="right" className="flex flex-col items-start gap-5">
          <button 
            onClick={() => setShowModal(true)}
            className="font-bold text-xl bg-green-500 hover:bg-green-600 p-3 rounded-[20px] text-white transition-colors"
          >
            Register
          </button>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">📅 Event Schedule</h3>
            <p>{event.date} <br />
              <span className="text-gray-600">{event.time}</span><br />
              <span className="text-green-600 text-sm">Starts soon</span>
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">📍 Location</h3>
            <p className="text-gray-600">{event.location}</p>
          </div>
          
          {/* Ticket Pricing */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">🎫 Ticket Prices</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Standard:</span>
                <span className="font-semibold text-green-600">${event.standardPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VIP:</span>
                <span className="font-semibold text-purple-600">${event.vipPrice}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">Organizer</h2>
            <p className="text-gray-600">
              {event.organizer?.name || 'Not available'}<br />
              📞 {event.organizer?.phone || 'not available'} <br />
              ✉️ <a href={`mailto:${event.organizer?.email || ''}`} className="text-blue-600 hover:underline">
  {event.organizer?.email || 'Not available'}
</a>
            </p>
          </div>
          
          <div>
            <p className="font-semibold text-gray-800 mb-2">Share</p>
            <div className="flex gap-3">
              <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                Facebook
              </Link>
              <Link href="/" className="text-pink-600 hover:text-pink-800 transition-colors">
                Instagram
              </Link>
              <Link href="/" className="text-green-600 hover:text-green-800 transition-colors">
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg max-h-[80vh] overflow-y-auto">
            
            {/* Step 1: Ticket Selection */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Select Tickets for {event.title}
                </h2>
                
                {/* Standard Ticket */}
                <div className="flex justify-between items-center mb-4 p-3 border rounded hover:border-blue-300 transition-colors">
                  <div>
                    <p className="font-medium">Standard Ticket</p>
                    <p className="text-gray-600 text-sm">${event.standardPrice}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setStandardTickets(Math.max(0, standardTickets - 1))}
                      className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{standardTickets}</span>
                    <button 
                      onClick={() => setStandardTickets(standardTickets + 1)}
                      className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* VIP Ticket */}
                <div className="flex justify-between items-center mb-4 p-3 border rounded hover:border-purple-300 transition-colors">
                  <div>
                    <p className="font-medium">VIP Ticket</p>
                    <p className="text-gray-600 text-sm">${event.vipPrice}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setVipTickets(Math.max(0, vipTickets - 1))}
                      className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{vipTickets}</span>
                    <button 
                      onClick={() => setVipTickets(vipTickets + 1)}
                      className="w-8 h-8 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Display */}
                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-800">
                    <span>Total Tickets: {totalTickets}</span>
                    <span>Total Price: ${totalPrice}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={closeModal}
                    className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={totalTickets === 0}
                    className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:bg-gray-400 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Attendee Details */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Attendee Details</h2>
                <p className="text-sm text-gray-600 mb-4">Please enter details for each ticket holder</p>
                
                {attendeeDetails.map((detail, index) => (
                  <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold mb-3 text-gray-700">
                      {detail.type} Ticket #{index + 1}
                    </h3>
                    
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={detail.name}
                        onChange={(e) => updateAttendeeDetail(index, 'name', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      />
                      
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={detail.phone}
                        onChange={(e) => updateAttendeeDetail(index, 'phone', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      />
                      
                      <select
                        value={detail.gender}
                        onChange={(e) => updateAttendeeDetail(index, 'gender', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                ))}

                {/* Summary */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between text-sm text-gray-700 mb-2">
                    <span>Standard Tickets ({standardTickets}x): </span>
                    <span>${standardTickets * event.standardPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700 mb-2">
                    <span>VIP Tickets ({vipTickets}x): </span>
                    <span>${vipTickets * event.vipPrice}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg text-gray-800 border-t pt-2">
                    <span>Total Amount: </span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleMakePayment}
                    className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                  >
                    Make Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

'use client';
import Navbar from "../components/navbar";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  category: string;
  standardPrice?: number;
  vipPrice?: number;
}

export default function Home() {
  const [category, setCategory] = useState('all');
  const [dates, setDates] = useState('all');
  const [eventType, setEventType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, category, dates, eventType, searchQuery]);

  const fetchEvents = async () => {
    try {
      // Replace with your backend API
      const response = await fetch('http://localhost:8000/api/events');
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.events);
      } else {
        setEvents(getDemoEvents());
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      // Use demo data as fallback
      setEvents(getDemoEvents());
    } finally {
      setLoading(false);
    }
  };

  // Demo data fallback
  const getDemoEvents = (): Event[] => [
    {
      id: '1',
      title: 'Live Music Festival',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem dolor quas asperiore',
      image: '/landing.jpg',
      date: '10 nov, 2025',
      location: 'location jdcbhjdbh',
      category: 'music',
      standardPrice: 50,
      vipPrice: 100
    },
    {
      id: '2',
      title: 'Tech Conference',
      description: 'Latest trends in technology and innovation',
      image: '/landing.jpg',
      date: '15 nov, 2025',
      location: 'Convention Center',
      category: 'tech',
      standardPrice: 75,
      vipPrice: 150
    },
    {
      id: '3',
      title: 'Art Exhibition',
      description: 'Contemporary art showcase from local artists',
      image: '/landing.jpg',
      date: '20 nov, 2025',
      location: 'Art Gallery Downtown',
      category: 'art',
      standardPrice: 30,
      vipPrice: 60
    },
    {
      id: '4',
      title: 'Sports Championship',
      description: 'Annual sports championship with multiple games',
      image: '/landing.jpg',
      date: '25 nov, 2025',
      location: 'Sports Stadium',
      category: 'sports',
      standardPrice: 40,
      vipPrice: 80
    },
    {
      id: '5',
      title: 'Jazz Night',
      description: 'Smooth jazz evening with renowned musicians',
      image: '/landing.jpg',
      date: '30 nov, 2025',
      location: 'Jazz Club',
      category: 'music',
      standardPrice: 60,
      vipPrice: 120
    },
    {
      id: '6',
      title: 'Startup Pitch',
      description: 'Young entrepreneurs presenting their ideas',
      image: '/landing.jpg',
      date: '5 dec, 2025',
      location: 'Business Center',
      category: 'tech',
      standardPrice: 25,
      vipPrice: 50
    }
  ];

  const filterEvents = () => {
    let filtered = events;

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(event => event.category === category);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by useEffect
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Filters Section */}
      <div className="flex justify-between px-30 mt-10 w-full">
        <select 
          name="category" 
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="all">All Categories</option>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="tech">Tech</option>
          <option value="art">Art</option>
        </select>

        <select 
          name="dates" 
          id="dates"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="this-week">This Week</option>
          <option value="this-month">This Month</option>
          <option value="this-year">This Year</option>
        </select>

        <select 
          name="event-type" 
          id="event-type"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="all">All Event Types</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="abroad">Abroad</option>
        </select>

        <form onSubmit={handleSearch} className="flex items-center">
          <input 
            type="search" 
            placeholder="search events" 
            className="border-b border-black px-2 py-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="cursor-pointer ml-2">
            🔍
          </button>
        </form>
      </div>

      {/* Events Grid */}
      <main className="flex justify-center mt-10 gap-20 flex-wrap">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Link key={event.id} href={`/homepage/${event.id}`}>
              <div className="relative w-[350px] flex flex-col border p-5 rounded-2xl border-slate-300 gap-2 hover:shadow-lg transition-shadow cursor-pointer">
                <Image 
                  src={event.image || "/landing.jpg"} 
                  alt={event.title} 
                  width={1000} 
                  height={1000}
                  className="rounded-lg"
                />
                
                <div className="flex justify-between -mt-2 w-full">
                  <p className="rounded-full bg-slate-700 py-1 px-3 text-white text-sm capitalize">
                    {event.category}
                  </p>
                  <p className="text-gray-600 text-sm">{event.date}</p>
                </div>
                
                <h1 className="font-semibold text-[18px]">{event.title}</h1>
                
                <p className="text-[#437afc] text-sm line-clamp-2">
                  {event.description}
                </p>
                
                <p className="text-gray-600 text-sm">
                  📍 {event.location}
                </p>

                {/* Price display */}
                {event.standardPrice && event.vipPrice && (
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Starting from</span>
                    <div className="text-sm">
                      <span className="text-green-600 font-semibold">${event.standardPrice}</span>
                      <span className="text-gray-400 mx-1">-</span>
                      <span className="text-purple-600 font-semibold">${event.vipPrice}</span>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No events found matching your criteria</p>
            <button 
              onClick={() => {
                setCategory('all');
                setDates('all');
                setEventType('all');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </>
  );
}

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/navbar';

interface AdminEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  standardPrice: number;
  vipPrice: number;
  image?: string;
  isPublished: boolean;
  registeredUsers?: number;
}

export default function AdminEvents() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'unpublished'>('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // TODO: Replace with your backend API
      const response = await fetch('http://localhost:8000/api/admin/events');
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.events);
      } else {
        // Demo data fallback
        setEvents(getDemoEvents());
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents(getDemoEvents());
    } finally {
      setLoading(false);
    }
  };

  const getDemoEvents = (): AdminEvent[] => [
    {
      id: '1',
      title: 'Live Music Festival',
      description: 'Amazing live music with top artists',
      category: 'music',
      date: '10 Nov, 2025',
      time: '7:00 PM',
      location: 'Central Park',
      standardPrice: 50,
      vipPrice: 100,
      image: '/landing.jpg',
      isPublished: true,
      registeredUsers: 156
    },
    {
      id: '2',
      title: 'Tech Conference 2025',
      description: 'Latest trends in technology and AI',
      category: 'tech',
      date: '15 Nov, 2025',
      time: '9:00 AM',
      location: 'Convention Center',
      standardPrice: 75,
      vipPrice: 150,
      image: '/landing.jpg',
      isPublished: false,
      registeredUsers: 23
    },
    {
      id: '3',
      title: 'Art Exhibition',
      description: 'Contemporary art showcase',
      category: 'art',
      date: '20 Nov, 2025',
      time: '10:00 AM',
      location: 'Downtown Gallery',
      standardPrice: 30,
      vipPrice: 60,
      image: '/landing.jpg',
      isPublished: true,
      registeredUsers: 89
    },
    {
      id: '4',
      title: 'Sports Championship',
      description: 'Annual sports tournament',
      category: 'sports',
      date: '25 Nov, 2025',
      time: '2:00 PM',
      location: 'Sports Stadium',
      standardPrice: 40,
      vipPrice: 80,
      image: '/landing.jpg',
      isPublished: false,
      registeredUsers: 5
    }
  ];

  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    // Optimistic UI update
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === id ? { ...event, isPublished: !currentStatus } : event
      )
    );

    try {
      const response = await fetch(`http://localhost:8000/api/admin/events/${id}/publish`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPublished: !currentStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update publish status');
      }

      alert(`Event ${!currentStatus ? 'published' : 'unpublished'} successfully!`);
    } catch (error) {
      console.error('Error updating publish status:', error);
      
      // Revert the optimistic update on failure
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === id ? { ...event, isPublished: currentStatus } : event
        )
      );
      
      alert('Failed to update publish status. Please try again.');
    }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/admin/events/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setEvents(events.filter(event => event.id !== id));
        alert('Event deleted successfully!');
      } else {
        throw new Error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again.');
    }
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'published') return event.isPublished;
    if (filter === 'unpublished') return !event.isPublished;
    return true;
  });

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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Events</h1>
              <p className="text-gray-600">Create, edit, and manage your events</p>
            </div>
            
            <Link 
              href="/admin-events/add-event"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              + Add New Event
            </Link>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Events ({events.length})
              </button>
              
              <button
                onClick={() => setFilter('published')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'published'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Published ({events.filter(e => e.isPublished).length})
              </button>
              
              <button
                onClick={() => setFilter('unpublished')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'unpublished'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Unpublished ({events.filter(e => !e.isPublished).length})
              </button>
            </div>
          </div>

          {/* Events List */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📅</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                No events found
              </h2>
              <p className="text-gray-600 mb-6">
                {filter === 'all' 
                  ? 'Start by creating your first event!'
                  : `No ${filter} events found.`
                }
              </p>
              <Link 
                href="/admin/add-event"
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Event
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  
                  {/* Event Image */}
                  <div className="relative h-48">
                    <Image
                      src={event.image || '/default-event.jpg'}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        event.isPublished 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {event.isPublished ? 'Published' : 'Unpublished'}
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-black bg-opacity-60 text-white capitalize">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-1 text-xs text-gray-500 mb-4">
                      <p>📅 {event.date} at {event.time}</p>
                      <p>📍 {event.location}</p>
                      <p>👥 {event.registeredUsers || 0} registered</p>
                      <p>💰 ${event.standardPrice} - ${event.vipPrice}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => togglePublishStatus(event.id, event.isPublished)}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          event.isPublished
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {event.isPublished ? 'Unpublish' : 'Publish'}
                      </button>

                      <Link
                        href={`/admin/events/edit/${event.id}`}
                        className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Stats */}
          {events.length > 0 && (
            <div className="mt-12 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{events.length}</div>
                  <div className="text-gray-600">Total Events</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {events.filter(e => e.isPublished).length}
                  </div>
                  <div className="text-gray-600">Published</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {events.filter(e => !e.isPublished).length}
                  </div>
                  <div className="text-gray-600">Unpublished</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {events.reduce((sum, e) => sum + (e.registeredUsers || 0), 0)}
                  </div>
                  <div className="text-gray-600">Total Registrations</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

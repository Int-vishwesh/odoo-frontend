'use client';
import { useState } from 'react';
import Navbar from '../../components/navbar';
import { useRouter } from 'next/navigation';

interface NewEvent {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  standardPrice: number;
  vipPrice: number;
  imageUrl: string;
  organizerName: string;
  organizerPhone: string;
  organizerEmail: string;
}

export default function AddEvent() {
  const router = useRouter();
  const [eventData, setEventData] = useState<NewEvent>({
    title: '',
    description: '',
    category: 'music',
    date: '',
    time: '',
    location: '',
    standardPrice: 0,
    vipPrice: 0,
    imageUrl: '',
    organizerName: '',
    organizerPhone: '',
    organizerEmail: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: name.includes('Price') ? Number(value) : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!eventData.title.trim()) newErrors.title = 'Event title is required';
    if (!eventData.description.trim()) newErrors.description = 'Description is required';
    if (!eventData.date) newErrors.date = 'Event date is required';
    if (!eventData.time) newErrors.time = 'Event time is required';
    if (!eventData.location.trim()) newErrors.location = 'Location is required';
    if (eventData.standardPrice <= 0) newErrors.standardPrice = 'Standard price must be greater than 0';
    if (eventData.vipPrice <= 0) newErrors.vipPrice = 'VIP price must be greater than 0';
    if (!eventData.organizerName.trim()) newErrors.organizerName = 'Organizer name is required';
    if (!eventData.organizerEmail.trim()) newErrors.organizerEmail = 'Organizer email is required';
    if (!eventData.organizerPhone.trim()) newErrors.organizerPhone = 'Organizer phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with your backend API
      const response = await fetch('http://localhost:8000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Event created successfully!');
        router.push('/admin-events'); // Redirect to admin events list
      } else {
        alert(result.error || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEventData({
      title: '',
      description: '',
      category: 'music',
      date: '',
      time: '',
      location: '',
      standardPrice: 0,
      vipPrice: 0,
      imageUrl: '',
      organizerName: '',
      organizerPhone: '',
      organizerEmail: ''
    });
    setErrors({});
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Event</h1>
            <p className="text-gray-600">Create a new event for users to discover and book</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Basic Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Event Title */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={eventData.title}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter event title"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={eventData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="music">Music</option>
                      <option value="sports">Sports</option>
                      <option value="tech">Technology</option>
                      <option value="art">Art & Culture</option>
                    </select>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Image URL
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={eventData.imageUrl}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe your event..."
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>
              </div>

              {/* Date & Location */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Date & Location</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={eventData.date}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                        errors.date ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time *
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={eventData.time}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                        errors.time ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={eventData.location}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                        errors.location ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Event venue"
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Ticket Pricing</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Standard Price ($) *
                    </label>
                    <input
                      type="number"
                      name="standardPrice"
                      value={eventData.standardPrice}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                        errors.standardPrice ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="50.00"
                    />
                    {errors.standardPrice && <p className="mt-1 text-sm text-red-600">{errors.standardPrice}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      VIP Price ($) *
                    </label>
                    <input
                      type="number"
                      name="vipPrice"
                      value={eventData.vipPrice}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                        errors.vipPrice ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="100.00"
                    />
                    {errors.vipPrice && <p className="mt-1 text-sm text-red-600">{errors.vipPrice}</p>}
                  </div>
                </div>
              </div>

              {/* Organizer Info */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Organizer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="organizerName"
                      value={eventData.organizerName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                        errors.organizerName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Organizer name"
                    />
                    {errors.organizerName && <p className="mt-1 text-sm text-red-600">{errors.organizerName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="organizerPhone"
                      value={eventData.organizerPhone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                        errors.organizerPhone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.organizerPhone && <p className="mt-1 text-sm text-red-600">{errors.organizerPhone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="organizerEmail"
                      value={eventData.organizerEmail}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                        errors.organizerEmail ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="organizer@example.com"
                    />
                    {errors.organizerEmail && <p className="mt-1 text-sm text-red-600">{errors.organizerEmail}</p>}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset Form
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
                >
                  {loading ? 'Creating Event...' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

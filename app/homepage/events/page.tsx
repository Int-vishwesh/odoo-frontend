'use client';
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/navbar";
import { useState } from 'react';

export default function Events() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  
  const [standardTickets, setStandardTickets] = useState(0);
  const [vipTickets, setVipTickets] = useState(0);
  
  // Arrays to store attendee details
  const [attendeeDetails, setAttendeeDetails] = useState([]);

  const standardPrice = 50;
  const vipPrice = 100;
  const totalTickets = standardTickets + vipTickets;
  const totalPrice = standardTickets * standardPrice + vipTickets * vipPrice;

  const handleNext = () => {
    if (totalTickets === 0) {
      alert('Please select at least one ticket');
      return;
    }
    
    const details = [];
    
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
    // Check if all details are filled
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

  const updateAttendeeDetail = (index, field, value) => {
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

  return (
    <>
      <Navbar />
      <div className="flex gap-20 justify-center mt-10">
        <div id="left" className="w-[50%] flex flex-col gap-5 items-start p-5">
          <div>
            <p>breadcrumbs</p>
            <p>registered</p>
            <p>Live jb</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, quisquam?</p>
          </div>
          <p className="rounded-full py-1 px-3 bg-blue-600 text-white text-sm">music</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non inventore aliquid sapiente, error distinctio quos praesentium, dolorum architecto voluptas ipsa perspiciatis provident accusantium hic doloribus, placeat fugit. Aut nostrum esse corporis labore repudiandae vitae molestiae accusamus possimus ipsum reprehenderit quis laborum numquam, iusto, unde nulla laboriosam officiis id modi qui vero quia exercitationem enim. Tenetur, tempora aperiam, unde est et eius eveniet ipsum omnis fugit illo aspernatur explicabo accusantium atque dolores! Autem ratione, culpa ipsam obcaecati recusandae ipsa aliquid!</p>
        </div>
        
        <div id="right" className="flex flex-col items-start gap-5">
          <button 
            onClick={() => setShowModal(true)}
            className="font-bold text-xl bg-green-500 hover:bg-green-600 p-3 rounded-[20px] text-white transition-colors"
          >
            Register
          </button>
          
          <p>15 jan, 2025 <br />
            <span>1:30pm - 2:50pm</span><br />
            Starts in 4d
          </p>
          
          <p>📍Location <br />
            <span>lorem bdnkdnkjd hdbkhd bkhdkd</span>
          </p>
          
          <h2 className="font-semibold">Organizer</h2>
          <p>Marc Demo <br />
            📞91 898479494 <br />
            ✉️info@gmail.com
          </p>
          
          <p>Share</p>
          <div className="flex gap-3">
            <Link href="/" className="text-blue-600 hover:text-blue-800">fb</Link>
            <Link href="/" className="text-pink-600 hover:text-pink-800">insta</Link>
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
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Tickets</h2>
                
                {/* Standard Ticket */}
                <div className="flex justify-between items-center mb-4 p-3 border rounded">
                  <div>
                    <p className="font-medium">Standard Ticket</p>
                    <p className="text-gray-600 text-sm">$50</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setStandardTickets(Math.max(0, standardTickets - 1))}
                      className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{standardTickets}</span>
                    <button 
                      onClick={() => setStandardTickets(standardTickets + 1)}
                      className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* VIP Ticket */}
                <div className="flex justify-between items-center mb-4 p-3 border rounded">
                  <div>
                    <p className="font-medium">VIP Ticket</p>
                    <p className="text-gray-600 text-sm">$100</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setVipTickets(Math.max(0, vipTickets - 1))}
                      className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{vipTickets}</span>
                    <button 
                      onClick={() => setVipTickets(vipTickets + 1)}
                      className="w-8 h-8 bg-purple-500 text-white rounded-full hover:bg-purple-600"
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
                    className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    Close
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={totalTickets === 0}
                    className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:bg-gray-400"
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
                    <span>${standardTickets * standardPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700 mb-2">
                    <span>VIP Tickets ({vipTickets}x): </span>
                    <span>${vipTickets * vipPrice}</span>
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
                    className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleMakePayment}
                    className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded"
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


import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNotification } from "../hooks/useNotifications.jsx";
import AvailabilityCalendar from "../components/studentBrowsing/AvailabilityCalendar.jsx";
import { Link, useParams } from "react-router-dom";
import { bookSlot } from "../api/MentorBookingApi.jsx";

const SingleMentorPage = () => {
  const [mentor, setMentor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookingHistory, setBookingHistory] = useState([]);
  const {mentorId} = useParams()
  console.log(mentorId);
  
  const studentId = useSelector((state) => state.user.id) || localStorage.getItem("userId");
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchMentorData = async () => {
      setLoading(true);
      try {
        const [mentorResponse, slotsResponse] = await Promise.all([
          axios.get(`http://localhost:4000/api/mentor/${mentorId}`),
          axios.get(`http://localhost:4000/api/mentor-booking/get_availability/${mentorId}`)
        ]);
        setMentor(mentorResponse.data);
        setAvailableSlots(slotsResponse.data.available_slots || []);

        console.log(mentor, availableSlots);
        
      } catch (error) {
        console.error("Error fetching mentor data:", error);
        addNotification("Failed to load mentor data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMentorData();
  }, [mentorId, addNotification]);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setIsDialogOpen(true);
  };

//   const handleBookingConfirm = async () => {
//     if (selectedSlot) {
//       setLoading(true);
//       try {
//         const response = await bookSlot(studentId, selectedSlot.id);

//         if (response?.data?.message === "Booking request sent") {
//           addNotification("Booking request sent successfully!", "success");
//           const newBooking = {
//             id: response.data.bookingId,
//             mentor: mentor.user?.name,
//             date: new Date(selectedSlot.start_time).toLocaleDateString(),
//             time: new Date(selectedSlot.start_time).toLocaleTimeString(),
//           };
//           setBookingHistory((prev) => [newBooking, ...prev]);

//           // Refresh available slots
//           const updatedSlotsResponse = await axios.get(`http://localhost:4000/api/mentor-booking/get_availability/${mentorId}`);
//           setAvailableSlots(updatedSlotsResponse.data.available_slots || []);
//         } else {
//           addNotification(response.data.error || "Failed to book the slot", "error");
//         }
//       } catch (error) {
//         console.error("Error during booking:", error);
//         addNotification("An error occurred while booking", "error");
//       } finally {
//         setLoading(false);
//         setIsDialogOpen(false);
//         setSelectedSlot(null);
//       }
//     }
//   };

const handleBookingConfirm = async () => {
    if (selectedSlot) {
      setLoading(true);
      console.log(selectedSlot);
      try {
        const response = await bookSlot(studentId, selectedSlot.id);

        if (response.message == "Booking request sent successfully") {
          addNotification("Booking request sent","success");
          setIsDialogOpen(false);
          return;
        }

        if (response.error === "Slot not available") {
          addNotification(
            "Sorry, this slot is no longer available. Please choose another slot.",
            "info"
          );
          setIsDialogOpen(false);
          return;
        } else if (
          response.error === "Student has already booked a slot on this date."
        ) {
          addNotification(
            "You have already booked a slot on this date. Please choose a different date.",
            "info"
          );
          setIsDialogOpen(false);
          return;
        } else {
          // addNotification(
          //   "Failed to book the slot. Please try again.",
          //   "error"
          // );
          setIsDialogOpen(false);
        }

        if (response.status === 201) {
          const newBooking = {
            id: result.bookingId,
            mentor: mentor.user.name,
            date: new Date(selectedSlot.start_time).toLocaleDateString(),
            time: new Date(selectedSlot.start_time).toLocaleTimeString(),
          };
          addNotification("Booking request sent successfully!", "success");
          setBookingHistory((prev) => [newBooking, ...prev]);

          // Refresh available slots after booking
          const updatedSlots = await fetchMentorSlots(mentor.user_id);
          setAvailableSlots(updatedSlots.available_slots || []);
        } else {
          // addNotification(
          //   "An unexpected error occurred. Please try again.",
          //   "error"
          // );
        }
      } catch (error) {
        console.error("Error during booking:", error);
      } finally {
        setLoading(false);
      }
    }
    setIsDialogOpen(false);
    setSelectedSlot(null);
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
        />
      </div>
    );
  }
  if (!mentor) {
    return (
      <div className="text-center text-2xl text-gray-600 mt-10">
        Mentor not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-8 mb-8 h-full ">
            <div className="md:w-1/3">
              <img
                src={mentor?.image_url}
                alt={`${mentor?.user?.name}'s profile picture`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{mentor?.user?.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{mentor?.expertise}</p>
              <p className="text-gray-600 mb-2">📍 {mentor?.location}</p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h2 className="font-semibold text-lg mb-2">Education</h2>
                <p>{mentor?.mentor_education?.degree} - {mentor?.mentor_education?.institution}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="font-semibold text-lg mb-2">Professional Experience</h2>
                <p className="mb-2">Years of Experience: {mentor?.mentor_professional?.year_of_experience}</p>
                <p className="mb-2">Type: {mentor?.mentor_professional?.type}</p>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="flex justify-between items-start">

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
            <p className="text-gray-700 whitespace-pre-line">{mentor?.bio}</p>
          </div>
          <div className=" px-6 py-3 bg-blue-400 rounded-full text-white font-bold ">
          <a href={mentor?.mentor_professional?.linkedin_profile}>
            Connect 
          </a>
          </div>
          </div>

          {/* Certifications Section
          {mentor.certifications && mentor?.certifications?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
              <CertificationGallery certifications={mentor?.certifications} />
            </div>
          )} */}

          {/* Booking Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Book a Session</h2>
            <AvailabilityCalendar
              availableSlots={availableSlots}
              loading={loading}
              onSelect={handleSlotSelect}
            />
          </div>
        </div>
      </motion.div>

      {/* Booking Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-semibold mb-4">Confirm Booking</h3>
              <p className="mb-4">
                Do you want to book a session with {mentor?.user?.name} on{" "}
                {selectedSlot &&
                  new Date(selectedSlot.start_time).toLocaleString()}
                ?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookingConfirm}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking History */}
      {bookingHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
          <ul className="space-y-4">
            {bookingHistory.map((booking) => (
              <motion.li
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-100 p-4 rounded-lg"
              >
                <p className="font-semibold">{booking?.mentor}</p>
                <p>
                  {booking?.date} at {booking?.time}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};


export default SingleMentorPage;


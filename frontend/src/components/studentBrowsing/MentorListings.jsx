import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AvailabilityCalendar from "./AvailabilityCalendar.jsx";
import { fetchMentorSlots, bookSlot } from "../../api/MentorBookingApi.jsx";
import { useSelector } from "react-redux";
import { useNotification } from "../../hooks/useNotifications.jsx";

const MentorCard = ({ mentor, onSelect }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={mentor.image_url || "/placeholder.svg"}
            alt={`${mentor.user.name}'s profile picture`}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{mentor.user.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{mentor.expertise}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">
                {mentor.expertise}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Experience: {mentor.mentor_professional.year_of_experience}{" "}
              years
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MentorDetails = ({ mentor }) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookingHistory, setBookingHistory] = useState([]);
  const studentId =
    useSelector((state) => state.user.id) || localStorage.getItem("userId");
  const { addNotification } = useNotification();

  useEffect(() => {
    async function loadSlots() {
      setLoading(true);
      try {
        const slotsData = await fetchMentorSlots(mentor.user_id);
        setAvailableSlots(slotsData?.available_slots || []);
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSlots();
  }, [mentor]);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setIsDialogOpen(true);
  };

  //   const handleBookingConfirm = async () => {
  //     if (selectedSlot) {
  //       setLoading(true);

  //       try {
  //         const result = await bookSlot(studentId, selectedSlot.id);
  //         if (result.message == "Booking request sent") {
  //           addNotification("Booking request sent", "success");
  //           setIsDialogOpen(false);
  //           return;
  //         }

  //         if (result.error === "Slot not available") {
  //           alert(
  //             "Sorry, this slot is no longer available. Please choose another slot.",
  //             "info"
  //           );
  //           setIsDialogOpen(false);
  //           return;
  //         } else if (
  //           result.error === "Student has already booked a slot on this date."
  //         ) {
  //           addNotification(
  //             "You have already booked a slot on this date. Please choose a different date.",
  //             "info"
  //           );
  //           setIsDialogOpen(false);
  //           return;
  //         } else {
  //           addNotification("Failed to book the slot. Please try again.","error");
  //         //   alert("Failed to book the slot. Please try again.");
  //           setIsDialogOpen(false);
  //         }

  //         if (result.status === 201) {
  //           const newBooking = {
  //             id: result.bookingId,
  //             mentor: mentor.user.name,
  //             date: new Date(selectedSlot.start_time).toLocaleDateString(),
  //             time: new Date(selectedSlot.start_time).toLocaleTimeString(),
  //           };
  //           setBookingHistory((prev) => [newBooking, ...prev]);
  //           addNotification("Booking request sent successfully!", "success");
  //           // Refresh available slots after booking
  //           const updatedSlots = await fetchMentorSlots(mentor.user_id);
  //           setAvailableSlots(updatedSlots.available_slots || []);
  //         } else {
  //           // alert('Failed to book the slot. Please try again.')
  //         }
  //       } catch (error) {
  //         // addNotification("Error during booking","error")
  //         console.error("Error during booking:", error);
  //         // alert('An error occurred while booking. Please try again.')
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //     setIsDialogOpen(false);
  //     setSelectedSlot(null);
  //   };

  const handleBookingConfirm = async () => {
    if (selectedSlot) {
      setLoading(true);
      console.log(selectedSlot);
      try {
        const response = await bookSlot(studentId, selectedSlot.id);

        if (response.message == "Booking request sent") {
          alert("Booking request sent");
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
          setBookingHistory((prev) => [newBooking, ...prev]);
          addNotification("Booking request sent successfully!", "success");

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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">{mentor?.user?.name}</h2>
      <p className="text-gray-600 mb-6">{mentor.expertise}</p>

      <AvailabilityCalendar
        availableSlots={availableSlots}
        loading={loading}
        onSelect={handleSlotSelect}
      />

      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-4">Confirm Booking</h3>
              <p className="mb-4">
                Do you want to book a session with {mentor.user.name} on{" "}
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

      {bookingHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold mb-4">Booking History</h2>
          <ul className="space-y-2">
            {bookingHistory.map((booking) => (
              <motion.li
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-100 p-4 rounded-lg"
              >
                <p className="font-semibold">{booking.mentor}</p>
                <p>
                  {booking.date} at {booking.time}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

const MentorBrowser = ({ mentors, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExpertise, setFilterExpertise] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(null);

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.user.name?.toLowerCase().includes(searchTerm?.toLowerCase()) &&
      (filterExpertise === "" || [mentor.expertise].includes(filterExpertise))
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <section className="lg:w-2/3">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search mentors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterExpertise}
            onChange={(e) => setFilterExpertise(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Expertise</option>
            <option value="Software Development">Software Development</option>
            {/* Add more options based on your available expertise */}
          </select>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredMentors.map((mentor) => (
            <motion.div
              key={mentor.user_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <MentorCard
                mentor={mentor}
                onSelect={() => setSelectedMentor(mentor)}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="lg:w-1/3">
        {selectedMentor ? (
          <MentorDetails mentor={selectedMentor} />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 rounded-lg p-6">
            <p className="text-gray-600 text-center">
              Select a mentor to view available time slots and book an
              appointment.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
export default MentorBrowser;

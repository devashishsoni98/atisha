import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";

import AvailabilityCalendar from "./AvailabilityCalendar.jsx";
import { fetchCounselorSlots } from "../../api/CounselorBookingApi.jsx";
import { bookSlot } from "../../api/CounselorBookingApi.jsx";
import { useSelector } from "react-redux";
import { useNotification } from "../../hooks/useNotifications.jsx";

const CounselorCard = ({ counselor, onSelect }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
    >
      <div className="p-6  ">
        <div className="flex items-start space-x-4">
          <img
            src={counselor.counselor_personal_info?.image || "/placeholder.svg"}
            alt={`${counselor.name}'s profile picture`}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-grow space-y-2">
            <h3 className="text-xl font-semibold  ">{counselor.name}</h3>
            <p className="text-sm text-gray-600 mb-2 ">
              <span className="bg-gray-300 px-2 py-1 rounded-full">{counselor.counselor_professional?.counselor_speciality}</span>

            </p>
            <div className="flex flex-wrap gap-2 mb-2 ">
              {counselor.counselor_professional?.career_specialization
                .slice(0, 3)
                .map((exp, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-200 rounded-full "
                  >
                    {exp}
                  </span>
                ))}
            </div>
            <p className="text-sm text-gray-600 font-bold">
              Experience: {counselor.counselor_professional?.year_of_experience}{" "}
              years
            </p>
            <div className="flex items-start space-x-2 line-clamp-2 h-[3rem] overflow-hidden border-2 border-transparent backdrop-blur-md bg-white bg-opacity-50  ">

              {counselor.counselor_professional?.bio}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

const CounselorDetails = ({counselor}) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookingHistory, setBookingHistory] = useState([]);
  const {addNotification} = useNotification();

  const studentId = useSelector((state) => state.user.id) || localStorage.getItem('userId') ;

  useEffect(() => {
    async function loadSlots() {
      setLoading(true);
      try {
        const slotsData = await fetchCounselorSlots(counselor.id);
        setAvailableSlots(slotsData.available_slots || []);
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSlots();
  }, [counselor]);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setIsDialogOpen(true);
  };

  const handleBookingConfirm = async () => {
    if (selectedSlot) {
      setLoading(true);
      // console.log(selectedSlot);
      try {
        const response = await bookSlot(studentId, selectedSlot.id);

        if (response.message == "Booking request sent") {
          addNotification("Booking request sent","success");
          setIsDialogOpen(false);
          return;
        }

        if (response.error === "Slot not available") {
          addNotification(
            "Sorry, this slot is no longer available. Please choose another slot.","info"
          );
          setIsDialogOpen(false);
          return;
        } else if (
          response.error === "Student has already booked a slot on this date."
        ) {
          addNotification(
            "You have already booked a slot on this date. Please choose a different date.","info"
          );
          setIsDialogOpen(false);
          return;
        } else {
          addNotification("Failed to book the slot. Please try again.", "error");
          setIsDialogOpen(false);
        }

        if (response.status === 201) {
          const newBooking = {
            id: response.data.response.id,
            counselor: counselor.name,
            date: new Date(response.data.response.date).toLocaleDateString(),
            time: new Date(
              response.data.response.start_time
            ).toLocaleTimeString(),
            status: response.data.response.status,
          };
          setBookingHistory((prev) => [newBooking, ...prev]);
          addNotification("Booking request sent successfully!","success");

          // Refresh available slots after booking
          const updatedSlots = await fetchCounselorSlots(counselor.id);
          setAvailableSlots(updatedSlots.available_slots || []);
        } else {
          addNotification("An unexpected error occurred. Please try again.","error");
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
      <h2 className="text-2xl font-semibold mb-4">{counselor?.name}</h2>
      <p className="text-gray-600 mb-6">
        {counselor.counselor_professional.counselor_speciality}
      </p>

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
            className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-4">Confirm Booking</h3>
              <p className="mb-4">
                Do you want to book a session with {counselor.name} on{" "}
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
                <p className="font-semibold">{booking.counselor}</p>
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

const CounselorListings = ({ counselors, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExpertise, setFilterExpertise] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [selectedCounselor, setSelectedCounselor] = useState(null);

  const filteredCounselors = counselors.filter(
    (counselor) =>
      counselor.name?.toLowerCase().includes(searchTerm?.toLowerCase()) &&
      (filterExpertise === "" ||
        counselor.counselor_professional.career_specialization.includes(
          filterExpertise
        )) &&
      (filterLanguage === "" ||
        (counselor.counselor_personal_info.languages &&
          counselor.counselor_personal_info.languages.includes(filterLanguage)))
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <section className="lg:w-2/3">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search counselors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/*<select*/}
          {/*  value={filterExpertise}*/}
          {/*  onChange={(e) => setFilterExpertise(e.target.value)}*/}
          {/*  className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
          {/*>*/}
          {/*  <option value="">All Expertise</option>*/}
          {/*  <option value="Career Planning">Career Planning</option>*/}
          {/*  <option value="Study Skills">Study Skills</option>*/}
          {/*  <option value="Stress Management">Stress Management</option>*/}
          {/*  <option value="Cultural Adjustment">Cultural Adjustment</option>*/}
          {/*</select>*/}
          {/*<select*/}
          {/*  value={filterLanguage}*/}
          {/*  onChange={(e) => setFilterLanguage(e.target.value)}*/}
          {/*  className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
          {/*>*/}
          {/*  <option value="">All Languages</option>*/}
          {/*  <option value="English">English</option>*/}
          {/*  <option value="Spanish">Spanish</option>*/}
          {/*  <option value="Mandarin">Mandarin</option>*/}
          {/*  <option value="French">French</option>*/}
          {/*</select>*/}
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredCounselors.map((counselor) => (
            <motion.div
              key={counselor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CounselorCard
                counselor={counselor}
                onSelect={() => setSelectedCounselor(counselor)}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="lg:w-1/3">
        {selectedCounselor ? (
          <CounselorDetails counselor={selectedCounselor} />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 rounded-lg p-6">
            <p className="text-gray-600 text-center">
              Select a counselor to view available time slots and book an
              appointment.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CounselorListings;

import {useEffect, useState} from 'react'
import {Clock, Star} from 'lucide-react'
import {AnimatePresence, motion} from "framer-motion"
import {
    fetchCounselorsData,
    fetchCounselorSlots,
    bookSlot,
    fetchStudentBookings
} from "../api/StudentCounselorBooking.jsx"
import {useSelector} from "react-redux";
import {fetchSessionByStudentId} from "../api/CounselorBookingApi.jsx";
import CounselorCalendar from "../components/ConselorCalendar.jsx";


const CounselorCard = ({counselor, similarityScore, onSelect}) => (
    <motion.div
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        whileHover={{scale: 1.03}}
        whileTap={{scale: 0.98}}
        onClick={() => onSelect(counselor)}
    >
        <div className="p-6">
            <div className="flex items-start">
                <img
                    src={counselor.counselor_personal_info?.image || "/placeholder.svg"}
                    alt={`${counselor.name}'s profile picture`}
                    width={80}
                    height={80}
                    className="rounded-full mr-4"
                />
                <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{counselor.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{counselor.counselor_professional?.counselor_speciality}</p>
                    <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 text-yellow-400 mr-1"/>
                        <span className="text-sm font-medium">{similarityScore?.toFixed(2)}</span>
                        <span className="text-sm tex    t-gray-500 ml-1">similarity score</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {counselor.counselor_professional?.career_specialization.slice(0, 3).map((exp, index) => (
                            <span key={index}
                                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{exp}</span>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600">Experience: {counselor.counselor_professional?.year_of_experience} years</p>
                </div>
            </div>
        </div>
    </motion.div>
);


const ConfirmationDialog = ({isOpen, onClose, counselor, date, time, onConfirm}) => (
    isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Confirm Appointment</h2>
                <p className="mb-4">
                    You are booking a session with {counselor?.name} on {date} at {time}.
                </p>
                <div className="flex justify-end space-x-2">
                    <button className="px-4 py-2 border rounded" onClick={onClose}>Cancel</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onConfirm}>Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    )
)

const StudentSessionCard = ({session}) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Session with {session.counselor?.name}</h3>
                <span className={`px-2 py-1 rounded text-sm ${
                    session.status === 'approved' ? 'bg-green-100 text-green-800' :
                        session.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                }`}>
                    {session.status}
                </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
                {new Date(session.date).toLocaleDateString()} at {new Date(session.start_time).toLocaleTimeString()}
            </p>
        </div>
    );
};

const StudentRequestCard = ({request}) => (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{request.counselor}</h3>
            <span className={`px-2 py-1 rounded text-sm ${
                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
            }`}>
                {request.status}
            </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">
            {new Date(request.date).toLocaleDateString()} at {new Date(request.start_time).toLocaleTimeString()}
        </p>
    </div>
);


export default function StudentCounselorBrowsing() {
    const [counselors, setCounselors] = useState([])
    const [selectedCounselor, setSelectedCounselor] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedTime, setSelectedTime] = useState(null)
    const [availableSlots, setAvailableSlots] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterExpertise, setFilterExpertise] = useState('')
    const [filterLanguage, setFilterLanguage] = useState('')
    const [activeTab, setActiveTab] = useState('browse')
    const [studentSessions, setStudentSessions] = useState([])
    const [studentRequests, setStudentRequests] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Dummy student ID for demonstration
    const studentId = useSelector((state) => state.user.id || localStorage.getItem('userId'));

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await fetchSessionByStudentId(studentId);
                setStudentSessions(response); // Assuming response is an array of sessions
            } catch (err) {
                setError('Failed to fetch sessions');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSessionData();
    }, [studentId]);

    useEffect(() => {
        async function loadData() {
            const counselorsData = await fetchCounselorsData()
            if (counselorsData) {

                console.log("counselor: ", counselorsData)
                setCounselors(counselorsData)
            } else {
                setCounselors([
                    {
                        id: 1,
                        name: "Dr. Jane Doe",
                        counselor_personal_info: {image: "/placeholder.svg"},
                        counselor_professional: {
                            counselor_speciality: "Career Counseling",
                            year_of_experience: 10,
                            career_specialization: ["Software Engineering", "Data Science"]
                        },
                        similarityScore: 0.95
                    },
                    // Add more dummy counselors if needed
                ])
            }

            const bookingsData = await fetchStudentBookings(studentId)
            if (bookingsData) {
                setStudentSessions(bookingsData.filter(booking => booking.status === 'approved' || booking.status === 'completed'))
                setStudentRequests(bookingsData.filter(booking => booking.status === 'pending'))
            } else {
                setStudentSessions([
                    {
                        id: 1,
                        counselor: 'Dr. Emily Smith',
                        date: '2024-06-20',
                        start_time: '10:00:00',
                        status: 'approved'
                    },
                    // Add more dummy sessions if needed
                ])
                setStudentRequests([
                    {id: 2, counselor: 'Dr. John Doe', date: '2024-06-22', start_time: '14:00:00', status: 'pending'},
                    // Add more dummy requests if needed
                ])
            }
        }

        loadData()
    }, [])


    const filteredCounselors = counselors.filter(counselor =>
        counselor.name?.toLowerCase().includes(searchTerm?.toLowerCase()) &&
        (filterExpertise === '' || counselor.counselor_professional.career_specialization.includes(filterExpertise)) &&
        (filterLanguage === '' || (counselor.counselor_personal_info.languages && counselor.counselor_personal_info.languages.includes(filterLanguage)))
    )


    useEffect(() => {
        const loadSlots = async () => {
            if (selectedCounselor) {
                setLoading(true);
                try {
                    const slotsData = await fetchCounselorSlots(selectedCounselor.id);
                    if (slotsData && Array.isArray(slotsData.available_slots)) {
                        setAvailableSlots(slotsData.available_slots.map(slot => ({
                            id: slot.id,
                            time: new Date(slot.start_time).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            }),
                            start_time: slot.start_time,
                            end_time: slot.end_time,
                            available: true
                        })));
                    } else {
                        console.warn('Invalid slots data received:', slotsData);
                        setAvailableSlots([]);
                    }
                } catch (error) {
                    console.error('Error fetching slots:', error);
                    setError('Failed to load available slots. Please try again later.');
                } finally {
                    setLoading(false);
                }
            }
        };

        loadSlots();
    }, [selectedCounselor]);

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleBookingOpen = () => {
        setIsDialogOpen(true);
    };

    // const handleBookingConfirm = async ({slot}) => {
    //     if (slot) {
    //         console.log("slot: ", slot)
    //         setLoading(true);
    //         try {
    //             const result = await bookSlot(studentId, slot.id);
    //             if (result.success) {
    //                 const newBooking = {
    //                     id: result.id,
    //                     counselor: selectedCounselor.name,
    //                     date: new Date(<slot></slot>.start_time).toLocaleDateString(),
    //                     time: new Date(slot.start_time).toLocaleTimeString(),
    //                 };
    //                 setBookingHistory(prev => [newBooking, ...prev]);
    //                 alert('Booking confirmed successfully!');
    //                 // Refresh available slots after booking
    //                 const updatedSlots = await fetchCounselorSlots(selectedCounselor.id);
    //                 setAvailableSlots(updatedSlots.available_slots);
    //             } else {
    //                 alert('Failed to book the slot. Please try again.');
    //             }
    //         } catch (error) {
    //             console.error('Error during booking:', error);
    //             alert('An error occurred while booking. Please try again.');
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     setIsDialogOpen(false);
    //     // setSelectedSlot(null);
    // };



    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
        setIsDialogOpen(true);
    };


    const handleBookingConfirm = async () => {
        if (selectedSlot) {
            setLoading(true);
            console.log("selectedSlot: ", selectedSlot)
            try {
                const result = await bookSlot(studentId, selectedSlot.id);
                if (result.status === 200) {
                    const newBooking = {
                        id: result.bookingId,
                        counselor: selectedCounselor.name,
                        date: new Date(selectedSlot.start_time).toLocaleDateString(),
                        time: new Date(selectedSlot.start_time).toLocaleTimeString(),
                    };
                    setBookingHistory(prev => [newBooking, ...prev]);
                    alert('Booking confirmed successfully!');
                    // Refresh available slots after booking
                    const updatedSlots = await fetchCounselorSlots(selectedCounselor.id);
                    setAvailableSlots(updatedSlots.available_slots);
                } else {
                    alert(result?.data);
                }
            } catch (error) {
                console.error('Error during booking:', error);
                // alert('An error occurred while booking. Please try again.');
            } finally {
                setLoading(false);
            }
        }
        setIsDialogOpen(false);
        setSelectedSlot(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-blue-600 text-white py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold">Student Counseling Portal</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8 flex space-x-4">
                    <button
                        className={`px-4 py-2 rounded-lg ${activeTab === 'browse' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setActiveTab('browse')}
                    >
                        Browse Counselors
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${activeTab === 'sessions' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setActiveTab('sessions')}
                    >
                        My Sessions
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${activeTab === 'requests' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setActiveTab('requests')}
                    >
                        My Requests
                    </button>
                </div>

                {activeTab === 'browse' && (
                    <div className="flex flex-col md:flex-row gap-8">
                        <section className="md:w-2/3">
                            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                                <input
                                    type="text"
                                    placeholder
                                        ="Search counselors..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                />
                                <select
                                    value={filterExpertise}
                                    onChange={(e) => setFilterExpertise(e.target.value)}
                                    className="w-full sm:w-[180px] p-2 border rounded"
                                >
                                    <option value="">All Expertise</option>
                                    <option value="Career Planning">Career Planning</option>
                                    <option value="Study Skills">Study Skills</option>
                                    <option value="Stress Management">Stress Management</option>
                                    <option value="Cultural Adjustment">Cultural Adjustment</option>
                                </select>
                                <select
                                    value={filterLanguage}
                                    onChange={(e) => setFilterLanguage(e.target.value)}
                                    className="w-full sm:w-[180px] p-2 border rounded"
                                >
                                    <option value="">All Languages</option>
                                    <option value="English">English</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="Mandarin">Mandarin</option>
                                    <option value="French">French</option>
                                </select>
                            </div>
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{staggerChildren: 0.1}}
                            >
                                {filteredCounselors.map((counselor) => (
                                    <motion.div
                                        key={counselor.id}
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                    >
                                        <CounselorCard
                                            counselor={counselor}
                                            similarityScore={counselor.similarityScore}
                                            onSelect={setSelectedCounselor}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </section>

                        <section className="md:w-1/3">
                            {selectedCounselor ? (

                                <div className="container mx-auto p-4">

                                    {selectedCounselor && (
                                        <motion.div
                                            initial={{opacity: 0, y: 20}}
                                            animate={{opacity: 1, y: 0}}
                                            className="mb-6"
                                        >
                                            <h2 className="text-3xl font-bold mb-6">{selectedCounselor.name}</h2>
                                            <p className="text-gray-600">{selectedCounselor.specialization}</p>
                                        </motion.div>
                                    )}

                                    {selectedCounselor && (
                                        <CounselorCalendar
                                            availableSlots={availableSlots}
                                            loading={loading}
                                            onSelect={handleSlotSelect}
                                        />
                                    )}

                                    <AnimatePresence>
                                        {isDialogOpen && (
                                            <motion.div
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1}}
                                                exit={{opacity: 0}}
                                                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                                            >
                                                <motion.div
                                                    initial={{y: -50, opacity: 0}}
                                                    animate={{y: 0, opacity: 1}}
                                                    exit={{y: 50, opacity: 0}}
                                                    className="bg-white p-6 rounded-lg shadow-xl"
                                                >
                                                    <h3 className="text-xl font-semibold mb-4">Confirm Booking</h3>
                                                    <p className="mb-4">
                                                        Do you want to book a session
                                                        with {selectedCounselor.name} on{' '}
                                                        {new Date(selectedSlot.start_time).toLocaleString()}?
                                                    </p>
                                                    <div className="flex justify-end space-x-4">
                                                        <button
                                                            onClick={() => setIsDialogOpen(false)}
                                                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={handleBookingConfirm}
                                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                                            disabled={loading}
                                                        >
                                                            {loading ? 'Booking...' : 'Confirm Booking'}
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {bookingHistory.length > 0 && (
                                        <motion.div
                                            initial={{opacity: 0, y: 20}}
                                            animate={{opacity: 1, y: 0}}
                                            className="mt-8"
                                        >
                                            <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
                                            <ul className="space-y-2">
                                                {bookingHistory.map((booking) => (
                                                    <motion.li
                                                        key={booking.id}
                                                        initial={{opacity: 0, x: -20}}
                                                        animate={{opacity: 1, x: 0}}
                                                        className="bg-gray-100 p-4 rounded-lg"
                                                    >
                                                        <p className="font-semibold">{booking.counselor}</p>
                                                        <p>{booking.date} at {booking.time}</p>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg p-6">
                                    <p className="text-gray-500 text-lg text-center">Select a counselor to view
                                        available time slots and book an appointment.</p>
                                </div>
                            )}
                        </section>
                    </div>
                )}

                {activeTab === 'sessions' && (
                    <section className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4">My Sessions</h2>
                        {studentSessions.length > 0 ? (
                            studentSessions.map(session => (
                                <StudentSessionCard key={session.id} session={session}/>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">You don't have any sessions yet.</p>
                        )}
                    </section>
                )}

                {/*{activeTab === 'requests' && (*/}
                {/*    <section className="bg-white p-6 rounded-lg shadow-sm">*/}
                {/*        <h2 className="text-2xl font-semibold mb-4">My Requests</h2>*/}
                {/*        {studentRequests.length > 0 ? (*/}
                {/*            studentRequests.map(request => (*/}
                {/*                <StudentRequestCard key={request.id} request={request}/>*/}
                {/*            ))*/}
                {/*        ) : (*/}
                {/*            <p className="text-gray-500 text-center">You don't have any pending requests.</p>*/}
                {/*        )}*/}
                {/*    </section>*/}
                {/*)}*/}
            </main>

            {/*<ConfirmationDialog*/}
            {/*    isOpen={isDialogOpen}*/}
            {/*    onClose={() => setIsDialogOpen(false)}*/}
            {/*    counselor={selectedCounselor}*/}
            {/*    date={selectedDate.toDateString()}*/}
            {/*    time={selectedTime}*/}
            {/*    onConfirm={handleBookingConfirm}*/}
            {/*/>*/}
        </div>
    )
}


import {useEffect, useState} from 'react';
import {Clock, CheckCircle, XCircle, ChevronRight, ChevronLeft, Search, Plus,} from 'lucide-react';
import axios from "axios";

export const TimeSlot = ({time, isAvailable, onToggle}) => (
    <button
        className={`w-full justify-start p-2 rounded ${isAvailable ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={onToggle}
    >
        <Clock className="mr-2 h-4 w-4 inline"/>
        {time}
    </button>
);

export const BookingRequest = ({student, date, time, course, reason, onApprove, onReject}) => (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold">Booking Request</h3>
        <p className="text-sm text-gray-500">{date} at {time}</p>
        <div className="flex items-center space-x-4 my-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                {student[0]}
            </div>
            <div>
                <p className="font-medium">{student}</p>
                <p className="text-sm text-gray-500">{course}</p>
            </div>
        </div>
        <p className="text-sm text-gray-700 mb-2"><strong>Reason:</strong> {reason}</p>
        <div className="flex justify-end space-x-2 mt-4">
            <button className="px-3 py-1 border rounded" onClick={onReject}>
                <XCircle className="mr-2 h-4 w-4 inline"/>
                Reject
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={onApprove}>
                <CheckCircle className="mr-2 h-4 w-4 inline"/>
                Approve
            </button>
        </div>
    </div>
);

export const ExistingBooking = ({student, date, time, course, status, notes}) => (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold">Booking</h3>
        <p className="text-sm text-gray-500">{date} at {time}</p>
        <div className="flex items-center justify-between my-4">
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    {student[0]}
                </div>
                <div>
                    <p className="font-medium">{student}</p>
                    <p className="text-sm text-gray-500">{course}</p>
                </div>
            </div>
            <span
                className={`px-2 py-1 rounded text-sm ${status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
        </div>
        {notes && <p className="text-sm text-gray-700"><strong>Notes:</strong> {notes}</p>}
        <button className="w-full mt-4 px-3 py-1 border rounded">View Details</button>
    </div>
);



export const AvailabilityComponent = () => {
    const [availability, setAvailability] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleFetchAvailability = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/counselor-booking/get_availability/11');
            console.log('Availability fetched successfully:', response.data);
            setAvailability(response.data.available_slots);
        } catch (error) {
            console.error('Error fetching availability:', error);
        }
    };

    useEffect(() => {
        handleFetchAvailability();
    }, []);

    const groupedAvailability = availability.reduce((acc, slot) => {
        const date = new Date(slot.date).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(slot);
        return acc;
    }, {});

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
        setIsDialogOpen(true);
    };

    const handleConfirmBooking = () => {
        // Implement booking logic here
        console.log('Booking confirmed for slot:', selectedSlot);
        setIsDialogOpen(false);
    };

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Available Slots</h2>
            <button
                onClick={handleFetchAvailability}
                className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Refresh Availability
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(groupedAvailability).map(([date, slots]) => (
                    <div key={date} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">{date}</h3>
                        <ul className="space-y-2">
                            {slots.map((slot) => (
                                <li key={slot.id}>
                                    <button
                                        onClick={() => handleSlotClick(slot)}
                                        className="w-full text-left py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {isDialogOpen && selectedSlot && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-xl font-bold mb-4">Confirm Booking</h3>
                        <p className="mb-4">
                            Date: {new Date(selectedSlot.date).toLocaleDateString()}
                            <br />
                            Time: {formatTime(selectedSlot.start_time)} - {formatTime(selectedSlot.end_time)}
                        </p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmBooking}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};





const CounselorDashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availability, setAvailability] = useState({});
    const [bookingRequests, setBookingRequests] = useState([]);
    const [existingBookings, setExistingBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('availability');
    const [bookingFilter, setBookingFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newAvailability, setNewAvailability] = useState({
        date: '',
        start_time: '',
        end_time: ''
    });

    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [requestsResponse, bookingsResponse, availabilityResponse] = await Promise.all([
                    axios.get('/api/bookingRequests'),
                    axios.get('/api/existingBookings'),
                    axios.get('/api/availability')
                ]);

                setBookingRequests(Array.isArray(requestsResponse.data) ? requestsResponse.data : []);
                setExistingBookings(Array.isArray(bookingsResponse.data) ? bookingsResponse.data : []);
                setAvailability(availabilityResponse.data || {});
            } catch (error) {
                console.error('Error fetching data:', error);
                setBookingRequests([]);
                setExistingBookings([]);
                setAvailability({});
            }
        };

        fetchData();
    }, []);

    const toggleAvailability = (date, time) => {
        setAvailability(prev => ({
            ...prev,
            [date]: {
                ...prev[date],
                [time]: !prev[date]?.[time]
            }
        }));
    };

    const handleApproveBooking = (id) => {
        setBookingRequests(prev => prev.filter(request => request.id !== id));
        const approvedRequest = bookingRequests.find(request => request.id === id);
        if (approvedRequest) {
            setExistingBookings(prev => [
                ...prev,
                {...approvedRequest, status: 'Approved'}
            ]);
        }
    };

    const handleRejectBooking = (id) => {
        setBookingRequests(prev => prev.filter(request => request.id !== id));
    };

    const filteredBookings = existingBookings.filter(booking =>
        (bookingFilter === 'all' || booking.status.toLowerCase() === bookingFilter) &&
        (booking.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.course.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleAddAvailability = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/counselor-booking/set_availability', {
                counselor_id: 11, // Hardcoded for this example
                ...newAvailability
            });

            console.log('Availability added successfully:', response.data);
            setAvailability(prev => ({
                ...prev,
                [newAvailability.date]: {
                    ...prev[newAvailability.date],
                    [newAvailability.start_time]: true,
                    [newAvailability.end_time]: true
                }
            }));
            setIsDialogOpen(false);
            setNewAvailability({date: '', start_time: '', end_time: ''});
        } catch (error) {
            console.error('Error adding availability:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-blue-600 text-white py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold">Counselor Dashboard</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    {['availability', 'requests', 'bookings'].map((tab) => (
                        <button
                            key={tab}
                            className={`mr-4 pb-2 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {activeTab === 'availability' && (
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Define Your Availability</h2>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                <Plus className="mr-2" size={16}/>
                                Add Availability
                            </button>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <button className="p-2"
                                    onClick={() => setSelectedDate(prev => new Date(prev.setDate(prev.getDate() - 1)))}>
                                <ChevronLeft className="h-6 w-6"/>
                            </button>
                            <h3 className="text-lg font-semibold">
                                {selectedDate.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </h3>
                            <button className="p-2"
                                    onClick={() => setSelectedDate(prev => new Date(prev.setDate(prev.getDate() + 1)))}>
                                <ChevronRight className="h-6 w-6"/>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {timeSlots.map(time => (
                                <AvailabilityComponent/>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'requests' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Booking Requests</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bookingRequests.map(request => (
                                <BookingRequest
                                    key={request.id}
                                    {...request}
                                    onApprove={() => handleApproveBooking(request.id)}
                                    onReject={() => handleRejectBooking(request.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'bookings' && (
                    <div>
                        <div
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <h2 className="text-2xl font-bold">Existing Bookings</h2>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <select
                                    value={bookingFilter}
                                    onChange={(e) => setBookingFilter(e.target.value)}
                                    className="border rounded p-2"
                                >
                                    <option value="all">All Bookings</option>
                                    <option value="approved">Approved</option>
                                    <option value="pending">Pending</option>
                                </select>
                                <div className="relative">
                                    <Search
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                                    <input
                                        type="text"
                                        placeholder="Search bookings..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border rounded"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBookings.map(booking => (
                                <ExistingBooking key={booking.id} {...booking} />
                            ))}
                        </div>
                    </div>
                )}

                {isDialogOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4">Add Availability</h2>
                            <form onSubmit={handleAddAvailability}>
                                <div className="mb-4">
                                    <label htmlFor="date"
                                           className="block text-sm font-medium text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        id="date"
                                        value={newAvailability.date}
                                        onChange={(e) => setNewAvailability(prev => ({
                                            ...prev,
                                            date: e.target.value
                                        }))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="start_time"
                                           className="block text-sm font-medium text-gray-700">Start
                                        Time</label>
                                    <input
                                        type="time"
                                        id="start_time"
                                        value={newAvailability.start_time}
                                        onChange={(e) => setNewAvailability(prev => ({
                                            ...prev,
                                            start_time: e.target.value
                                        }))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="end_time"
                                           className="block text-sm font-medium text-gray-700">End
                                        Time</label>
                                    <input
                                        type="time"
                                        id="end_time"
                                        value={newAvailability.end_time}
                                        onChange={(e) => setNewAvailability(prev => ({
                                            ...prev,
                                            end_time: e.target.value
                                        }))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsDialogOpen(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CounselorDashboard;




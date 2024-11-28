import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchAvailability, setAvailability } from '../../api/MentorBookingApi.jsx';
import { formatTime, formatDate } from '../../utils/dateUtils.jsx';

export const Availability = ({ mentorId }) => {
    const [availability, setAvailabilityState] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newAvailability, setNewAvailability] = useState({
        date: '',
        start_time: '',
        end_time: ''
    });

    useEffect(() => {
        fetchAvailability(mentorId).then(setAvailabilityState);
    }, [mentorId]);

    const handleAddAvailability = async (e) => {
        e.preventDefault();
        try {
            const response = await setAvailability(mentorId, newAvailability.date, newAvailability.start_time, newAvailability.end_time);
            console.log('Availability added:', response);
            fetchAvailability(mentorId).then(setAvailabilityState);
            setIsDialogOpen(false);
            setNewAvailability({ date: '', start_time: '', end_time: '' });
        } catch (error) {
            console.error('Error adding availability:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Define Your Availability</h2>
                <button
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Add Availability
                </button>
            </div>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {availability.map((slot) => (
                    <motion.div
                        key={slot.id}
                        className="bg-gray-100 p-4 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <p className="font-semibold">{formatDate(slot.date)}</p>
                        <p>{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</p>
                    </motion.div>
                ))}
            </motion.div>
            {isDialogOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white p-6 rounded-lg w-full max-w-md"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <h2 className="text-xl font-bold mb-4">Add Availability</h2>
                        <form onSubmit={handleAddAvailability}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="date" className="text-right">
                                        Date
                                    </label>
                                    <input
                                        id="date"
                                        type="date"
                                        className="col-span-3 p-2 border rounded"
                                        value={newAvailability.date}
                                        onChange={(e) => setNewAvailability(prev => ({ ...prev, date: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="start_time" className="text-right">
                                        Start Time
                                    </label>
                                    <input
                                        id="start_time"
                                        type="time"
                                        className="col-span-3 p-2 border rounded"
                                        value={newAvailability.start_time}
                                        onChange={(e) => setNewAvailability(prev => ({ ...prev, start_time: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="end_time" className="text-right">
                                        End Time
                                    </label>
                                    <input
                                        id="end_time"
                                        type="time"
                                        className="col-span-3 p-2 border rounded"
                                        value={newAvailability.end_time}
                                        onChange={(e) => setNewAvailability(prev => ({ ...prev, end_time: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsDialogOpen(false)}
                                    className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};


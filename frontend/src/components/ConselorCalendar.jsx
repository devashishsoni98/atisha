
import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import {useSelector} from "react-redux";

const groupSlotsByDate = (slots) => {
    if (!slots || slots.length === 0) {
        console.warn('No slots provided to groupSlotsByDate');
        return {};
    }

    const grouped = {};
    slots.forEach(slot => {
        if (!slot || (!slot.start_time && !slot.time)) {
            console.warn('Invalid slot encountered:', slot);
            return;
        }

        try {
            const slotTime = slot.start_time ? new Date(slot.start_time) : new Date(`2000-01-01 ${slot.time}`);
            const date = format(slotTime, 'yyyy-MM-dd');
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push({
                id: slot.id,
                time: format(slotTime, 'HH:mm'),
                start_time: slot.start_time || `2000-01-01 ${slot.time}`,
                end_time: slot.end_time || null,
                available: slot.available !== undefined ? slot.available : true
            });
        } catch (error) {
            console.error('Error processing slot:', slot, error);
        }
    });

    return grouped;
};

const CounselorCalendar = ({ availableSlots, loading,  onSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const studentId = useSelector((state) => state.user.id || localStorage.getItem('userId'));

    const slotsByDate = groupSlotsByDate(availableSlots);
    console.log(slotsByDate);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setIsDropdownOpen(true);
    };

    const handlePrevMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
        setSelectedDate(null);
        setIsDropdownOpen(false);
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
        setSelectedDate(null);
        setIsDropdownOpen(false);
    };

    return (
        <div className="grid space-x-4">
            <div className="m-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
                        <div className="flex space-x-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handlePrevMonth}
                                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleNextMonth}
                                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                            >
                                <ChevronRight size={24} />
                            </motion.button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center font-bold">{day}</div>
                        ))}
                        {monthDays.map(day => {
                            const dateKey = format(day, 'yyyy-MM-dd');
                            const hasSlots = slotsByDate[dateKey] && slotsByDate[dateKey].length > 0;
                            return (
                                <motion.div
                                    key={day.toString()}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleDateClick(day)}
                                    className={`
                                        p-2 border rounded-lg cursor-pointer text-center
                                        ${!isSameMonth(day, currentDate) ? 'text-gray-300' : ''}
                                        ${hasSlots ? 'bg-blue-100 hover:bg-blue-200' : 'bg-gray-100'}
                                        ${isSameDay(day, selectedDate) ? 'ring-2 ring-blue-500' : ''}
                                    `}
                                >
                                    {format(day, 'd')}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="w-full">
                <AnimatePresence>
                    {isDropdownOpen && selectedDate && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg shadow-lg p-4"
                        >
                            <h3 className="text-xl font-semibold mb-2">
                                Available Slots for {format(selectedDate, 'MMMM d, yyyy')}
                            </h3>
                            {slotsByDate[format(selectedDate, 'yyyy-MM-dd')] ? (
                                <div className="grid grid-cols-2 gap-2">
                                    {slotsByDate[format(selectedDate, 'yyyy-MM-dd')].map(slot => (

                                        <motion.button
                                            key={slot.id}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => slot.available && onSelect(slot)}
                                            className={`p-2 border rounded-lg shadow text-left ${
                                                slot.available ? 'bg-blue-50 hover:bg-blue-100' : 'bg-gray-200 cursor-not-allowed'
                                            }`}
                                            disabled={!slot.available}
                                        >
                                            <Clock className="inline-block mr-2 h-4 w-4" />

                                            {slot.time}
                                            {!slot.available && <span className="ml-2 text-xs text-red-500">(Unavailable)</span>}
                                        </motion.button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">No available slots for this date.</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CounselorCalendar;

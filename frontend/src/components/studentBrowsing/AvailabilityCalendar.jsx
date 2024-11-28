import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

const AvailabilityCalendar =({ availableSlots, loading, onSelect }) =>{
    const [selectedDate, setSelectedDate] = useState(new Date())

    const slotsForSelectedDate = availableSlots.filter(slot =>
        new Date(slot.start_time).toDateString() === selectedDate.toDateString()
    )

    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay()

    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    const datesWithSlots = useMemo(() => {
        const dates = new Map()
        availableSlots.forEach(slot => {
            const date = new Date(slot.start_time)
            const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
            if (!dates.has(key)) {
                dates.set(key, true)
            }
        })
        return dates
    }, [availableSlots])

    const goToPreviousMonth = () => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))
    }

    const goToNextMonth = () => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={goToPreviousMonth}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                    &lt;
                </button>
                <h3 className="text-lg font-semibold">
                    {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                    onClick={goToNextMonth}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                    &gt;
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold">{day}</div>
                ))}
                {Array(firstDayOfMonth).fill(null).map((_, index) => (
                    <div key={`empty-${index}`} />
                ))}
                {calendarDays.map(day => (
                    <motion.button
                        key={day}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                        className={`p-2 rounded-full ${
                            selectedDate.getDate() === day &&
                            selectedDate.getMonth() === selectedDate.getMonth() &&
                            selectedDate.getFullYear() === selectedDate.getFullYear()
                                ? 'bg-blue-500 text-white'
                                : datesWithSlots.has(`${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${day}`)
                                    ? 'bg-green-200 hover:bg-green-300'
                                    : 'hover:bg-gray-200'
                        }`}
                    >
                        {day}
                    </motion.button>
                ))}
            </div>
            <div className="mt-4 flex items-center justify-center space-x-4">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-200 rounded-full mr-2"></div>
                    <span className="text-sm">Available Slots</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Selected Date</span>
                </div>
            </div>
            <div className="mt-4">
                <h4 className="font-semibold mb-2">Available Slots</h4>
                {loading ? (
                    <p>Loading available slots...</p>
                ) : slotsForSelectedDate.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                        {slotsForSelectedDate.map(slot => (
                            <motion.button
                                key={slot.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onSelect(slot)}
                                className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                {new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </motion.button>
                        ))}
                    </div>
                ) : (
                    <p>No available slots for this date.</p>
                )}
            </div>
        </div>
    )
}

export default AvailabilityCalendar;
import React from 'react'
import { Clock, Plus, Minus } from 'lucide-react'

const AvailabilityTab =()=> {
    const availabilitySlots = [
        { day: "Monday", time: "09:00 AM - 11:00 AM" },
        { day: "Tuesday", time: "02:00 PM - 04:00 PM" },
        { day: "Thursday", time: "10:00 AM - 12:00 PM" },
        { day: "Friday", time: "03:00 PM - 05:00 PM" },
    ]

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-800">My Availability</h2>
            <div className="space-y-4">
                {availabilitySlots.map((slot, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-6 shadow-md flex items-center justify-between">
                        <div className="flex items-center">
                            <Clock className="mr-4 h-6 w-6 text-blue-500" />
                            <div>
                                <h3 className="text-lg font-semibold text-blue-700">{slot.day}</h3>
                                <p className="text-sm text-gray-600">{slot.time}</p>
                            </div>
                        </div>
                        <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                            <Minus className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
            <button className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                <Plus className="mr-2 h-4 w-4" />
                Add New Availability Slot
            </button>
        </div>
    )
}


export default AvailabilityTab
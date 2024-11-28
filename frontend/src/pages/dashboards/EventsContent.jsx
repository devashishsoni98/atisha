import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
};

export function EventsContent() {
  const [invitations, setInvitations] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulated API calls
    const fetchInvitations = async () => {
      // Replace with actual API call
      const response = await new Promise(resolve => setTimeout(() => resolve([
        { id: 1, name: 'Career Fair 2024', date: '2024-03-15', organizer: 'University XYZ' },
        { id: 2, name: 'STEM Workshop', date: '2024-04-02', organizer: 'Tech Institute' },
        { id: 3, name: 'College Admissions Seminar', date: '2024-05-10', organizer: 'Education Board' },
      ]), 1000));
      setInvitations(response);
    };

    const fetchNotifications = async () => {
      // Replace with actual API call
      const response = await new Promise(resolve => setTimeout(() => resolve([
        { id: 1, title: 'Event Reminder', message: 'Career Fair 2024 is tomorrow!', date: '2024-03-14' },
        { id: 2, title: 'New Participant', message: 'John Doe has registered for your STEM Workshop', date: '2024-03-20' },
        { id: 3, title: 'Event Update', message: 'The venue for College Admissions Seminar has changed', date: '2024-04-01' },
      ]), 1000));
      setNotifications(response);
    };

    fetchInvitations();
    fetchNotifications();
  }, []);

  return (
    <motion.div
      className="space-y-6"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-6"
        variants={fadeIn}
      >
        Events
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white shadow-lg rounded-2xl overflow-hidden"
          variants={slideIn}
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Invitations</h2>
            <div className="space-y-4 px-2 max-h-96 overflow-y-auto">
              {invitations.map((event) => (
                <motion.div
                  key={event.id}
                  className="bg-blue-50 p-4 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-medium text-blue-700">{event.name}</h3>
                  <p className="text-sm text-gray-600">{event.organizer}</p>
                  <p className="text-sm text-gray-600">Date: {event.date}</p>
                  <div className="mt-2 space-x-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                      Accept
                    </button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                      Decline
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-2xl overflow-hidden"
          variants={slideIn}
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Notifications</h2>
            <div className="space-y-4 px-2 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  className="bg-blue-50 p-4 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-medium text-blue-700">{notification.title}</h3>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{notification.date}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="bg-white shadow-lg rounded-2xl overflow-hidden"
        variants={slideIn}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Request New Event</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
                Event Name
              </label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">
                Event Description
              </label>
              <textarea
                id="eventDescription"
                name="eventDescription"
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}


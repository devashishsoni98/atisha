import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import EventDetails from "./EventDetails.jsx";

// Simulated API calls
const getEventInvitations = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: 'Career Fair 2024', date: '2024-03-15', organizer: 'University XYZ' },
    { id: 2, name: 'STEM Workshop', date: '2024-04-02', organizer: 'Tech Institute' },
    { id: 3, name: 'College Admissions Seminar', date: '2024-05-10', organizer: 'Education Board' },
  ];
};

const getEventNotifications = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, title: 'Event Reminder', message: 'Career Fair 2024 is tomorrow!', date: '2024-03-14' },
    { id: 2, title: 'New Participant', message: 'John Doe has registered for your STEM Workshop', date: '2024-03-20' },
    { id: 3, title: 'Event Update', message: 'The venue for College Admissions Seminar has changed', date: '2024-04-01' },
  ];
};

export const EventInvitations = () => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    getEventInvitations().then(setInvitations);
  }, []);

  return (
    <div className="space-y-4">
      {invitations.map((event) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow rounded-lg overflow-hidden"
        >
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{event.name}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{event.organizer}</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Date</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{format(new Date(event.date), 'MMMM d, yyyy')}</dd>
              </div>
            </dl>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Decline
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Accept
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const EventNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getEventNotifications().then(setNotifications);
  }, []);

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow overflow-hidden sm:rounded-lg"
        >
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{notification.title}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{format(new Date(notification.date), 'MMMM d, yyyy')}</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Message</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{notification.message}</dd>
              </div>
            </dl>
          </div>
        </motion.div>
      ))}
    </div>
  );
};


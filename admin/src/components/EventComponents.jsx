import React, { useState } from 'react';
import { format } from 'date-fns';

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

  React.useEffect(() => {
    getEventInvitations().then(setInvitations);
  }, []);

  return (
    <div className="space-y-4">
      {invitations.map((event) => (
        <div key={event.id} className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{event.name}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{event.organizer}</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Date</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{event.date}</dd>
              </div>
            </dl>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between">
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Decline
            </button>
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Accept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export const EventNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  React.useEffect(() => {
    getEventNotifications().then(setNotifications);
  }, []);

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div key={notification.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{notification.title}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{notification.date}</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Message</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{notification.message}</dd>
              </div>
            </dl>
          </div>
        </div>
      ))}
    </div>
  );
};

export const EventRequestForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert('Event Request Submitted: Your request to organize an event has been sent for approval.');
    setEventName('');
    setEventDate('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
          Event Name
        </label>
        <input
          type="text"
          id="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          placeholder="Enter event name"
          required
        />
      </div>
      <div>
        <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
          Date of event
        </label>
        <input
          type="date"
          id="eventDate"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Event Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          placeholder="Describe the event you want to organize"
          required
        />
        <p className="mt-2 text-sm text-gray-500">
          Provide details about the event, its purpose, and any specific requirements.
        </p>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
};


// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
//
// const formSchema = z.object({
//   eventName: z.string().min(2, {
//     message: 'Event name must be at least 2 characters.',
//   }),
//   description: z.string().min(10, {
//     message: 'Description must be at least 10 characters.',
//   }),
//   eventType: z.string(),
//   eventMode: z.string(),
//   startDateTime: z.string(),
//   endDateTime: z.string(),
//   city: z.string().optional(),
//   state: z.string().optional(),
//   eventLink: z.string().url().optional(),
//   capacity: z.number().int().positive(),
//   organizer: z.string(),
// });
//
// export function EventCreationForm({ onClose }) {
//   const [eventMode, setEventMode] = useState('online');
//
//   const { register, handleSubmit, formState: { errors }, watch } = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       eventName: '',
//       description: '',
//       eventType: '',
//       eventMode: 'online',
//       capacity: 1,
//       organizer: '',
//     },
//   });
//
//   const watchEventMode = watch('eventMode');
//
//   function onSubmit(values) {
//     console.log(values);
//     // Add your form submission logic here
//     onClose();
//   }
//
//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <div>
//         <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
//         <input
//           id="eventName"
//           {...register('eventName')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//         {errors.eventName && <p className="mt-1 text-sm text-red-600">{errors.eventName.message}</p>}
//       </div>
//
//       <div>
//         <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//         <textarea
//           id="description"
//           {...register('description')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           rows="3"
//         ></textarea>
//         {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
//       </div>
//
//       <div className="flex space-x-4">
//         <div className="flex-1">
//           <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">Event Type</label>
//           <select
//             id="eventType"
//             {...register('eventType')}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           >
//             <option value="">Select event type</option>
//             <option value="session">Session</option>
//             <option value="webinar">Webinar</option>
//             <option value="workshop">Workshop</option>
//           </select>
//           {errors.eventType && <p className="mt-1 text-sm text-red-600">{errors.eventType.message}</p>}
//         </div>
//
//         <div className="flex-1">
//           <label htmlFor="eventMode" className="block text-sm font-medium text-gray-700">Event Mode</label>
//           <select
//             id="eventMode"
//             {...register('eventMode')}
//             onChange={(e) => setEventMode(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           >
//             <option value="online">Online</option>
//             <option value="offline">Offline</option>
//             <option value="hybrid">Hybrid</option>
//           </select>
//           {errors.eventMode && <p className="mt-1 text-sm text-red-600">{errors.eventMode.message}</p>}
//         </div>
//       </div>
//
//       <div className="flex space-x-4">
//         <div className="flex-1">
//           <label htmlFor="startDateTime" className="block text-sm font-medium text-gray-700">Start Date and Time</label>
//           <input
//             id="startDateTime"
//             type="datetime-local"
//             {...register('startDateTime')}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//           {errors.startDateTime && <p className="mt-1 text-sm text-red-600">{errors.startDateTime.message}</p>}
//         </div>
//
//         <div className="flex-1">
//           <label htmlFor="endDateTime" className="block text-sm font-medium text-gray-700">End Date and Time</label>
//           <input
//             id="endDateTime"
//             type="datetime-local"
//             {...register('endDateTime')}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//           {errors.endDateTime && <p className="mt-1 text-sm text-red-600">{errors.endDateTime.message}</p>}
//         </div>
//       </div>
//
//       {(watchEventMode === 'offline' || watchEventMode === 'hybrid') && (
//         <div className="flex space-x-4">
//           <div className="flex-1">
//             <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
//             <input
//               id="city"
//               {...register('city')}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             />
//             {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
//           </div>
//
//           <div className="flex-1">
//             <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
//             <input
//               id="state"
//               {...register('state')}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             />
//             {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
//           </div>
//         </div>
//       )}
//
//       {(watchEventMode === 'online' || watchEventMode === 'hybrid') && (
//         <div>
//           <label htmlFor="eventLink" className="block text-sm font-medium text-gray-700">Event Link</label>
//           <input
//             id="eventLink"
//             type="url"
//             {...register('eventLink')}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//           {errors.eventLink && <p className="mt-1 text-sm text-red-600">{errors.eventLink.message}</p>}
//         </div>
//       )}
//
//       <div className="flex space-x-4">
//         <div className="flex-1">
//           <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity</label>
//           <input
//             id="capacity"
//             type="number"
//             min="1"
//             {...register('capacity', { valueAsNumber: true })}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//           {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity.message}</p>}
//         </div>
//
//         <div className="flex-1">
//           <label htmlFor="organizer" className="block text-sm font-medium text-gray-700">Organizer</label>
//           <select
//             id="organizer"
//             {...register('organizer')}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           >
//             <option value="">Select organizer</option>
//             <option value="admin1">Admin 1</option>
//             <option value="admin2">Admin 2</option>
//             <option value="counselor1">Counselor 1</option>
//             <option value="counselor2">Counselor 2</option>
//           </select>
//           {errors.organizer && <p className="mt-1 text-sm text-red-600">{errors.organizer.message}</p>}
//         </div>
//       </div>
//
//       <div className="flex justify-end space-x-4">
//         <button
//           type="button"
//           onClick={onClose}
//           className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Create Event
//         </button>
//       </div>
//     </form>
//   );
// }
//

import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventCreationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:7000/create_event', data);
      console.log('Event created:', response.data);
      navigate('preview', { state: { formData: data, apiResponse: response.data } });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Event</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Event Name</label>
            <input
                {...register('name', { required: 'Event name is required' })}
                type="text"
                id="name"
                className="w-full px-3 py-2 border rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block mb-1 font-medium">Description</label>
            <textarea
                {...register('description', { required: 'Description is required' })}
                id="description"
                rows="3"
                className="w-full px-3 py-2 border rounded-md"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label htmlFor="event_type" className="block mb-1 font-medium">Event Type</label>
            <input
                {...register('event_type', { required: 'Event type is required' })}
                type="text"
                id="event_type"
                className="w-full px-3 py-2 border rounded-md"
            />
            {errors.event_type && <p className="text-red-500 text-sm mt-1">{errors.event_type.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="start_date" className="block mb-1 font-medium">Start Date</label>
              <input
                  {...register('start_date', { required: 'Start date is required' })}
                  type="datetime-local"
                  id="start_date"
                  className="w-full px-3 py-2 border rounded-md"
              />
              {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date.message}</p>}
            </div>
            <div>
              <label htmlFor="end_date" className="block mb-1 font-medium">End Date</label>
              <input
                  {...register('end_date', { required: 'End date is required' })}
                  type="datetime-local"
                  id="end_date"
                  className="w-full px-3 py-2 border rounded-md"
              />
              {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="duration" className="block mb-1 font-medium">Duration (hours)</label>
              <input
                  {...register('duration', { required: 'Duration is required', type: 'number' })}
                  type="number"
                  id="duration"
                  className="w-full px-3 py-2 border rounded-md"
              />
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
            </div>
            <div>
              <label htmlFor="capacity" className="block mb-1 font-medium">Capacity</label>
              <input
                  {...register('capacity', { required: 'Capacity is required', type: 'number' })}
                  type="number"
                  id="capacity"
                  className="w-full px-3 py-2 border rounded-md"
              />
              {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="event_mode" className="block mb-1 font-medium">Event Mode</label>
            <select
                {...register('event_mode', { required: 'Event mode is required' })}
                id="event_mode"
                className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select event mode</option>
              <option value="offline">Offline</option>
              <option value="online">Online</option>
            </select>
            {errors.event_mode && <p className="text-red-500 text-sm mt-1">{errors.event_mode.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block mb-1 font-medium">City</label>
              <input
                  {...register('city', { required: 'City is required' })}
                  type="text"
                  id="city"
                  className="w-full px-3 py-2 border rounded-md"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label htmlFor="state" className="block mb-1 font-medium">State</label>
              <input
                  {...register('state', { required: 'State is required' })}
                  type="text"
                  id="state"
                  className="w-full px-3 py-2 border rounded-md"
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="organizer_id" className="block mb-1 font-medium">Organizer ID</label>
            <input
                {...register('organizer_id', { required: 'Organizer ID is required', type: 'number' })}
                type="number"
                id="organizer_id"
                className="w-full px-3 py-2 border rounded-md"
            />
            {errors.organizer_id && <p className="text-red-500 text-sm mt-1">{errors.organizer_id.message}</p>}
          </div>

          <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Create Event
          </motion.button>
        </form>
      </motion.div>
  );
};

export default EventCreationForm;


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
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Event name must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  event_type: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  duration: z.number().int().positive(),
  capacity: z.number().int().positive(),
  event_mode: z.string(),
  city: z.string().optional(),
  state: z.string().optional(),
  organizer_id: z.number().int().positive(),
});

export function EventCreationForm({ onClose }) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'Career Guidance Workshop',
      description: 'A workshop aimed at providing career guidance to high school students. Topics include career options, skill development, and industry trends.',
      event_type: 'workshop',
      start_date: '2024-12-15T10:00',
      end_date: '2024-12-15T14:00',
      duration: 4,
      capacity: 100,
      event_mode: 'offline',
      city: 'Jaipur',
      state: 'Rajasthan',
      organizer_id: 2,
    },
  });

  const watchEventMode = watch('event_mode');

  function onSubmit(values) {
    console.log(values);
    // Add your form submission logic here
    onClose();
  }

  return (
      <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
              id="name"
              {...register('name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
              id="description"
              {...register('description')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
          ></textarea>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </motion.div>

        <div className="flex space-x-4">
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <label htmlFor="event_type" className="block text-sm font-medium text-gray-700">Event Type</label>
            <select
                id="event_type"
                {...register('event_type')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="workshop">Workshop</option>
              <option value="session">Session</option>
              <option value="webinar">Webinar</option>
            </select>
            {errors.event_type && <p className="mt-1 text-sm text-red-600">{errors.event_type.message}</p>}
          </motion.div>

          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <label htmlFor="event_mode" className="block text-sm font-medium text-gray-700">Event Mode</label>
            <select
                id="event_mode"
                {...register('event_mode')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="offline">Offline</option>
              <option value="online">Online</option>
              <option value="hybrid">Hybrid</option>
            </select>
            {errors.event_mode && <p className="mt-1 text-sm text-red-600">{errors.event_mode.message}</p>}
          </motion.div>
        </div>

        <div className="flex space-x-4">
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date and Time</label>
            <input
                id="start_date"
                type="datetime-local"
                {...register('start_date')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.start_date && <p className="mt-1 text-sm text-red-600">{errors.start_date.message}</p>}
          </motion.div>

          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date and Time</label>
            <input
                id="end_date"
                type="datetime-local"
                {...register('end_date')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.end_date && <p className="mt-1 text-sm text-red-600">{errors.end_date.message}</p>}
          </motion.div>
        </div>

        {(watchEventMode === 'offline' || watchEventMode === 'hybrid') && (
            <motion.div
                className="flex space-x-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
            >
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                    id="city"
                    {...register('city')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
              </motion.div>

              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input
                    id="state"
                    {...register('state')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
              </motion.div>
            </motion.div>
        )}

        <div className="flex space-x-4">
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (hours)</label>
            <input
                id="duration"
                type="number"
                {...register('duration', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>}
          </motion.div>

          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
                id="capacity"
                type="number"
                {...register('capacity', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity.message}</p>}
          </motion.div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
          <label htmlFor="organizer_id" className="block text-sm font-medium text-gray-700">Organizer ID</label>
          <input
              id="organizer_id"
              type="number"
              {...register('organizer_id', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.organizer_id && <p className="mt-1 text-sm text-red-600">{errors.organizer_id.message}</p>}
        </motion.div>

        <div className="flex justify-end space-x-4">
          <motion.button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
          <motion.button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
          >
            Create Event
          </motion.button>
        </div>
      </motion.form>
  );
}


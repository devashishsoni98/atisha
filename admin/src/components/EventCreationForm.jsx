import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventCreationForm = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:7000/create_event', data);
      console.log('Event created:', response.data);
      navigate('/event-preview', { state: { formData: data, apiResponse: response.data } });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
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

        <div className="flex justify-end space-x-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Create Event
          </motion.button>
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
          <label htmlFor="organizer_id" className="block mb-1 font-medium">Organizer ID</label>
          <input
            {...register('organizer_id', { required: 'Organizer ID is required', type: 'number' })}
            type="number"
            id="organizer_id"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.organizer_id && <p className="text-red-500 text-sm mt-1">{errors.organizer_id.message}</p>}
        </div>
        
      </form>
    </motion.div>
  );
};

export default EventCreationForm;


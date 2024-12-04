// // import React, { useState } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { motion } from 'framer-motion';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const EventCreationForm = ({ onClose }) => {
// //   const { register, handleSubmit, formState: { errors }, watch } = useForm();
// //   const navigate = useNavigate();
// //   const [imageFile, setImageFile] = useState(null);
// //   const [isUploading, setIsUploading] = useState(false);
// //   const [uploadProgress, setUploadProgress] = useState(0);

// //   const eventMode = watch('event_mode');

// //   const onSubmit = async (data) => {
// //     setIsUploading(true);
// //     try {
// //       let imageUrl = null;
// //       if (imageFile) {
// //         imageUrl = await uploadImage(imageFile);
// //       }

// //       const eventData = {
// //         ...data,
// //         image: imageUrl,
// //         duration: parseInt(data.duration),
// //         capacity: parseInt(data.capacity),
// //         organizer_id: parseInt(data.organizer_id),
// //       };

// //       console.log('Sending to API:', eventData);

// //       const response = await axios.post('http://localhost:7000/events/create_event', eventData);
// //       console.log('Event created:', response.data);
// //       navigate('/preview', { state: { formData: eventData, apiResponse: response.data } });
// //     } catch (error) {
// //       console.error('Error creating event:', error);
// //     } finally {
// //       setIsUploading(false);
// //     }
// //   };

// //   const uploadImage = async (file) => {
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     formData.append('upload_preset', 'atisha_preset');

// //     try {
// //       const response = await axios.post(
// //         'https://api.cloudinary.com/v1_1/dz4xjnefv/image/upload',
// //         formData,
// //         {
// //           onUploadProgress: (progressEvent) => {
// //             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
// //             setUploadProgress(percentCompleted);
// //           },
// //         }
// //       );

// //       return response.data.secure_url;
// //     } catch (error) {
// //       console.error('Image upload failed:', error);
// //       throw new Error('Image upload failed');
// //     }
// //   };

// //   const handleImageChange = (e) => {
// //     if (e.target.files[0]) {
// //       setImageFile(e.target.files[0]);
// //     }
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.5 }}
// //       className="relative bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto"
// //     >
// //       <button
// //         onClick={onClose}
// //         className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
// //         aria-label="Close"
// //       >
// //         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //         </svg>
// //       </button>
// //       <h2 className="text-2xl font-bold mb-6 text-center">Create New Event</h2>
// //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //         <div>
// //           <label htmlFor="name" className="block mb-1 font-medium">Event Name</label>
// //           <input
// //             {...register('name', { required: 'Event name is required' })}
// //             type="text"
// //             id="name"
// //             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //           {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
// //         </div>

// //         <div>
// //           <label htmlFor="description" className="block mb-1 font-medium">Description</label>
// //           <textarea
// //             {...register('description', { required: 'Description is required' })}
// //             id="description"
// //             rows="3"
// //             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           ></textarea>
// //           {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
// //         </div>

// //         <div>
// //           <label htmlFor="event_type" className="block mb-1 font-medium">Event Type</label>
// //           <select
// //             {...register('event_type', { required: 'Event type is required' })}
// //             id="event_type"
// //             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           >
// //             <option value="">Select event type</option>
// //             <option value="seminar">Seminar</option>
// //             <option value="webinar">Webinar</option>
// //             <option value="workshop">Workshop</option>
// //           </select>
// //           {errors.event_type && <p className="text-red-500 text-sm mt-1">{errors.event_type.message}</p>}
// //         </div>

// //         <div>
// //           <label htmlFor="event_mode" className="block mb-1 font-medium">Event Mode</label>
// //           <select
// //             {...register('event_mode', { required: 'Event mode is required' })}
// //             id="event_mode"
// //             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           >
// //             <option value="">Select event mode</option>
// //             <option value="online">Online</option>
// //             <option value="offline">Offline</option>
// //             <option value="hybrid">Hybrid</option>
// //           </select>
// //           {errors.event_mode && <p className="text-red-500 text-sm mt-1">{errors.event_mode.message}</p>}
// //         </div>

// //         {eventMode === 'online'  && (
// //           <div>
// //             <label htmlFor="link" className="block mb-1 font-medium">Event Link</label>
// //             <input
// //               {...register('link', { 
// //                 required: 'Event link is required for online events',
// //                 pattern: {
// //                   value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
// //                   message: 'Please enter a valid URL'
// //                 }
// //               })}
// //               type="url"
// //               id="link"
// //               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>}
// //           </div>
// //         )}
// //         {eventMode === 'hybrid'  && (
// //           <div>
// //             <label htmlFor="link" className="block mb-1 font-medium">Event Link</label>
// //             <input
// //               {...register('link', { 
// //                 required: 'Event link is required for online events',
// //                 pattern: {
// //                   value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
// //                   message: 'Please enter a valid URL'
// //                 }
// //               })}
// //               type="url"
// //               id="link"
// //               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>}
// //           </div>
// //         )}

// //         {eventMode === 'offline' && (
// //           <div className="grid grid-cols-2 gap-4">
// //           <div>
// //             <label htmlFor="city" className="block mb-1 font-medium">City</label>
// //             <input
// //               {...register('city', { required: 'City is required' })}
// //               type="text"
// //               id="city"
// //               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
// //           </div>
// //           <div>
// //             <label htmlFor="state" className="block mb-1 font-medium">State</label>
// //             <input
// //               {...register('state', { required: 'State is required' })}
// //               type="text"
// //               id="state"
// //               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
// //           </div>
// //         </div>
// //         )}
// //         {eventMode === 'hybrid' && (
// //           <div className="grid grid-cols-2 gap-4">
// //           <div>
// //             <label htmlFor="city" className="block mb-1 font-medium">City</label>
// //             <input
// //               {...register('city', { required: 'City is required' })}
// //               type="text"
// //               id="city"
// //               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
// //           </div>
// //           <div>
// //             <label htmlFor="state" className="block mb-1 font-medium">State</label>
// //             <input
// //               {...register('state', { required: 'State is required' })}
// //               type="text"
// //               id="state"
// //               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
// //           </div>
// //         </div>
// //         )}

// //         {/* <div className="grid grid-cols-2 gap-4">
// //           <div>
// //             <label htmlFor="city" className="block mb-1 font-medium">City</label>
// //             <input
// //               {...register('city', { required: 'City is required' })}
// //               type="text"
// //               id="city"
// //               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
// //           </div>
// //           <div>
// //             <label htmlFor="state" className="block mb-1 font-medium">State</label>
// //             <input
// //               {...register('state', { required: 'State is required' })}
// //               type="text"
// //               id="state"
// //               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
// //           </div>
// //         </div> */}

// //         <div className="grid grid-cols-2 gap-4">
// //           <div>
// //             <label htmlFor="start_date" className="block mb-1 font-medium">Start Date</label>
// //             <input
// //               {...register('start_date', { required: 'Start date is required' })}
// //               type="datetime-local"
// //               id="start_date"
// //               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date.message}</p>}
// //           </div>
// //           <div>
// //             <label htmlFor="end_date" className="block mb-1 font-medium">End Date</label>
// //             <input
// //               {...register('end_date', { required: 'End date is required' })}
// //               type="datetime-local"
// //               id="end_date"
// //               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date.message}</p>}
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-2 gap-4">
// //           <div>
// //             <label htmlFor="duration" className="block mb-1 font-medium">Duration (hours)</label>
// //             <input
// //               {...register('duration', { required: 'Duration is required', type: 'number' })}
// //               type="number"
// //               id="duration"
// //               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
// //           </div>
// //           <div>
// //             <label htmlFor="capacity" className="block mb-1 font-medium">Capacity</label>
// //             <input
// //               {...register('capacity', { required: 'Capacity is required', type: 'number' })}
// //               type="number"
// //               id="capacity"
// //               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>}
// //           </div>
// //         </div>

// //         <div>
// //           <label htmlFor="organizer_id" className="block mb-1 font-medium">Organizer ID</label>
// //           <input
// //             {...register('organizer_id', { required: 'Organizer ID is required', type: 'number' })}
// //             type="number"
// //             id="organizer_id"
// //             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //           {errors.organizer_id && <p className="text-red-500 text-sm mt-1">{errors.organizer_id.message}</p>}
// //         </div>

// //         <div>
// //           <label htmlFor="image" className="block mb-1 font-medium">Event Image</label>
// //           <input
// //             type="file"
// //             id="image"
// //             onChange={handleImageChange}
// //             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             accept="image/*"
// //           />
// //           {isUploading && (
// //             <div className="mt-2">
// //               <div className="bg-blue-100 h-2 rounded-full">
// //                 <div
// //                   className="bg-blue-500 h-2 rounded-full"
// //                   style={{ width: `${uploadProgress}%` }}
// //                 ></div>
// //               </div>
// //               <p className="text-sm text-gray-600 mt-1">Uploading: {uploadProgress}%</p>
// //             </div>
// //           )}
// //         </div>

// //         <div className="flex justify-end space-x-4 mt-6">
// //           <motion.button
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             onClick={onClose}
// //             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
// //           >
// //             Cancel
// //           </motion.button>
// //           <motion.button
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             type="submit"
// //             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
// //             disabled={isUploading}
// //           >
// //             {isUploading ? 'Uploading...' : 'Create Event'}
// //           </motion.button>
// //         </div>
// //       </form>
// //     </motion.div>
// //   );
// // };

// // export default EventCreationForm;

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const EventCreationForm = ({ onClose }) => {
//   const { register, handleSubmit, formState: { errors }, watch } = useForm();
//   const navigate = useNavigate();
//   const [imageFile, setImageFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const eventMode = watch('event_mode');

//   const onSubmit = async (data) => {
//     setIsUploading(true);
//     try {
//       let imageUrl = null;
//       if (imageFile) {
//         imageUrl = await uploadImage(imageFile);
//       }

//       const eventData = {
//         ...data,
//         image: imageUrl,
//         duration: parseInt(data.duration),
//         capacity: parseInt(data.capacity),
//         organizer_id: parseInt(data.organizer_id),
//       };

//       console.log('Sending to API:', eventData);

//       const response = await axios.post('http://localhost:7000/events/create_event', eventData);
//       console.log('Event created:', response.data);
//       navigate('/preview', { state: { formData: eventData, apiResponse: response.data } });
//     } catch (error) {
//       console.error('Error creating event:', error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'atisha_preset');

//     try {
//       const response = await axios.post(
//         'https://api.cloudinary.com/v1_1/dz4xjnefv/image/upload',
//         formData,
//         {
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress(percentCompleted);
//           },
//         }
//       );

//       return response.data.secure_url;
//     } catch (error) {
//       console.error('Image upload failed:', error);
//       throw new Error('Image upload failed');
//     }
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="relative bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto"
//     >
//       <button
//         onClick={onClose}
//         className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//         aria-label="Close"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//         </svg>
//       </button>
//       <h2 className="text-2xl font-bold mb-6 text-center">Create New Event</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label htmlFor="name" className="block mb-1 font-medium">Event Name</label>
//           <input
//             {...register('name', { required: 'Event name is required' })}
//             type="text"
//             id="name"
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//         </div>

//         <div>
//           <label htmlFor="description" className="block mb-1 font-medium">Description</label>
//           <textarea
//             {...register('description', { required: 'Description is required' })}
//             id="description"
//             rows="3"
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>
//           {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
//         </div>

//         <div>
//           <label htmlFor="event_type" className="block mb-1 font-medium">Event Type</label>
//           <select
//             {...register('event_type', { required: 'Event type is required' })}
//             id="event_type"
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select event type</option>
//             <option value="seminar">Seminar</option>
//             <option value="webinar">Webinar</option>
//             <option value="workshop">Workshop</option>
//           </select>
//           {errors.event_type && <p className="text-red-500 text-sm mt-1">{errors.event_type.message}</p>}
//         </div>

//         <div>
//           <label htmlFor="event_mode" className="block mb-1 font-medium">Event Mode</label>
//           <select
//             {...register('event_mode', { required: 'Event mode is required' })}
//             id="event_mode"
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select event mode</option>
//             <option value="online">Online</option>
//             <option value="offline">Offline</option>
//             <option value="hybrid">Hybrid</option>
//           </select>
//           {errors.event_mode && <p className="text-red-500 text-sm mt-1">{errors.event_mode.message}</p>}
//         </div>

//         {eventMode === 'online' && (
//           <div>
//             <label htmlFor="link" className="block mb-1 font-medium">Event Link</label>
//             <input
//               {...register('link', { 
//                 required: 'Event link is required for online events',
//                 pattern: {
//                   value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
//                   message: 'Please enter a valid URL'
//                 }
//               })}
//               type="url"
//               id="link"
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>}
//           </div>
//         )}
//         {eventMode === 'hybrid' && (
//           <div>
//             <label htmlFor="link" className="block mb-1 font-medium">Event Link</label>
//             <input
//               {...register('link', { 
//                 required: 'Event link is required for hybrid events',
//                 pattern: {
//                   value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
//                   message: 'Please enter a valid URL'
//                 }
//               })}
//               type="url"
//               id="link"
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>}
//           </div>
//         )}

//         {(eventMode === 'offline' || eventMode === 'hybrid') && (
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="city" className="block mb-1 font-medium">City</label>
//               <input
//                 {...register('city', { required: 'City is required' })}
//                 type="text"
//                 id="city"
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
//             </div>
//             <div>
//               <label htmlFor="state" className="block mb-1 font-medium">State</label>
//               <input
//                 {...register('state', { required: 'State is required' })}
//                 type="text"
//                 id="state"
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="start_date" className="block mb-1 font-medium">Start Date</label>
//             <input
//               {...register('start_date', { required: 'Start date is required' })}
//               type="datetime-local"
//               id="start_date"
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date.message}</p>}
//           </div>
//           <div>
//             <label htmlFor="end_date" className="block mb-1 font-medium">End Date</label>
//             <input
//               {...register('end_date', { required: 'End date is required' })}
//               type="datetime-local"
//               id="end_date"
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date.message}</p>}
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="duration" className="block mb-1 font-medium">Duration (hours)</label>
//             <input
//               {...register('duration', { required: 'Duration is required', type: 'number' })}
//               type="number"
//               id="duration"
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
//           </div>
//           <div>
//             <label htmlFor="capacity" className="block mb-1 font-medium">Capacity</label>
//             <input
//               {...register('capacity', { required: 'Capacity is required', type: 'number' })}
//               type="number"
//               id="capacity"
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>}
//           </div>
//         </div>

//         <div>
//           <label htmlFor="organizer_id" className="block mb-1 font-medium">Organizer ID</label>
//           <input
//             {...register('organizer_id', { required: 'Organizer ID is required', type: 'number' })}
//             type="number"
//             id="organizer_id"
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.organizer_id && <p className="text-red-500 text-sm mt-1">{errors.organizer_id.message}</p>}
//         </div>

//         <div>
//           <label htmlFor="image" className="block mb-1 font-medium">Event Image</label>
//           <input
//             type="file"
//             id="image"
//             onChange={handleImageChange}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             accept="image/*"
//           />
//           {isUploading && (
//             <div className="mt-2">
//               <div className="bg-blue-100 h-2 rounded-full">
//                 <div
//                   className="bg-blue-500 h-2 rounded-full"
//                   style={{ width: `${uploadProgress}%` }}
//                 ></div>
//               </div>
//               <p className="text-sm text-gray-600 mt-1">Uploading: {uploadProgress}%</p>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end space-x-4 mt-6">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
//           >
//             Cancel
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
//             disabled={isUploading}
//           >
//             {isUploading ? 'Uploading...' : 'Create Event'}
//           </motion.button>
//         </div>
//       </form>
//     </motion.div>
//   );
// };

// export default EventCreationForm;


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventCreationForm = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [step, setStep] = useState(1);

  const eventMode = watch('event_mode');

  const onSubmit = async (data) => {
    setIsUploading(true);
    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const eventData = {
        ...data,
        image: imageUrl,
        duration: parseInt(data.duration),
        capacity: parseInt(data.capacity),
        organizer_id: data.organizer_id ? parseInt(data.organizer_id) : null,
      };

      console.log('Sending to API:', eventData);

      const response = await axios.post('http://localhost:7000/events/create_event', eventData);
      console.log('Event created:', response.data);
      navigate('/preview', { state: { formData: eventData, apiResponse: response.data } });
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'atisha_preset');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dz4xjnefv/image/upload',
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          },
        }
      );

      return response.data.secure_url;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error('Image upload failed');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
    >
      <div className="relative bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-lg shadow-lg w-full max-w-md m-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors duration-200"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Create New Event</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 font-medium text-white">Event Name</label>
                    <input
                      {...register('name', { required: 'Event name is required' })}
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200"
                      placeholder="Enter event name"
                    />
                    {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="description" className="block mb-1 font-medium text-white">Description</label>
                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      id="description"
                      rows="3"
                      className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200"
                      placeholder="Describe your event"
                    ></textarea>
                    {errors.description && <p className="text-red-300 text-sm mt-1">{errors.description.message}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="event_type" className="block mb-1 font-medium text-white">Event Type</label>
                    <select
                      {...register('event_type', { required: 'Event type is required' })}
                      id="event_type"
                      className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                    >
                      <option value="">Select event type</option>
                      <option value="seminar">Seminar</option>
                      <option value="webinar">Webinar</option>
                      <option value="workshop">Workshop</option>
                    </select>
                    {errors.event_type && <p className="text-red-300 text-sm mt-1">{errors.event_type.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="event_mode" className="block mb-1 font-medium text-white">Event Mode</label>
                    <select
                      {...register('event_mode', { required: 'Event mode is required' })}
                      id="event_mode"
                      className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                    >
                      <option value="">Select event mode</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                    {errors.event_mode && <p className="text-red-300 text-sm mt-1">{errors.event_mode.message}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  {(eventMode === 'offline' || eventMode === 'hybrid') && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block mb-1 font-medium text-white">City</label>
                        <input
                          {...register('city', { required: 'City is required for offline and hybrid events' })}
                          type="text"
                          id="city"
                          className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200"
                          placeholder="Enter city"
                        />
                        {errors.city && <p className="text-red-300 text-sm mt-1">{errors.city.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="state" className="block mb-1 font-medium text-white">State</label>
                        <input
                          {...register('state', { required: 'State is required for offline and hybrid events' })}
                          type="text"
                          id="state"
                          className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200"
                          placeholder="Enter state"
                        />
                        {errors.state && <p className="text-red-300 text-sm mt-1">{errors.state.message}</p>}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="start_date" className="block mb-1 font-medium text-white">Start Date</label>
                      <input
                        {...register('start_date', { required: 'Start date is required' })}
                        type="datetime-local"
                        id="start_date"
                        className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                      />
                      {errors.start_date && <p className="text-red-300 text-sm mt-1">{errors.start_date.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="end_date" className="block mb-1 font-medium text-white">End Date</label>
                      <input
                        {...register('end_date', { required: 'End date is required' })}
                        type="datetime-local"
                        id="end_date"
                        className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                      />
                      {errors.end_date && <p className="text-red-300 text-sm mt-1">{errors.end_date.message}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="duration" className="block mb-1 font-medium text-white">Duration (hours)</label>
                      <input
                        {...register('duration', { required: 'Duration is required', type: 'number' })}
                        type="number"
                        id="duration"
                        className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200"
                        placeholder="Enter duration"
                      />
                      {errors.duration && <p className="text-red-300 text-sm mt-1">{errors.duration.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="capacity" className="block mb-1 font-medium text-white">Capacity</label>
                      <input
                        {...register('capacity', { required: 'Capacity is required', type: 'number' })}
                        type="number"
                        id="capacity"
                        className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200"
                        placeholder="Enter capacity"
                      />
                      {errors.capacity && <p className="text-red-300 text-sm mt-1">{errors.capacity.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="organizer_id" className="block mb-1 font-medium text-white">Organizer ID (optional)</label>
                    <input
                      {...register('organizer_id', { type: 'number' })}
                      type="number"
                      id="organizer_id"
                      className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200"
                      placeholder="Enter organizer ID"
                    />
                  </div>
                  <div>
                    <label htmlFor="image" className="block mb-1 font-medium text-white">Event Image (optional)</label>
                    <input
                      type="file"
                      id="image"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                      accept="image/*"
                    />
                    {isUploading && (
                      <div className="mt-2">
                        <div className="bg-white bg-opacity-20 h-2 rounded-full">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-white mt-1">Uploading: {uploadProgress}%</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                className="px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-gray-100 transition duration-300"
              >
                Previous
              </motion.button>
            )}
            {step < 4 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                className="px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-gray-100 transition duration-300"
              >
                Next
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Create Event'}
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default EventCreationForm;


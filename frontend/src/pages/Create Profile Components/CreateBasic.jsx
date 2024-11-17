import React from 'react';
import { motion } from "framer-motion";
import { Controller } from 'react-hook-form';

export function CreateBasic({ control, errors, profileImage, handleImageChange, userEmail }) {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-6"
  >
    <div className="flex items-center space-x-6">
      <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
        {profileImage && (
          <img src={URL.createObjectURL(profileImage)} alt="Profile" className="w-full h-full object-cover" />
        )}
      </div>
      <div>
        <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
        <input
          id="profileImage"
          name="profileImage"
          type="file"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-300 ease-in-out"
          accept="image/*"
        />
      </div>
    </div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className="block text-md font-medium text-gray-700 mb-1">Full Name</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <input
              {...field}
              className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
            />
          )}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-md font-medium text-gray-700 mb-1">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out bg-gray-100"
              readOnly
            />
          )}
        />
      </div>
    </div>
  </motion.div>
  );
}

import React from 'react';
import { motion } from "framer-motion";
import { Controller } from 'react-hook-form';

export function CreatePersonal({ control, errors }) {
  return (
    <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="dob" className="block text-md font-medium text-gray-700 mb-1">Date of Birth</label>
                <Controller
                  name="dob"
                  control={control}
                  rules={{ required: 'Date of Birth is required' }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    />
                  )}
                />
                {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>}
              </div>
              <div>
                <label htmlFor="gender" className="block text-md font-medium text-gray-700 mb-1">Gender</label>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: 'Gender is required' }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    >
                      <option value="">Select gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  )}
                />
                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
              </div>
              <div>
                <label htmlFor="location" className="block text-md font-medium text-gray-700 mb-1">Location</label>
                <Controller
                  name="location"
                  control={control}
                  rules={{ required: 'Location is required' }}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    />
                  )}
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
              </div>
              <div>
                <label htmlFor="contactNumber" className="block text-md font-medium text-gray-700 mb-1">Contact Number</label>
                <Controller
                  name="contactNumber"
                  control={control}
                  rules={{ required: 'Contact Number is required' }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    />
                  )}
                />
                {errors.contactNumber && <p className="mt-1 text-sm text-red-600">{errors.contactNumber.message}</p>}
              </div>
            </div>
          </motion.div>
  );
}

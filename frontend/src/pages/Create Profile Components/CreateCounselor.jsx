import React from 'react'
import { motion } from 'framer-motion';
import { Controller } from 'react-hook-form';

const CreateCounselor = ({ control, errors }) => {
  return (
     <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="degree" className="block text-md font-medium text-gray-700 mb-1">Degree</label>
                  <Controller
                    name="degree"
                    control={control}
                    rules={{ required: 'Degree is required' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                      />
                    )}
                  />
                  {errors.degree && <p className="mt-1 text-sm text-red-600">{errors.degree.message}</p>}
                </div>
                <div>
                  <label htmlFor="certificate" className="block text-md font-medium text-gray-700 mb-1">Certificate</label>
                  <Controller
                    name="certificate"
                    control={control}
                    rules={{ required: 'Certificate is required' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                      />
                    )}
                  />
                  {errors.certificate && <p className="mt-1 text-sm text-red-600">{errors.certificate.message}</p>}
                </div>
                <div>
                  <label htmlFor="association" className="block text-md font-medium text-gray-700 mb-1">Association</label>
                  <Controller
                    name="association"
                    control={control}
                    rules={{ required: 'Association is required' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                      />
                    )}
                  />
                  {errors.association && <p className="mt-1 text-sm text-red-600">{errors.association.message}</p>}
                </div>
                <div>
                  <label htmlFor="yearOfExperience" className="block text-md font-medium text-gray-700 mb-1">Years of Experience</label>
                  <Controller
                    name="yearOfExperience"
                    control={control}
                    rules={{ required: 'Years of Experience is required' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                      />
                    )}
                  />
                  {errors.yearOfExperience && <p className="mt-1 text-sm text-red-600">{errors.yearOfExperience.message}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="domain" className="block text-md font-medium text-gray-700 mb-1">Domain</label>
                <Controller
                  name="domain"
                  control={control}
                  rules={{ required: 'Domain is required' }}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    />
                  )}
                />
                {errors.domain && <p className="mt-1 text-sm text-red-600">{errors.domain.message}</p>}
              </div>
              <div>
                <label htmlFor="bio" className="block text-md font-medium text-gray-700 mb-1">Bio</label>
                <Controller
                  name="bio"
                  control={control}
                  rules={{ required: 'Bio is required' }}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows={4}
                      className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    />
                  )}
                />
                {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>}
              </div>
            </motion.div>
  )
}

export default CreateCounselor
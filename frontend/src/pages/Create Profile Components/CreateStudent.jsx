import { motion } from 'framer-motion';
import { Controller } from 'react-hook-form';

function CreateStudent({ control, errors }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="schoolName" className="block text-md font-medium text-gray-700 mb-1">
            School Name
          </label>
          <Controller
            name="schoolName"
            control={control}
            rules={{ required: 'School Name is required' }}
            render={({ field }) => (
              <input
                {...field}
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
              />
            )}
          />
          {errors.schoolName && <p className="mt-1 text-sm text-red-600">{errors.schoolName.message}</p>}
        </div>
        <div>
          <label htmlFor="class" className="block text-md font-medium text-gray-700 mb-1">
            Class
          </label>
          <Controller
            name="class"
            control={control}
            rules={{ required: 'Class is required' }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
              />
            )}
          />
          {errors.class && <p className="mt-1 text-sm text-red-600">{errors.class.message}</p>}
        </div>
      </div>
    </motion.div>
  );
}

export default CreateStudent;

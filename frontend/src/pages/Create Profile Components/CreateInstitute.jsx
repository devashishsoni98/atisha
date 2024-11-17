import { motion } from "framer-motion";
import { Controller } from "react-hook-form";

function CreateInstitute({ control, errors }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="address"
            className="block text-md font-medium text-gray-700 mb-1"
          >
            Address
          </label>
          <Controller
            name="address"
            control={control}
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <input
                {...field}
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
              />
            )}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="establishYear"
            className="block text-md font-medium text-gray-700 mb-1"
          >
            Establishment Year
          </label>
          <Controller
            name="establishYear"
            control={control}
            rules={{ required: "Establishment Year is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
              />
            )}
          />
          {errors.establishYear && (
            <p className="mt-1 text-sm text-red-600">
              {errors.establishYear.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="instituteType"
            className="block text-md font-medium text-gray-700 mb-1"
          >
            Institute Type
          </label>
          <Controller
            name="instituteType"
            control={control}
            rules={{ required: "Institute Type is required" }}
            render={({ field }) => (
              <select
                {...field}
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
              >
                <option value="">Select institute type</option>
                <option value="private">Private</option>
                <option value="govt">Government</option>
                <option value="semi-govt">Semi-Government</option>
                <option value="public">Public</option>
              </select>
            )}
          />
          {errors.instituteType && (
            <p className="mt-1 text-sm text-red-600">
              {errors.instituteType.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="studentBody"
            className="block text-md font-medium text-gray-700 mb-1"
          >
            Student Body
          </label>
          <Controller
            name="studentBody"
            control={control}
            rules={{ required: "Student Body is required" }}
            render={({ field }) => (
              <input
                {...field}
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
              />
            )}
          />
          {errors.studentBody && (
            <p className="mt-1 text-sm text-red-600">
              {errors.studentBody.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="subjects"
          className="block text-md font-medium text-gray-700 mb-1"
        >
          Subjects Offered
        </label>
        <Controller
          name="subjects"
          control={control}
          rules={{ required: "Subjects Offered is required" }}
          render={({ field }) => (
            <textarea
              {...field}
              rows={3}
              className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
            />
          )}
        />
        {errors.subjects && (
          <p className="mt-1 text-sm text-red-600">{errors.subjects.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="specialPrograms"
          className="block text-md font-medium text-gray-700 mb-1"
        >
          Special Programs
        </label>
        <Controller
          name="specialPrograms"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={3}
              className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
            />
          )}
        />
      </div>
      <div>
        <label
          htmlFor="languageOffer"
          className="block text-md font-medium text-gray-700 mb-1"
        >
          Languages Offered
        </label>
        <Controller
          name="languageOffer"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={3}
              className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
            />
          )}
        />
      </div>
      <div>
        <label
          htmlFor="certificateAndAffiliation"
          className="block text-md font-medium text-gray-700 mb-1"
        >
          Certificates and Affiliations
        </label>
        <Controller
          name="certificateAndAffiliation"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={3}
              className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
            />
          )}
        />
      </div>
    </motion.div>
  );
}

export default CreateInstitute;

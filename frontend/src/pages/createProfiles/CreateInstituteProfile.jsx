import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Building2 } from 'lucide-react';
import axios from "axios";

const AnimatedBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute -inset-[10px] opacity-20">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full fill-current text-blue-300"
          >
            {i % 3 === 0 && (
              <path d="M50 0 L100 50 L50 100 L0 50 Z" />
            )}
            {i % 3 === 1 && (
              <circle cx="50" cy="50" r="50" />
            )}
            {i % 3 === 2 && (
              <path d="M0 0 L100 0 L100 100 L0 100 Z" />
            )}
          </svg>
        </motion.div>
      ))}
    </div>
  </div>
);

const uploadImage = async (file, progressSetter) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "atisha_preset");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dz4xjnefv/image/upload",
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          progressSetter(percentCompleted);
        },
      }
    );

    if (response.data && response.data.secure_url) {
      console.log("Image uploaded successfully:", response.data.secure_url);
      return response.data.secure_url;
    } else {
      console.error("No secure_url in Cloudinary response");
      throw new Error("Invalid Cloudinary response");
    }
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Image upload failed");
  }
};

const CreateInstituteProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token) || localStorage.getItem("token");

  const { userRole, userId, userEmail, userName } = location.state || {};
  const [formData, setFormData] = useState({
    user_id: userId || "",
    name: userName || "",
    image_url: "",
    plot_no: "",
    street: "",
    city: "",
    state: "",
    contact_number: "",
    establish_year: "",
    institute_type: "",
    student_body: "",
    institute_board: "",
    spoc_name: "",
    spoc_email: userEmail || "",
    spoc_contact_number: "",
  });

  const [activeTab, setActiveTab] = useState("basic");
  const tabs = ["basic", "details", "spoc"];
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (!token) {
      console.error("No token found. Redirecting to signup.");
      navigate("/signup");
    }
  }, [token, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "name":
        if (value.trim().length < 2) {
          errorMsg = "Institute name must be at least 2 characters long.";
        }
        break;
      case "contact_number":
      case "spoc_contact_number":
        if (!/^\d{10}$/.test(value)) {
          errorMsg = "Contact number must be exactly 10 digits.";
        }
        break;
      case "establish_year":
        if (!/^\d{4}$/.test(value) || parseInt(value) < 1800 || parseInt(value) > new Date().getFullYear()) {
          errorMsg = "Please enter a valid year.";
        }
        break;
      case "spoc_email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = "Please enter a valid email address.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadProgress(0);
      try {
        const imageUrl = await uploadImage(file, setUploadProgress);
        setFormData((prev) => ({
          ...prev,
          image_url: imageUrl,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
        setErrors((prev) => ({ ...prev, image: 'Failed to upload image. Please try again.' }));
      } finally {
        setUploadProgress(0);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab !== tabs[tabs.length - 1]) {
      handleNext();
      return;
    }

    if (!formData.user_id) {
      setErrors((prev) => ({ ...prev, general: "User ID is missing. Please try signing up again." }));
      navigate("/signup");
      return;
    }

    const requiredFields = [
      "name", "plot_no", "street", "city", "state", "contact_number",
      "establish_year", "institute_type", "student_body", "institute_board",
      "spoc_name", "spoc_email", "spoc_contact_number"
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0 || Object.values(errors).some(error => error)) {
      setErrors((prev) => ({
        ...prev,
        general: `Please fill in all required fields and correct any errors before submitting.`
      }));
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/institute/info/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response:", errorData);
        setErrors((prev) => ({ ...prev, general: `Error: ${errorData.message}` }));
        return;
      }

      const responseData = await response.json();
      console.log("Institute profile created successfully", responseData);

      navigate(`/onboarding`);
    } catch (error) {
      console.error("Error creating institute profile:", error);
      setErrors((prev) => ({ ...prev, general: `Error creating institute profile: ${error.message}. Please try again.` }));
    }
  };

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden relative">
                {formData.image_url ? (
                  <img
                    src={formData.image_url}
                    alt="Institute Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <Building2 className="w-12 h-12" />
                  </div>
                )}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                    <div className="absolute text-white font-bold">{uploadProgress}%</div>
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition duration-300"
                >
                  Upload Institute Logo
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Institute Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="plot_no" className="block text-sm font-medium text-gray-700 mb-1">
                  Plot No
                </label>
                <input
                  id="plot_no"
                  name="plot_no"
                  value={formData.plot_no}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.plot_no && <p className="text-red-500 text-sm mt-1">{errors.plot_no}</p>}
              </div>
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                  Street
                </label>
                <input
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
            </div>
          </div>
        );
      case "details":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  id="contact_number"
                  name="contact_number"
                  type="tel"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.contact_number && <p className="text-red-500 text-sm mt-1">{errors.contact_number}</p>}
              </div>
              <div>
                <label htmlFor="establish_year" className="block text-sm font-medium text-gray-700 mb-1">
                  Establishment Year
                </label>
                <input
                  id="establish_year"
                  name="establish_year"
                  type="number"
                  value={formData.establish_year}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.establish_year && <p className="text-red-500 text-sm mt-1">{errors.establish_year}</p>}
              </div>
              <div>
                <label htmlFor="institute_type" className="block text-sm font-medium text-gray-700 mb-1">
                  Institute Type
                </label>
                <select
                  id="institute_type"
                  name="institute_type"
                  value={formData.institute_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select type</option>
                  <option value="private">Private</option>
                  <option value="govt">Government</option>
                  <option value="semiGovt">Semi Government</option>
                  <option value="public">Public</option>
                </select>
                {errors.institute_type && <p className="text-red-500 text-sm mt-1">{errors.institute_type}</p>}
              </div>
              <div>
                <label htmlFor="student_body" className="block text-sm font-medium text-gray-700 mb-1">
                  Student Body Size
                </label>
                <input
                  id="student_body"
                  name="student_body"
                  type="text"
                  value={formData.student_body}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.student_body && <p className="text-red-500 text-sm mt-1">{errors.student_body}</p>}
              </div>
              <div>
                <label htmlFor="institute_board" className="block text-sm font-medium text-gray-700 mb-1">
                  Institute Board
                </label>
                <select
                  id="institute_board"
                  name="institute_board"
                  value={formData.institute_board}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select board</option>
                  <option value="cbse">CBSE</option>
                  <option value="icse">ICSE</option>
                  <option value="state">State</option>
                  <option value="international">International</option>
                </select>
                {errors.institute_board && <p className="text-red-500 text-sm mt-1">{errors.institute_board}</p>}
              </div>
            </div>
          </div>
        );
      case "spoc":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="spoc_name" className="block text-sm font-medium text-gray-700 mb-1">
                  SPOC Name
                </label>
                <input
                  id="spoc_name"
                  name="spoc_name"
                  value={formData.spoc_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.spoc_name && <p className="text-red-500 text-sm mt-1">{errors.spoc_name}</p>}
              </div>
              <div>
                <label htmlFor="spoc_email" className="block text-sm font-medium text-gray-700 mb-1">
                  SPOC Email
                </label>
                <input
                  id="spoc_email"
                  name="spoc_email"
                  type="email"
                  value={formData.spoc_email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.spoc_email && <p className="text-red-500 text-sm mt-1">{errors.spoc_email}</p>}
              </div>
              <div>
                <label htmlFor="spoc_contact_number" className="block text-sm font-medium text-gray-700 mb-1">
                  SPOC Contact Number
                </label>
                <input
                  id="spoc_contact_number"
                  name="spoc_contact_number"
                  type="tel"
                  value={formData.spoc_contact_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.spoc_contact_number && <p className="text-red-500 text-sm mt-1">{errors.spoc_contact_number}</p>}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <AnimatedBackground />
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden relative z-10">
        <div className="px-4 py-5 sm:px-6 bg-blue-600">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
            Create Institute Profile
          </h2>
        </div>
        <div className="border-t border-gray-200">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-wrap justify-center mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 mx-2 my-1 py-2 font-medium text-sm rounded-full transition-all duration-300 ease-in-out ${
                      activeTab === tab
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <div className="bg-gray-50 rounded-xl p-6 shadow-inner min-h-[400px]">
                {renderTabContent()}
              </div>
            </div>
            <div className="px-4 py-4 sm:px-6 flex flex-wrap justify-between">
              {activeTab !== tabs[0] && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-2 sm:mb-0"
                >
                  Previous
                </button>
              )}
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {activeTab === tabs[tabs.length - 1] ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {errors.general && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.general}
        </div>
      )}
    </div>
  );
};

export default CreateInstituteProfile;


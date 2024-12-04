import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { motion } from 'framer-motion';

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

const CreateMentorProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token) || localStorage.getItem("token");

  const { userRole, userId, userEmail, userName } = location.state || {};
  const [formData, setFormData] = useState({
    user_id: userId || "",
    name: userName || "",
    email: userEmail || "",
    image_url: "",
    expertise: "",
    bio: "",
    location: "",
    certifications: [],
    degree: "",
    institution: "",
    year_of_experience: "",
    type: "",
  });

  const [activeTab, setActiveTab] = useState("basic");
  const tabs = ["basic", "professional", "additional"];
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

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
      case "year_of_experience":
        if (value < 0) {
          errorMsg = "Years of experience cannot be negative.";
        }
        break;
      case "location":
        if (!value) {
          errorMsg = "Location is required.";
        }
        break;
      case "expertise":
        if (!value) {
          errorMsg = "Expertise is required.";
        }
        break;
      case "degree":
        if (!value) {
          errorMsg = "Degree is required.";
        }
        break;
      case "institution":
        if (!value) {
          errorMsg = "Institution is required.";
        }
        break;
      case "type":
        if (!value) {
          errorMsg = "Mentor type is required.";
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

  const uploadImage = async (file) => {
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
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.data && response.data.secure_url) {
        return response.data.secure_url;
      } else {
        throw new Error("Invalid Cloudinary response");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Image upload failed");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      try {
        const imageUrl = await uploadImage(file);
        setFormData((prev) => ({
          ...prev,
          image_url: imageUrl,
        }));
      } catch (error) {
        setErrors((prev) => ({ ...prev, image: 'Failed to upload image. Please try again.' }));
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleCertificationsChange = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);
    
    try {
      const uploadedUrls = await Promise.all(files.map(uploadImage));
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, ...uploadedUrls],
      }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, certifications: 'Failed to upload one or more certifications. Please try again.' }));
    } finally {
      setIsUploading(false);
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

    if (Object.values(errors).some(error => error)) {
      setErrors((prev) => ({ ...prev, general: "Please fix all errors before submitting." }));
      return;
    }

    try {
      const dataToSend = {
        user_id: parseInt(formData.user_id),
        image_url: formData.image_url,
        expertise: formData.expertise,
        bio: formData.bio,
        location: formData.location,
        certifications: formData.certifications,
        degree: formData.degree,
        institution: formData.institution,
        year_of_experience: parseInt(formData.year_of_experience),
        type: formData.type,
      };

      console.log("Sending data to server:", JSON.stringify(dataToSend, null, 2));

      const response = await fetch("http://localhost:4000/api/mentor/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      navigate(`/onboarding`);
      
    } catch (error) {
      setErrors((prev) => ({ ...prev, general: `Error creating mentor profile: ${error.message}. Please try again.` }));
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
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                {isUploading && (
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
                  Upload Profile Image
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
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  readOnly
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>
        );
      
      case "professional":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">
                  Expertise
                </label>
                <input
                  id="expertise"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.expertise && <p className="text-red-500 text-sm mt-1">{errors.expertise}</p>}
              </div>
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                  Degree
                </label>
                <input
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree}</p>}
              </div>
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                  Institution
                </label>
                <input
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
              </div>
              <div>
                <label htmlFor="year_of_experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  id="year_of_experience"
                  name="year_of_experience"
                  type="number"
                  value={formData.year_of_experience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.year_of_experience && <p className="text-red-500 text-sm mt-1">{errors.year_of_experience}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-1">
                Certifications
              </label>
              <input
                id="certifications"
                name="certifications"
                type="file"
                onChange={handleCertificationsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                multiple
              />
              {errors.certifications && <p className="text-red-500 text-sm mt-1">{errors.certifications}</p>}
            </div>
          </div>
        );

      case "additional":
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
              {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Mentor Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select mentor type</option>
                <option value="associate">Associate</option>
                <option value="chief">Chief</option>
                {/* <option value="life_skills">Life Skills</option> */}
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden relative z-10">
        <div className="px-4 py-5 sm:px-6 bg-blue-600">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
            Create Mentor Profile
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

export default CreateMentorProfile;


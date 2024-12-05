import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useDispatch } from 'react-redux';

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

export default function CreateStudentProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token) || localStorage.getItem('token');
  const dispatch = useDispatch();

  const { userRole, userId, userEmail, userName } = location.state || {};
  const [formData, setFormData] = useState({
    user_id: userId || '',
    name: userName || '',
    email: userEmail || '',
    image: null,
    dob: "",
    location: "",
    contact_number: "",
    school_code: "",
    school_name: "",
    class_level: "",
    subjects: [],
    sports: [],
    hobbies: [],
    gender: "",
    otherSubject: "",
    otherSport: "",
    otherHobby: "",
    otherSubjectsOpen: false,
    otherSportsOpen: false,
    otherHobbiesOpen: false,
  });

  const [activeTab, setActiveTab] = useState("basic");
  const tabs = ["basic", "personal", "education", "interests"];

  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [institutes, setInstitutes] = useState([]);
  const [customItems, setCustomItems] = useState({
    subjects: [],
    sports: [],
    hobbies: []
  });

  useEffect(() => {
    if (!token) {
      console.error("No token found. Redirecting to signup.");
      navigate('/signup');
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/institute/fetch", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch institutes');
        }
        const data = await response.json();
        setInstitutes(data.data);
      } catch (error) {
        console.error("Error fetching institutes:", error);
        setErrors(prev => ({ ...prev, institutes: "Failed to load institutes. Please try again." }));
      }
    };

    fetchInstitutes();
  }, [token]);

  const handleInputChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));

      if (file) {
        try {
          setUploadProgress(0);
          const uploadedImageUrl = await uploadImage(file);
          setImageUrl(uploadedImageUrl);
          setFormData((prev) => ({ ...prev, image: uploadedImageUrl }));
        } catch (error) {
          console.error("Image upload failed", error);
          setErrors((prev) => ({ ...prev, image: 'Failed to upload image. Please try again.' }));
        } finally {
          setUploadProgress(0);
        }
      } else {
        setImageUrl(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "name":
        if (value.trim().length < 2) {
          errorMsg = "Name must be at least 2 characters long.";
        }
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = "Please enter a valid email address.";
        }
        break;
      case "dob":
        if (!value) {
          errorMsg = "Date of birth is required.";
        }
        break;
      case "contact_number":
        if (!/^\d{10}$/.test(value)) {
          errorMsg = "Contact number must be exactly 10 digits.";
        }
        break;
      case "class_level":
        if (!/^\d+$/.test(value)) {
          errorMsg = "Class level must be a number.";
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

  const handleInterestChange = (type, value) => {
    setFormData((prev) => {
      const updatedArray = prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updatedArray };
    });
  };

  const handleAddOther = async (type) => {
    const otherValue = formData[`other${type.charAt(0).toUpperCase() + type.slice(1)}`];
    if (otherValue.trim()) {
      try {
        let apiUrl;
        switch (type) {
          case 'subjects':
            apiUrl = 'http://localhost:4000/api/master/subjects';
            break;
          case 'sports':
            apiUrl = 'http://localhost:4000/api/master/sports';
            break;
          case 'hobbies':
            apiUrl = 'http://localhost:4000/api/master/hobbies';
            break;
          default:
            throw new Error('Invalid type');
        }
        const response = await axios.post(apiUrl, { name: otherValue }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        // Process each item in the response array
        response.data.forEach(item => {
          if (item.newValue) {
            const newItem = {
              id: item.newValue.id,
              name: item.newValue.hobby_name || item.newValue.sport_name || item.newValue.subject_name || item.newValue.name
            };
            
            // Update formData with the new item's ID
            setFormData(prev => ({
              ...prev,
              [type]: [...prev[type], newItem.id],
              [`other${type.charAt(0).toUpperCase() + type.slice(1)}`]: "",
              [`other${type.charAt(0).toUpperCase() + type.slice(1)}Open`]: false,
            }));
            // Update customItems with the new item
            setCustomItems(prev => ({
              ...prev,
              [type]: [...prev[type], newItem]
            }));
          }
        });
      } catch (error) {
        console.error(`Error adding other ${type}:`, error);
        setErrors(prev => ({ ...prev, [type]: `Failed to add ${type}. Please try again.` }));
      }
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'atisha_preset');

    
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dz4xjnefv/image/upload`,
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
      console.error("Image upload failed", error);
      throw new Error('Image upload failed');
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
      navigate('/signup');
      return;
    }

    const requiredFields = [
      "user_id", "dob", "gender", "location", 
      "contact_number", "class_level", 
      "subjects", "sports", "hobbies"
    ];

    const missingFields = requiredFields.filter(field => 
      !formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)
    );

    if (missingFields.length > 0 || Object.values(errors).some(error => error)) {
      setErrors((prev) => ({
        ...prev,
        general: `Please fill in all required fields and correct any errors before submitting.`
      }));
      return; 
    }

    try {
      const dataToSend = {
        user_id: parseInt(formData.user_id),
        image: formData.image,
        dob: formData.dob,
        gender: formData.gender,
        location: formData.location,
        contact_number: formData.contact_number,
        school_code: formData.school_code,
        school_name: formData.school_name,
        class_level: parseInt(formData.class_level),
        subject_ids: formData.subjects,
        sport_ids: formData.sports,
        hobby_ids: formData.hobbies,
      };

      console.log("Sending data to server:", JSON.stringify(dataToSend, null, 2));

      const response = await fetch("http://localhost:4000/api/student/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response:", errorData);
        setErrors((prev) => ({ ...prev, general: `Error: ${errorData.message}` }));
        return;
      }

      const responseData = await response.json();
      console.log("Profile updated successfully", responseData);

      navigate(`/onboarding`);

    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors((prev) => ({ ...prev, general: `Error updating profile: ${error.message}. Please try again.` }));
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
                {imageUrl ? (
                  <img
                    src={imageUrl}
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
                  Upload Profile Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleInputChange}
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
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
              </div>
            </div>
          </div>
        );

      case "personal":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select 
                  id="gender" 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>
            </div>
          </div>
        );

      case "education":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="school_name" className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                <select 
                  id="school_name" 
                  name="school_name" 
                  value={formData.school_code || (formData.school_name ? "other" : "")} 
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "other") {
                      setFormData(prev => ({ ...prev, school_code: null, school_name: "" }));
                    } else {
                      setFormData(prev => ({ 
                        ...prev, 
                        school_code: value, 
                        school_name: null 
                      }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a school</option>
                  {institutes.map((institute) => (
                    <option key={institute.institute_code} value={institute.institute_code}>
                      {institute.institute_code} - {institute.school_name}
                    </option>
                  ))}
                  <option value="other">Other (Type your school name)</option>
                </select>
                {(formData.school_code === null || formData.school_name) && (
                  <input
                    type="text"
                    id="custom_school_name"
                    name="school_name"
                    value={formData.school_name || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, school_name: e.target.value }))}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your school name"
                    required
                  />
                )}
                {errors.school_name && <p className="text-red-500 text-sm mt-1">{errors.school_name}</p>}
              </div>
              <div>
                <label htmlFor="class_level" className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <input 
                  id="class_level" 
                  name="class_level" 
                  type="text" 
                  value={formData.class_level} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required 
                />
                {errors.class_level && <p className="text-red-500 text-sm mt-1">{errors.class_level}</p>}
              </div>
            </div>
          </div>
        );
      case "interests":
        const categories = [
          { name: "subjects", title: "Favorite Subjects", items: [
            { id: 1, name: "Mathematics" }, { id: 2, name: "Science" }, { id: 3, name: "Hindi" },
            { id: 4, name: "English" }, { id: 5, name: "Computer Science" }, { id: 6, name: "Social Studies" },
            { id: 7, name: "Sanskrit" }, { id: 8, name: "Arts" }, { id: 9, name: "Physics" }, { id: 10, name: "Chemistry" }
          ]},
          { name: "sports", title: "Sports", items: [
            { id: 1, name: "Cricket" }, { id: 2, name: "Football" }, { id: 3, name: "Basketball" },
            { id: 4, name: "Badminton" }, { id: 5, name: "Tennis" }, { id: 6, name: "Swimming" }
          ]},
          { name: "hobbies", title: "Hobbies", items: [
            { id: 1, name: "Reading" }, { id: 2, name: "Painting" }, { id: 3, name: "Dancing" },
            { id: 4, name: "Singing" }, { id: 5, name: "Photography" }, { id: 6, name: "Coding" }
          ]}
        ];

        return (
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category.name}>
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleInterestChange(category.name, item.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        formData[category.name].includes(item.id)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {item.name}
                    </div>
                  ))}
                  {customItems[category.name].map((item, index) => (
                    <div
                      key={`custom-${category.name}-${index}`}
                      className="p-3 rounded-lg cursor-pointer transition-all duration-300 bg-blue-500 text-white"
                    >
                      {item.name}
                    </div>
                  ))}
                  <div
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      formData[`other${category.name.charAt(0).toUpperCase() + category.name.slice(1)}Open`]
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, [`other${category.name.charAt(0).toUpperCase() + category.name.slice(1)}Open`]: !prev[`other${category.name.charAt(0).toUpperCase() + category.name.slice(1)}Open`] }))}
                  >
                    Others +
                  </div>
                  {formData[`other${category.name.charAt(0).toUpperCase() + category.name.slice(1)}Open`] && (
                    <div className="col-span-2 md:col-span-3">
                      <input
                        type="text"
                        placeholder={`Other ${category.name.slice(0, -1)}`}
                        value={formData[`other${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`]}
                        onChange={(e) => setFormData(prev => ({ ...prev, [`other${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`]: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddOther(category.name)}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
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
            Create Your Profile
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
}


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { User } from 'lucide-react';
import axios from 'axios';

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
  formData.append('file', file);
  formData.append('upload_preset', 'atisha_preset');

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dz4xjnefv/image/upload`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          progressSetter(percentCompleted);
        },
      }
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Image upload failed", error);
    throw new Error('Image upload failed');
  }
};

const CreateCounselorProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token) || localStorage.getItem('token');
  
  const { userId, userEmail, userName } = location.state || {};
  const [formData, setFormData] = useState({
    user_id: userId || '',
    name: userName || '',
    email: userEmail || '',
    image: null,
    dob: "",
    gender: "",
    location: "",
    contact_number: "",
    degree: "",
    degree_image: null,
    association: "",
    bio: "",
    year_of_experience: "",
    certificates: [],
    counselor_type: "",
    counselor_speciality: "",
    career_specialization: "",
  });

  const [activeTab, setActiveTab] = useState("basic");
  const tabs = ["basic", "professional", "additional"];
  
  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [profileImageProgress, setProfileImageProgress] = useState(0);
  const [degreeImageProgress, setDegreeImageProgress] = useState(0);

  useEffect(() => {
    if (!token) {
      console.error("No token found. Redirecting to signup.");
      navigate('/signup');
    }
  }, [token, navigate]);

  const handleInputChange = async (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));

      if (file) {
        try {
          const progressSetter = name === 'image' ? setProfileImageProgress : setDegreeImageProgress;
          progressSetter(0);
          const uploadedImageUrl = await uploadImage(file, progressSetter);
          setFormData((prev) => ({ ...prev, [name]: uploadedImageUrl }));
          if (name === 'image') {
            setImageUrl(uploadedImageUrl);
          }
        } catch (error) {
          console.error("Image upload failed", error);
          setErrors((prev) => ({ ...prev, [name]: 'Failed to upload image. Please try again.' }));
        } finally {
          const progressSetter = name === 'image' ? setProfileImageProgress : setDegreeImageProgress;
          progressSetter(0);
        }
      } else {
        if (name === 'image') {
          setImageUrl(null);
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "contact_number":
        if (!/^\d{10}$/.test(value)) {
          errorMsg = "Contact number must be exactly 10 digits.";
        }
        break;
      case "year_of_experience":
        if (!/^\d+$/.test(value)) {
          errorMsg = "Years of experience must be a number.";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (activeTab !== tabs[tabs.length - 1]) {
      handleNext();
      return;
    }

    const requiredFields = [
      "user_id", "dob", "gender", "location", "contact_number",
      "degree", "degree_image", "association", "bio", 
      "year_of_experience", "counselor_type", "counselor_speciality"
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0 || Object.values(errors).some(error => error)) {
      setErrors((prev) => ({
        ...prev,
        general: `Please fill in all required fields and correct any errors before submitting.`
      }));
      return;
    }

    if (formData.counselor_speciality === 'career' && !formData.career_specialization) {
      setErrors((prev) => ({
        ...prev,
        career_specialization: "Career specialization is required when counselor specialty is 'career'."
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
        degree: formData.degree,
        degree_image: formData.degree_image,
        association: formData.association,
        bio: formData.bio,
        year_of_experience: parseInt(formData.year_of_experience),
        certificates: [],
        counselor_type: formData.counselor_type,
        counselor_speciality: formData.counselor_speciality,
        career_specialization:
          formData.counselor_speciality === 'career' ? 
          formData.career_specialization.split(',').map(item => item.trim()) : [],
      };

      console.log("Sending data to server:", JSON.stringify(dataToSend, null, 2));

      const response = await fetch("http://localhost:4000/api/counselor/create", {
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
      console.log("Counselor profile created successfully", responseData);
      navigate(`/onboarding`);
      
    } catch (error) {
      console.error("Error creating counselor profile:", error);
      setErrors((prev) => ({ ...prev, general: `Error creating counselor profile: ${error.message}. Please try again.` }));
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
                    <User className="w-12 h-12" />
                  </div>
                )}
                {profileImageProgress > 0 && profileImageProgress < 100 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                    <div className="absolute text-white font-bold">{profileImageProgress}%</div>
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
                  readOnly
                />
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
        
      case "professional":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <input 
                  id="degree" 
                  name="degree" 
                  value={formData.degree} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required 
                  placeholder="e.g., Master's in Counseling" 
                />
                {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree}</p>}
              </div>

              <div>
                <label htmlFor="degree_image" className="block text-sm font-medium text-gray-700 mb-1">Degree Image</label>
                <input 
                  id="degree_image" 
                  name="degree_image" 
                  type="file" 
                  onChange={handleInputChange} 
                  accept=".jpg,.jpeg,.png" 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.degree_image && (
                  <div className="mt-2 relative">
                    <img src={formData.degree_image} alt="Degree" className="w-full h-32 object-cover rounded-md" />
                    {degreeImageProgress > 0 && degreeImageProgress < 100 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                        <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                        <div className="absolute text-white font-bold">{degreeImageProgress}%</div>
                      </div>
                    )}
                  </div>
                )}
                {errors.degree_image && <p className="text-red-500 text-sm mt-1">{errors.degree_image}</p>}
              </div>

              <div>  
                <label htmlFor="association" className="block text-sm font-medium text-gray-700 mb-1">Professional Association</label> 
                <input 
                  id="association" 
                  name="association" 
                  value={formData.association} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required 
                  placeholder="e.g., American Counseling Association" 
                /> 
                {errors.association && <p className="text-red-500 text-sm mt-1">{errors.association}</p>}
              </div> 

              <div> 
                <label htmlFor="year_of_experience" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label> 
                <input 
                  id="year_of_experience" 
                  name="year_of_experience" 
                  type="number" 
                  value={formData.year_of_experience} 
                  onChange={handleInputChange} 
                  min="0" 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                /> 
                {errors.year_of_experience && <p className="text-red-500 text-sm mt-1">{errors.year_of_experience}</p>}
              </div> 

              <div>
                <label htmlFor="counselor_type" className="block text-sm font-medium text-gray-700 mb-1">Counselor Type</label>
                <select 
                  id="counselor_type" 
                  name="counselor_type" 
                  value={formData.counselor_type} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Counselor Type</option>
                  <option value="private">Private</option>
                  <option value="govt">Government</option>
                  <option value="fresher">Fresher</option>
                </select>
                {errors.counselor_type && <p className="text-red-500 text-sm mt-1">{errors.counselor_type}</p>}
              </div>

              <div>
                <label htmlFor="counselor_speciality" className="block text-sm font-medium text-gray-700 mb-1">Counselor Speciality</label>
                <select 
                  id="counselor_speciality" 
                  name="counselor_speciality" 
                  value={formData.counselor_speciality} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Speciality</option>
                  <option value='mentalHealth'>Mental Health</option>
                  <option value='career'>Career</option>
                  <option value='parenting'>Parenting</option>
                </select>
                {errors.counselor_speciality && <p className="text-red-500 text-sm mt-1">{errors.counselor_speciality}</p>}
              </div>

              {formData.counselor_speciality === 'career' && (
                <div className='sm:col-span-2'>
                  <label htmlFor='career_specialization' className='block text-sm font-medium text-gray-700 mb-1'>Career Specialization (comma-separated)</label>
                  <input
                    id='career_specialization'
                    name='career_specialization'
                    type='text'
                    placeholder='e.g., Software Engineer, Data Scientist'
                    onChange={handleInputChange}
                    value={formData.career_specialization}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  {errors.career_specialization && <p className="text-red-500 text-sm mt-1">{errors.career_specialization}</p>}
                </div>
              )}
            </div>
          </div>
        );
      case "additional": 
        return ( 
          <div className="space-y-6"> 
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2"> 
              <div> 
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label> 
                <input 
                  id="location" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                /> 
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div> 

              <div> 
                <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label> 
                <input 
                  id="contact_number" 
                  name="contact_number" 
                  type="tel" 
                  value={formData.contact_number} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                {errors.contact_number && <p className="text-red-500 text-sm mt-1">{errors.contact_number}</p>}
              </div> 

              <div className='sm:col-span-2'>
                <label htmlFor='bio' className='block text-sm font-medium text-gray-700 mb-1'>Bio</label>
                <textarea
                  id='bio'
                  name='bio'
                  rows='4'
                  value={formData.bio}
                  onChange={handleInputChange}
                  required
                  placeholder='Brief description of your experience and expertise'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                ></textarea>
                {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
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
            Create Your Counselor Profile
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

export default CreateCounselorProfile;


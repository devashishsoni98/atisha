import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { User, ChevronRight, ChevronLeft } from 'lucide-react';
import axios from 'axios';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 }
};

const CreateCounselorProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token) || localStorage.getItem('token');
  
  const { userId } = location.state || {};
  const [formData, setFormData] = useState({
    user_id: userId || '',
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

  useEffect(() => {
    if (!token) {
      console.error("No token found. Redirecting to signup.");
      navigate('/signup');
    }
  }, [token, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'atisha_preset');

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/dz4xjnefv/image/upload`, formData);
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

    const requiredFields = [
      "user_id", "dob", "gender", "location", "contact_number",
      "degree", "degree_image", "association", "bio", 
      "year_of_experience", "counselor_type", "counselor_speciality"
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }

    if (formData.counselor_speciality === 'career' && !formData.career_specialization) {
      alert("Career specialization is required when counselor specialty is 'career'.");
      return;
    }

    try {
      let imageUrl = null;
      let degreeImageUrl = null;

      if (formData.image) {
        imageUrl = await uploadImage(formData.image);
      }

      if (formData.degree_image) {
        degreeImageUrl = await uploadImage(formData.degree_image);
      }

      const dataToSend = {
        user_id: parseInt(formData.user_id),
        image: imageUrl,
        dob: formData.dob,
        gender: formData.gender,
        location: formData.location,
        contact_number: formData.contact_number,
        degree: formData.degree,
        degree_image: degreeImageUrl,
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
        alert(`Error: ${errorData.message}`);
        return;
      }

      const responseData = await response.json();
      
      console.log("Counselor profile created successfully", responseData);
      
      navigate(`/onboarding`);
      
    } catch (error) {
      console.error("Error creating counselor profile:", error);
      alert(`Error creating counselor profile: ${error.message}. Please try again.`);
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
          <motion.div
            key="basic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <div className="w-32 h-32 bg-blue-100 rounded-full overflow-hidden">
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-16 h-16 text-blue-500" />
                  </div>
                )}
              </div>
              <div className="w-full sm:w-auto">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input id="dob" name="dob" type="date" value={formData.dob} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
        
      case "professional":
        return (
          <motion.div
            key="professional"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <input id="degree" name="degree" value={formData.degree} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required placeholder="e.g., Master's in Counseling" />
              </div>

              <div>
                <label htmlFor="degree_image" className="block text-sm font-medium text-gray-700 mb-1">Degree Image</label>
                <input id="degree_image" name="degree_image" type="file" onChange={handleInputChange} accept=".jpg,.jpeg,.png" required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              </div>

              <div>  
                <label htmlFor="association" className="block text-sm font-medium text-gray-700 mb-1">Professional Association</label> 
                <input id="association" name="association" value={formData.association} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required placeholder="e.g., American Counseling Association" /> 
              </div> 

              <div> 
                <label htmlFor="year_of_experience" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label> 
                <input id="year_of_experience" name="year_of_experience" type="number" value={formData.year_of_experience} onChange={handleInputChange} min="0" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> 
              </div> 

              <div>
                <label htmlFor="counselor_type" className="block text-sm font-medium text-gray-700 mb-1">Counselor Type</label>
                <select id="counselor_type" name="counselor_type" value={formData.counselor_type} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="">Select Counselor Type</option>
                  <option value="private">Private</option>
                  <option value="govt">Government</option>
                  <option value="fresher">Fresher</option>
                </select>
              </div>

              <div>
                <label htmlFor="counselor_speciality" className="block text-sm font-medium text-gray-700 mb-1">Counselor Speciality</label>
                <select id="counselor_speciality" name="counselor_speciality" value={formData.counselor_speciality} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="">Select Speciality</option>
                  <option value='mentalHealth'>Mental Health</option>
                  <option value='career'>Career</option>
                  <option value='parenting'>Parenting</option>
                </select>
              </div>

              {formData.counselor_speciality === 'career' && (
                <div className='sm:col-span-2'>
                  <label htmlFor='career_specialization' className='block text-sm font-medium text-gray-700 mb-1'>Career Specialization (comma-separated)</label>
                  <input
                    id='career_specialization'
                    name='career_specialization'
                    type='text'
                    placeholder='e.g., Software Engineer, Data Scientist'
                    onChange={(e) => setFormData({ ...formData, career_specialization: e.target.value })}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  />
                </div>
              )}
            </div>
          </motion.div> 
        );
      case "additional": 
        return ( 
          <motion.div
            key="additional"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          > 
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2"> 
              <div> 
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label> 
                <input id="location" name="location" value={formData.location} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> 
              </div> 

              <div> 
                <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label> 
                <input id="contact_number" name="contact_number" type="tel" value={formData.contact_number} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-3-500 sm:text-sm" />
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
                  className='mt-1 block w-full rounded-md border-gray-3-500 sm:text-sm'
                ></textarea>
              </div>
            </div> 
          </motion.div> 
        ); 
      default:
        return null; 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="lg:flex">
            {/* Sidebar */}
            <motion.div 
              className="lg:w-64 bg-blue-50 p-8"
              initial="initial"
              animate="animate"
              variants={slideIn}
            >
              <div className="flex flex-col items-center mb-8">
                <motion.div
                  className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-lg mb-4 overflow-hidden"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  {formData.image ? (
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                      <User className="w-12 h-12 text-blue-500" />
                    </div>
                  )}
                </motion.div>
                <motion.h2 className="text-xl font-bold text-blue-800" variants={fadeIn}>Counselor Profile</motion.h2>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full py-3 px-4 rounded-xl text-left transition-colors ${
                      activeTab === tab
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-blue-100 text-gray-700'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </nav>
            </motion.div>

            {/* Main Content */}
            <motion.div 
              className="flex-1 p-8 lg:p-12" 
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-8">Create Counselor Profile</h2>
                
                <AnimatePresence mode="wait">
                  {renderTabContent()}
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                  {activeTab !== tabs[0] && (
                    <motion.button
                      type='button'
                      onClick={handlePrevious}
                      className='px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 flex items-center'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Previous
                    </motion.button>
                  )}
                  <motion.button
                    type='submit'
                    className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center ml-auto'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeTab === tabs[tabs.length - 1] ? 'Submit' : 'Next'}
                    {activeTab !== tabs[tabs.length - 1] && <ChevronRight className="w-5 h-5 ml-2" />}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCounselorProfile;


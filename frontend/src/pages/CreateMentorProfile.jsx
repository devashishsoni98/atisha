import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { setToken } from '../store/userActions';// Import useDispatch
import { useSelector } from "react-redux";

const CreateMentorProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token) || localStorage.getItem('token'); // Access token from Redux

  
  const { userRole, userId, userEmail, userName } = location.state || {};
  const [formData, setFormData] = useState({
    userId: userId || '',
    name: userName || '',
    email: userEmail || '',
    expertise: "",
    bio: "",
    certifications: [],
    degree: "",
    institution: "",
    yearOfExperience: "",
    type: "",
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
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleCertificationsChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      certifications: files,
    }));
  };

  const uploadCertifications = async (files) => {
    const uploadedUrls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'atisha_preset');

      try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/dz4xjnefv/image/upload`, formData);
        uploadedUrls.push(response.data.secure_url);
      } catch (error) {
        console.error("Certification upload failed", error);
        throw new Error('Certification upload failed');
      }
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (activeTab !== tabs[tabs.length - 1]) {
      handleNext();
      return;
    }
  
    if (!formData.userId) {
      alert("User ID is missing. Please try signing up again.");
      navigate('/signup');
      return;
    }
  
    const requiredFields = [
      "userId", "expertise", "bio", "degree", "institution", "yearOfExperience", "type"
    ];
  
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }
  
    try {
      let certificationUrls = [];
      if (formData.certifications.length > 0) {
        certificationUrls = await uploadCertifications(formData.certifications);
      }
  
      const dataToSend = {
        userId: parseInt(formData.userId),
        expertise: formData.expertise,
        bio: formData.bio,
        certifications: certificationUrls,
        degree: formData.degree,
        institution: formData.institution,
        yearOfExperience: parseInt(formData.yearOfExperience),
        type: formData.type,
      };
  
      console.log("Sending data to server:", JSON.stringify(dataToSend, null, 2));
  
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:4000/api/mentor/create", {
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
      console.log("Mentor profile created successfully", responseData);
      
      navigate(`/onboarding`);
      
    } catch (error) {
      console.error("Error creating mentor profile:", error);
      alert(`Error creating mentor profile: ${error.message}. Please try again.`);
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="expertise"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Expertise
                </label>
                <input
                  id="expertise"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  placeholder="e.g., Software Development"
                />
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mentor Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Select type</option>
                  <option value="chief">Chief</option>
                  <option value="associate">Associate</option>
                  {/* <option value="junior">Junior</option> */}
                </select>
              </div>
            </div>
          </div>
        );
      case "professional":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="degree"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Degree
                </label>
                <input
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  placeholder="e.g., Master's in Computer Science"
                />
              </div>
              <div>
                <label
                  htmlFor="institution"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Institution
                </label>
                <input
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  placeholder="e.g., University of Technology"
                />
              </div>
              <div>
                <label
                  htmlFor="yearOfExperience"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Years of Experience
                </label>
                <input
                  id="yearOfExperience"
                  name="yearOfExperience"
                  type="number"
                  value={formData.yearOfExperience}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  min="0"
                />
              </div>
              <div>
                <label
                  htmlFor="certifications"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Certifications
                </label>
                <input
                  id="certifications"
                  name="certifications"
                  type="file"
                  onChange={handleCertificationsChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  multiple
                  accept="image/*,.pdf"
                />
              </div>
            </div>
          </div>
        );
      case "additional":
        return (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
                placeholder="Brief description of your experience and expertise"
              ></textarea>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-blue-600">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
            Create Mentor Profile
          </h2>
        </div>
        <div className="border-t border-gray-200">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-center mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 mx-2 py-2 font-medium text-sm rounded-full transition-all duration-300 ease-in-out ${
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
            <div className="px-4 py-4 sm:px-6 flex justify-between">
              {activeTab !== tabs[0] && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
    </div>
  );
};

export default CreateMentorProfile;


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector } from "react-redux";

const CreateCounselorProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token) || localStorage.getItem('token'); // Access token from Redux
  
  const { userRole, userId, userEmail, userName } = location.state || {};
  const [formData, setFormData] = useState({
    user_id: userId || '', // Changed to match API requirement
    name: userName || '',
    email: userEmail || '',
    image: null,
    dob: "",
    gender: "",
    location: "",
    contact_number: "", // Changed to match API requirement
    degree: "",
    certificate: "",
    association: "",
    bio: "",
    year_of_experience: "", // Changed to match API requirement
    domain: "",
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
  
    if (!formData.user_id) { // Changed to match API requirement
      alert("User ID is missing. Please try signing up again.");
      navigate('/signup');
      return;
    }
  
    const requiredFields = [
      "user_id", "dob", "gender", "location", "contact_number", // Changed to match API requirement
      "degree", "certificate", "association", "bio", "year_of_experience", "domain"
    ];
  
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }
  
    try {
      let imageUrl = null;
  
      if (formData.image) {
        imageUrl = await uploadImage(formData.image);
      }
  
      // Prepare data according to the API requirements
      const dataToSend = {
        user_id: parseInt(formData.user_id), // Changed to match API requirement
        image: imageUrl,
        dob: formData.dob,
        gender: formData.gender,
        location: formData.location,
        contact_number: formData.contact_number, // Changed to match API requirement
        degree: formData.degree,
        certificate: formData.certificate,
        association: formData.association,
        bio: formData.bio,
        year_of_experience: parseInt(formData.year_of_experience), // Changed to match API requirement
        domain: formData.domain,
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
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                {formData.image && (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Profile Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-300 ease-in-out"
                  accept="image/*"
                />
              </div>
            </div>
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
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
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
                  placeholder="e.g., Masters in Psychology"
                />
              </div>
              <div>
                <label
                  htmlFor="certificate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Certificate
                </label>
                <input
                  id="certificate"
                  name="certificate"
                  value={formData.certificate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                 placeholder="e.g., Licensed Professional Counselor" 
               />
              </div> 
              <div>
                 <label htmlFor="association" 
                 className= "block text-sm font-medium text-gray-700 mb -1">Professional Association</label> 
                 <input id= "association" 
                 name= "association" 
                 value= {formData.association} 
                 onChange= {handleInputChange} 
                 className= "mt -1 block w-full rounded-md border-gray -300 shadow-sm focus:ring-blue -500 focus:border-blue -500 sm:text-sm" 
                 required placeholder= "e.g., American Counseling Association" /> 
             </div> 
             <div> 
               <label htmlFor= "yearOfExperience" 
               className= "block text-sm font-medium text-gray -700 mb -1">Years of Experience</label> 
               <input id= "yearOfExperience" 
               name= "year_of_experience" // Changed to match API requirement 
               type= "number" 
               value= {formData.year_of_experience} // Changed to match API requirement 
               onChange= {handleInputChange} 
               className= "mt -1 block w-full rounded-md border-gray -300 shadow-sm focus:ring-blue -500 focus:border-blue -500 sm:text-sm" 
               required min= "0" /> 
             </div> 
           </div> 
         </div> 
       ); 
     case "additional": 
       return ( 
         <div className= "space-y -6"> 
           <div className= "grid grid-cols -1 gap -6 sm:grid-cols -2"> 
             <div> 
               <label htmlFor= "location" 
               className= "block text-sm font-medium text-gray -700 mb -1">Location</label> 
               <input id= "location" 
               name= "location" 
               value= {formData.location} 
               onChange= {handleInputChange} 
               className= "mt -1 block w-full rounded-md border-gray -300 shadow-sm focus:ring-blue -500 focus:border-blue -500 sm:text-sm" required /> 
             </div> 

             <div> 

               <label htmlFor= "contactNumber" 

               className= "block text-sm font-medium text-gray -700 mb -1">Contact Number</label> 

               <input id= "contactNumber" 

               name= "contact_number" // Changed to match API requirement 

               type= "tel" 

               value= {formData.contact_number} // Changed to match API requirement 

               onChange= {handleInputChange} 

               className= "mt -1 block w-full rounded-md border-gray -300 shadow-sm focus:ring-blue -500 focus:border-blue -500 sm:text-sm" 

               required /> 

             </div> 
              <div className="sm:col-span-2">
                <label
                  htmlFor="domain"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Domain of Expertise
                </label>
                <input
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  placeholder="e.g., Mental Health, Career Counseling"
                />
              </div>
              <div className="sm:col-span-2">
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
            Create Counselor Profile
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

export default CreateCounselorProfile;


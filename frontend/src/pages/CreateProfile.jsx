import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from 'react-router-dom';

const CreateProfile = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  
  // Accessing the passed state
  const { userRole, userId, userEmail, userName } = location.state || {};
  const [formData, setFormData] = useState({
    name: userName,
    email: userEmail,
    profileImage: null,
    dob: "",
    gender: "",
    location: "",
    contactNumber: "",
    schoolName: "",
    classLevel: "",
    subjectIds: [],
    sportIds: [],
    hobbyIds: [],
    degree: "",
    certificate: "",
    association: "",
    bio: "",
    yearOfExperience: "",
    domain: "",
    address: "",
    establishYear: "",
    instituteType: "",
    studentBody: "",
    subjects: "",
    specialPrograms: "",
    languageOffer: "",
    certificateAndAffiliation: "",
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [isFormValid, setIsFormValid] = useState(false);

  // Master data for interests
  const subjects = [
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Science" },
    { id: 3, name: "Hindi" },
    { id: 4, name: "English" },
    { id: 5, name: "Computer Science" },
    { id: 6, name: "Social Studies" },
    { id: 7, name: "Sanskrit" },
    { id: 8, name: "Arts" },
    { id: 9, name: "Physics" },
    { id: 10, name: "Chemistry" },
  ];

  const sports = [
    { id: 1, name: "Cricket" },
    { id: 2, name: "Football" },
    { id: 3, name: "Basketball" },
    { id: 4, name: "Badminton" },
    { id: 5, name: "Tennis" },
    { id: 6, name: "Swimming" },
  ];

  const hobbies = [
    { id: 1, name: "Reading" },
    { id: 2, name: "Painting" },
    { id: 3, name: "Dancing" },
    { id: 4, name: "Singing" },
    { id: 5, name: "Photography" },
    { id: 6, name: "Coding" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleInterestChange = (type, id) => {
    setFormData((prev) => ({
      ...prev,
      [`${type}Ids`]: prev[`${type}Ids`].includes(id)
        ? prev[`${type}Ids`].filter((item) => item !== id)
        : [...prev[`${type}Ids`], id],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isFormValid) {
        const formDataToSend = new FormData();
        formDataToSend.append("userId", userId);
        formDataToSend.append("image", formData.profileImage); // Append image file
        formDataToSend.append("dob", formData.dob);
        formDataToSend.append("gender", formData.gender);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("contactNumber", formData.contactNumber);
        formDataToSend.append("schoolName", formData.schoolName);
        formDataToSend.append("classLevel", formData.classLevel); // Adjusted to match backend field name
        formDataToSend.append("subjectIds", JSON.stringify(formData.subjectIds)); // Convert arrays to JSON strings
        formDataToSend.append("sportIds", JSON.stringify(formData.sportIds));
        formDataToSend.append("hobbyIds", JSON.stringify(formData.hobbyIds));

        try {
            const response = await fetch("http://localhost:4000/api/students", { // Update with your actual endpoint
                method: "POST",
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const responseData = await response.json(); // Assuming your API returns the updated user data
            // Redirecting to the dashboard with account type and user ID
            navigate(`/dashboard/${userRole}/${responseData.id}`);

            // Handle success (e.g., show notification, redirect)
            console.log("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
            // Handle error (e.g., show error message)
        }
    }
};

  useEffect(() => {
    const validateForm = () => {
      const requiredFields = [
        "dob",
        "gender",
        "location",
        "contactNumber",
        "schoolName",
        "classLevel"
      ];

      if (userRole === "student") {
        requiredFields.push("schoolName", "classLevel");
        const hasInterests =
          formData.subjectIds.length > 0 ||
          formData.sportIds.length > 0 ||
          formData.hobbyIds.length > 0;
      } else if (userRole === "counselor") {
        requiredFields.push(
          "degree",
          "certificate",
          "association",
          "bio",
          "yearOfExperience",
          "domain"
        );
      } else if (userRole === "institute") {
        requiredFields.push(
          "address",
          "establishYear",
          "instituteType",
          "studentBody",
          "subjects",
          "specialPrograms",
          "languageOffer",
          "certificateAndAffiliation"
        );
      }

      const isValid = requiredFields.every((field) => formData[field] !== "");
      setIsFormValid(isValid);
    };

    validateForm();
  }, [formData, userRole]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                {formData.profileImage && (
                  <img
                    src={URL.createObjectURL(formData.profileImage)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Profile Image
                </label>
                <input
                  id="profileImage"
                  name="profileImage"
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
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-gray-100 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  required
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-md font-medium text-gray-700 mb-1 "
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out bg-gray-100"
                  required
                  readOnly
                />
              </div>
            </div>
          </motion.div>
        );
      case "personal":
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
                  htmlFor="dob"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contactNumber"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Contact Number
                </label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  required
                />
              </div>
            </div>
          </motion.div>
        );
      case "role-specific":
        if (userRole === "student") {
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
                    htmlFor="schoolName"
                    className="block text-md font-medium text-gray-700 mb-1"
                  >
                    School Name
                  </label>
                  <input
                    id="schoolName"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="class"
                    className="block text-md font-medium text-gray-700 mb-1"
                  >
                    Class
                  </label>
                  <input
                    id="class"
                    name="class"
                    type="number"
                    value={formData.class}
                    onChange={handleInputChange}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    required
                  />
                </div>
              </div>
            </motion.div>
          );
        }
        return null;
      case "interests":
        if (userRole === "student") {
          return (
            // <motion.div
            //   initial={{ opacity: 0, y: 20 }}
            //   animate={{ opacity: 1, y: 0 }}
            //   transition={{ duration: 0.5 }}
            //   className="space-y-8"
            // >
            //   <div>
            //     <h3 className="text-lg font-medium text-gray-700 mb-4">Favorite Subjects</h3>
            //     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            //       {subjects.map(subject => (
            //         <div
            //           key={subject.id}
            //           onClick={() => handleInterestChange('subject', subject.id)}
            //           className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            //             formData.subjectIds.includes(subject.id)
            //               ? 'bg-blue-500 text-white'
            //               : 'bg-gray-100 hover:bg-gray-200'
            //           }`}
            //         >
            //           {subject.name}
            //         </div>
            //       ))}
            //     </div>
            //   </div>

            //   <div>
            //     <h3 className="text-lg font-medium text-gray-700 mb-4">Sports</h3>
            //     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            //       {sports.map(sport => (
            //         <div
            //           key={sport.id}
            //           onClick={() => handleInterestChange('sport', sport.id)}
            //           className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            //             formData.sportIds.includes(sport.id)
            //               ? 'bg-blue-500 text-white'
            //               : 'bg-gray-100 hover:bg-gray-200'
            //           }`}
            //         >
            //           {sport.name}
            //         </div>
            //       ))}
            //     </div>
            //   </div>

            //   <div>
            //     <h3 className="text-lg font-medium text-gray-700 mb-4">Hobbies</h3>
            //     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            //       {hobbies.map(hobby => (
            //         <div
            //           key={hobby.id}
            //           onClick={() => handleInterestChange('hobby', hobby.id)}
            //           className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            //             formData.hobbyIds.includes(hobby.id)
            //               ? 'bg-blue-500 text-white'
            //               : 'bg-gray-100 hover:bg-gray-200'
            //           }`}
            //         >
            //           {hobby.name}
            //         </div>
            //       ))}
            //     </div>
            //   </div>
            // </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Favorite Subjects
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {subjects.map((subject) => (
                    <div
                      key={subject.id}
                      onClick={() =>
                        handleInterestChange("subject", subject.id)
                      }
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.subjectIds.includes(subject.id)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {subject.name}
                    </div>
                  ))}
                  {formData.showOtherSubject ? (
                    <div className="p-2">
                      <input
                        type="text"
                        name="otherSubject"
                        value={formData.otherSubject}
                        onChange={handleInputChange}
                        placeholder="Enter subject"
                        className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          showOtherSubject: true,
                        }))
                      }
                      className="p-3 rounded-lg cursor-pointer transition-all duration-300 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    >
                      + Other
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Sports
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {sports.map((sport) => (
                    <div
                      key={sport.id}
                      onClick={() => handleInterestChange("sport", sport.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.sportIds.includes(sport.id)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {sport.name}
                    </div>
                  ))}
                  {formData.showOtherSport ? (
                    <div className="p-2">
                      <input
                        type="text"
                        name="otherSport"
                        value={formData.otherSport}
                        onChange={handleInputChange}
                        placeholder="Enter sport"
                        className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          showOtherSport: true,
                        }))
                      }
                      className="p-3 rounded-lg cursor-pointer transition-all duration-300 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    >
                      + Other
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Hobbies
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hobbies.map((hobby) => (
                    <div
                      key={hobby.id}
                      onClick={() => handleInterestChange("hobby", hobby.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.hobbyIds.includes(hobby.id)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {hobby.name}
                    </div>
                  ))}
                  {formData.showOtherHobby ? (
                    <div className="p-2">
                      <input
                        type="text"
                        name="otherHobby"
                        value={formData.otherHobby}
                        onChange={handleInputChange}
                        placeholder="Enter hobby"
                        className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          showOtherHobby: true,
                        }))
                      }
                      className="p-3 rounded-lg cursor-pointer transition-all duration-300 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    >
                      + Other
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        } else if (userRole === "counselor") {
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
                    htmlFor="degree"
                    className="block text-md font-medium text-gray-700 mb-1"
                  >
                    Degree
                  </label>
                  <input
                    id="degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="certificate"
                    className="block text-md font-medium text-gray-700 mb-1"
                  >
                    Certificate
                  </label>
                  <input
                    id="certificate"
                    name="certificate"
                    value={formData.certificate}
                    onChange={handleInputChange}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="association"
                    className="block text-md font-medium text-gray-700 mb-1"
                  >
                    Association
                  </label>
                  <input
                    id="association"
                    name="association"
                    value={formData.association}
                    onChange={handleInputChange}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="yearOfExperience"
                    className="block text-md font-medium text-gray-700 mb-1"
                  >
                    Years of Experience
                  </label>
                  <input
                    id="yearOfExperience"
                    name="yearOfExperience"
                    type="number"
                    value={formData.yearOfExperience}
                    onChange={handleInputChange}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="domain"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Domain
                </label>
                <input
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  required
                ></textarea>
              </div>
            </motion.div>
          );
        } else if (userRole === "institute") {
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
                  <input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="establishYear"
                    className="block text-md font-medium text-gray-700 mb-1"
                  >
                    Establishment Year
                  </label>
                  <input
                    id="establishYear"
                    name="establishYear"
                    type="number"
                    value={formData.establishYear}
                    onChange={handleInputChange}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="instituteType"
                    className="block text-md font-medium text-gray-700 mb-1"
                  >
                    Institute Type
                  </label>
                  <select
                    id="instituteType"
                    name="instituteType"
                    value={formData.instituteType}
                    onChange={handleInputChange}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    required
                  >
                    <option value="">Select institute type</option>
                    <option value="private">Private</option>
                    <option value="govt">Government</option>
                    <option value="semi-govt">Semi-Government</option>
                    <option value="public">Public</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="studentBody"
                    className="block text-md font-medium text-gray-700 mb-1"
                  >
                    Student Body
                  </label>
                  <input
                    id="studentBody"
                    name="studentBody"
                    value={formData.studentBody}
                    onChange={handleInputChange}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subjects"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Subjects Offered
                </label>
                <textarea
                  id="subjects"
                  name="subjects"
                  value={formData.subjects}
                  onChange={handleInputChange}
                  rows="3"
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="specialPrograms"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Special Programs
                </label>
                <textarea
                  id="specialPrograms"
                  name="specialPrograms"
                  value={formData.specialPrograms}
                  onChange={handleInputChange}
                  rows="3"
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="languageOffer"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Languages Offered
                </label>
                <textarea
                  id="languageOffer"
                  name="languageOffer"
                  value={formData.languageOffer}
                  onChange={handleInputChange}
                  rows="3"
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="certificateAndAffiliation"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Certificates and Affiliations
                </label>
                <textarea
                  id="certificateAndAffiliation"
                  name="certificateAndAffiliation"
                  value={formData.certificateAndAffiliation}
                  onChange={handleInputChange}
                  rows="3"
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                ></textarea>
              </div>
            </motion.div>
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden"
      >
        <div className="px-4 py-5 sm:px-6 bg_primary_color">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
            Create Your Profile
          </h2>
        </div>
        <div className="border-t border-gray-200">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-center mb-6">
                {["basic", "personal", "role-specific", "interests"].map(
                  (tab) => (
                    <motion.button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 mx-8 py-2 font-medium text-md rounded-full transition-all duration-300 ease-in-out ${
                        activeTab === tab
                          ? "bg_light_primary_color text-white shadow-lg"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tab === "role-specific"
                        ? `${
                            userRole.charAt(0).toUpperCase() + userRole.slice(1)
                          } Info`
                        : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </motion.button>
                  )
                )}
              </div>
              <div className="bg-gray-50 rounded-xl p-6 shadow-inner min-h-[400px]">
                {renderTabContent()}
              </div>
            </div>
            <div className="px-4 py-4 sm:px-6">
              <motion.button
                type="submit"
                className={`w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-full text-white ${
                  isFormValid
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out`}
                disabled={!isFormValid}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Profile
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateProfile;

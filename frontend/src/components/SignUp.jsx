import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Building2, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  setToken,
  setUserId,
  setUserType,
  setUserName,
} from "../store/userActions";

const SignUp = ({ setAuthType }) => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState("Student");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const options = [
    { id: "Student", label: "Student", icon: GraduationCap },
    { id: "Institute", label: "Institute", icon: Building2 },
    { id: "Counselor", label: "Counselor", icon: User },
    { id: "Mentor", label: "Mentor", icon: User },
  ];

  const handleRegister = async (data) => {
    const { fullName, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const accountType = selectedType.toLowerCase();
    const userData = { fullName, email, password, accountType };
    console.log("Data sent to API:", userData);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/users/signup",
        userData
      );
      const { userId, token, user } = response.data;

      const userName = user.name;
      // console.log(userName);

      dispatch(setToken(token)); // Store token in Redux
      dispatch(setUserId(userId)); // Store user ID in localStorage
      dispatch(setUserType(accountType)); // Store user type in localStorage
      dispatch(setUserName(userName)); //store user name in redux

      // Navigate based on account type
      if (accountType === "institute") {
        navigate("/create-institute-profile", {
          state: {
            userRole: accountType,
            userId: userId,
            userEmail: email,
            userName: fullName,
          },
        });
      } else if (accountType === "counselor") {
        navigate("/create-counselor-profile", {
          state: {
            userRole: accountType,
            userId: userId,
            userEmail: email,
            userName: fullName,
          },
        });
      } else if (accountType === "mentor") {
        navigate("/create-mentor-profile", {
          state: {
            userRole: accountType,
            userId: userId,
            userEmail: email,
            userName: fullName,
          },
        });
      } else {
        // Default case for "student"
        navigate(`/create-student-profile`, {
          state: {
            userRole: accountType,
            userId: userId,
            userEmail: email,
            userName: fullName,
          },
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center w-full min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #EBF4FF 0%, #FFFFFF 50%, #FAF5FF 100%)",
        position: "relative",
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at center, #4A5568 2px, transparent 2px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative bg-white/90 backdrop-blur-sm w-full max-w-2xl p-12 rounded-2xl shadow-xl m-8"
      >
        <motion.h1
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 text-center text-4xl font-bold text-gray-800"
        >
          Create your account with Atisha
        </motion.h1>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-8">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Create account as
            </h3>
            <div className="flex flex-wrap gap-6 justify-center">
              {options.map(({ id, label, icon: Icon }) => (
                <motion.div
                  key={id}
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="radio"
                    id={id}
                    name="accountType"
                    value={id}
                    checked={selectedType === id}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="peer absolute opacity-0 w-full h-full cursor-pointer"
                  />
                  <label
                    htmlFor={id}
                    className="flex items-center gap-3 px-6 py-3 border-2 rounded-full cursor-pointer transition-all duration-200 peer-checked:text-blue-600 peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:bg-gray-50 peer-checked:hover:bg-blue-100"
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-base font-medium">{label}</span>
                  </label>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <input
                type="text"
                {...register("fullName", { required: "Full Name is required" })}
                className="w-full px-6 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Full Name"
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">
                  {errors.fullName.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-6 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-6 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                className="w-full px-6 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="pt-4"
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition duration-300 hover:bg-blue-700 shadow-lg hover:shadow-xl"
            >
              Register
            </motion.button>
          </motion.div>
        </form>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-8"
        >
          <p className="text-base text-gray-600">
            Already signed up?{" "}
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-blue-500 cursor-pointer hover:underline font-medium"
              onClick={() => setAuthType("login")}
            >
              Login
            </motion.span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;

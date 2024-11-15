import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Building2, GraduationCap } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';

const SignUp = ({ setAuthType }) => {
  const [selectedType, setSelectedType] = useState("Student");
  const navigator = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const options = [
    { id: "Student", label: "Student", icon: GraduationCap },
    { id: "Institute", label: "Institute", icon: Building2 },
    { id: "Counselor", label: "Counselor", icon: User },
  ];

  const handleRegister = async (data) => {
    const { fullName, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const accountType = selectedType.toLowerCase();

    const userData = {
      fullName,
      email,
      password,
      accountType,
    };

    try {
      const response = await axios.post("http://localhost:4000/api/signup", userData);
      navigator(`/dashboard/${accountType}/${response.data.id}`);
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
      className="flex justify-center items-center w-full h-screen bg-gray-100"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg_dark_gray w-full max-w-md p-8 rounded-xl shadow-lg"
      >
        <motion.h1
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6 text-center text-3xl font-bold text-gray-800"
        >
          Create your account with Atisha
        </motion.h1>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-sm font-medium text-gray-700 mb-2">Create account as</h3>
            <div className="flex flex-wrap gap-4">
              {options.map(({ id, label, icon: Icon }) => (
                <motion.div key={id} className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                    className={`
                      flex items-center gap-2 px-4 py-2 
                      border rounded-full cursor-pointer
                      transition-all duration-200
                      peer-checked:text-blue-600 
                      peer-checked:border-blue-600 
                      peer-checked:bg-blue-50
                      hover:bg-gray-50 
                      peer-checked:hover:bg-blue-100
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{label}</span>
                  </label>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-4"
          >
            <div>
              <input
                type="text"
                {...register("fullName", { required: "Full Name is required" })}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
              />
              {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
            </div>
            <div>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            <div>
              <input
                type="password"
                {...register("confirmPassword", { required: "Confirm Password is required" })}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg_light_primary_color text-white px-6 py-2 font-semibold rounded transition duration-300 hover:bg-blue-600"
            >
              Register
            </motion.button>
          </motion.div>
        </form>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-4"
        >
          <p className="text-sm text-gray-600">
            Already signed up?{" "}
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-blue-500 cursor-pointer hover:underline"
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
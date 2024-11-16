import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Building2, GraduationCap } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Login = ({ setAuthType }) => {
  const [selectedType, setSelectedType] = useState("Student");
  const id = 1;
  const navigator = useNavigate();

  const options = [
    { id: "Student", label: "Student", icon: GraduationCap },
    { id: "Institute", label: "Institute", icon: Building2 },
    { id: "Counselor", label: "Counselor", icon: User },
  ];

  const handleRegister = async () => {
    if (selectedType === "Student") {
      navigator(`/dashboard/student/${id}`);
    } else if (selectedType === "Institute") {
      navigator(`/dashboard/institute/${id}`);
    } else if (selectedType === "Counselor") {
      navigator(`/dashboard/counselor/${id}`);
    } else {
      alert("Issue in redirecting");
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
          Login to Atisha
        </motion.h1>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium text-gray-700 mb-2">Login as</h3>
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
              type="email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg_light_primary_color px-6 py-2 font-semibold rounded text-white transition duration-300 hover:bg-blue-600"
            onClick={handleRegister}
          >
            Login
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-4"
        >
          <p className="text-sm text-gray-600">
            Haven't signed up yet?{" "}
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => setAuthType("signup")}
            >
              Sign up
            </motion.span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { User, Building2, GraduationCap } from 'lucide-react';
// import { useNavigate } from "react-router-dom";

// const Login = ({ setAuthType }) => {
//   const [selectedType, setSelectedType] = useState("Student");
//   const id = 1;
//   const navigator = useNavigate();

//   const options = [
//     { id: "Student", label: "Student", icon: GraduationCap },
//     { id: "Institute", label: "Institute", icon: Building2 },
//     { id: "Counselor", label: "Counselor", icon: User },
//   ];

//   const handleRegister = async () => {
//     if (selectedType === "Student") {
//       navigator(`/dashboard/student/${id}`);
//     } else if (selectedType === "Institute") {
//       navigator(`/dashboard/institute/${id}`);
//     } else if (selectedType === "Counselor") {
//       navigator(`/dashboard/counselor/${id}`);
//     } else {
//       alert("Issue in redirecting");
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="flex justify-center items-center w-full min-h-screen"
//       style={{
//         background: "linear-gradient(135deg, #EBF4FF 0%, #FFFFFF 50%, #FAF5FF 100%)",
//         position: "relative",
//       }}
//     >
//       {/* Background Pattern */}
//       <div 
//         className="absolute inset-0 opacity-10"
//         style={{
//           backgroundImage: `radial-gradient(circle at center, #4A5568 2px, transparent 2px)`,
//           backgroundSize: '24px 24px'
//         }}
//       />
      
//       <motion.div
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="relative bg-white/90 backdrop-blur-sm w-full max-w-2xl p-12 rounded-2xl shadow-xl m-8"
//       >
//         <motion.h1
//           initial={{ y: -10, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="mb-8 text-center text-4xl font-bold text-gray-800"
//         >
//           Login to Atisha
//         </motion.h1>

//         <div className="space-y-8">
//           <motion.div
//             initial={{ y: 10, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <h3 className="text-lg font-medium text-gray-700 mb-4">Login as</h3>
//             <div className="flex flex-wrap gap-6 justify-center">
//               {options.map(({ id, label, icon: Icon }) => (
//                 <motion.div key={id} className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                   <input
//                     type="radio"
//                     id={id}
//                     name="accountType"
//                     value={id}
//                     checked={selectedType === id}
//                     onChange={(e) => setSelectedType(e.target.value)}
//                     className="peer absolute opacity-0 w-full h-full cursor-pointer"
//                   />
//                   <label
//                     htmlFor={id}
//                     className="flex items-center gap-3 px-6 py-3 border-2 rounded-full cursor-pointer transition-all duration-200 peer-checked:text-blue-600 peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:bg-gray-50 peer-checked:hover:bg-blue-100"
//                   >
//                     <Icon className="w-6 h-6" />
//                     <span className="text-base font-medium">{label}</span>
//                   </label>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ y: 10, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//             className="space-y-6"
//           >
//             <div>
//               <input
//                 type="email"
//                 className="w-full px-6 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                 placeholder="Email"
//               />
//             </div>
//             <div>
//               <input
//                 type="password"
//                 className="w-full px-6 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                 placeholder="Password"
//               />
//             </div>
            
//             {/* <div className="flex items-center justify-between pt-2">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="remember"
//                   className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
//                   Remember me
//                 </label>
//               </div>
//               <motion.span
//                 whileHover={{ scale: 1.05 }}
//                 className="text-sm text-blue-500 hover:underline cursor-pointer"
//               >
//                 Forgot password?
//               </motion.span>
//             </div> */}
//           </motion.div>

//           <motion.div
//             initial={{ y: 10, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition duration-300 hover:bg-blue-700 shadow-lg hover:shadow-xl"
//               onClick={handleRegister}
//             >
//               Login
//             </motion.button>
//           </motion.div>

//           <motion.div
//             initial={{ y: 10, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.7 }}
//             className="text-center mt-8"
//           >
//             <p className="text-base text-gray-600">
//               Haven't signed up yet?{" "}
//               <motion.span
//                 whileHover={{ scale: 1.05 }}
//                 className="text-blue-500 cursor-pointer hover:underline font-medium"
//                 onClick={() => setAuthType("signup")}
//               >
//                 Sign up
//               </motion.span>
//             </p>
//           </motion.div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Building2, GraduationCap } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Login = ({ setAuthType }) => {
  const [selectedType, setSelectedType] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const options = [
    { id: "Student", label: "Student", icon: GraduationCap },
    { id: "Institute", label: "Institute", icon: Building2 },
    { id: "Counselor", label: "Counselor", icon: User },
  ];

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // Assuming the API returns user info and a token
      const { userId } = data; // Adjust according to your API response

      // Redirect based on selected type
      if (selectedType === "Student") {
        navigator(`/dashboard/student/${userId}`);
      } else if (selectedType === "Institute") {
        navigator(`/dashboard/institute/${userId}`);
      } else if (selectedType === "Counselor") {
        navigator(`/dashboard/counselor/${userId}`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center w-full min-h-screen"
      style={{
        background: "linear-gradient(135deg, #EBF4FF 0%, #FFFFFF 50%, #FAF5FF 100%)",
        position: "relative",
      }}
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at center, #4A5568 2px, transparent 2px)`,
          backgroundSize: '24px 24px'
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
          Login to Atisha
        </motion.h1>

        <div className="space-y-8">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4">Login as</h3>
            <div className="flex flex-wrap gap-6 justify-center">
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
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Password"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition duration-300 hover:bg-blue-700 shadow-lg hover:shadow-xl"
              onClick={handleLogin} // Updated function call here
            >
              Login
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center mt-8"
          >
            <p className="text-base text-gray-600">
              Haven't signed up yet?{" "}
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-blue-500 cursor-pointer hover:underline font-medium"
                onClick={() => setAuthType("signup")}
              >
                Sign up
              </motion.span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
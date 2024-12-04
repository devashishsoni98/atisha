// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { setUser } from '../store/authSlice';
// import AnimatedBackground from './AnimatedBackground';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4000/api/admin/login', {
//         email,
//         password,
//       });
//       dispatch(setUser(response.data));
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
//       <AnimatedBackground />
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="relative z-10 w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl"
//       >
//         <motion.div
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           <h2 className="text-4xl font-bold text-center text-white mb-2">Welcome Back</h2>
//           <p className="text-center text-blue-200 mb-8">Log in to access your account</p>
//         </motion.div>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <motion.div
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//           >
//             <label htmlFor="email-address" className="sr-only">
//               Email address
//             </label>
//             <input
//               id="email-address"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-opacity-30 transition duration-200"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </motion.div>
//           <motion.div
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//           >
//             <label htmlFor="password" className="sr-only">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               autoComplete="current-password"
//               required
//               className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-opacity-30 transition duration-200"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </motion.div>
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.5 }}
//           >
//             <motion.button
//               whileHover={{ scale: 1.05, backgroundColor: '#3B82F6' }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
//             >
//               Log in
//             </motion.button>
//           </motion.div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { setUser } from '../store/authSlice';
import AnimatedBackground from './AnimatedBackground';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/admin/login', {
        email,
        password,
      });
      dispatch(setUser(response.data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-xl p-12 bg-white bg-opacity-15 backdrop-filter backdrop-blur-xl rounded-3xl shadow-2xl"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-5xl font-bold text-center text-white mb-4">Welcome Back</h2>
          <p className="text-center text-blue-200 text-xl mb-10">Log in to access your account</p>
        </motion.div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-5 py-4 text-lg rounded-xl bg-white bg-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-3 focus:ring-blue-400 focus:bg-opacity-30 transition duration-200"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-5 py-4 text-lg rounded-xl bg-white bg-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-3 focus:ring-blue-400 focus:bg-opacity-30 transition duration-200"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#3B82F6' }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-5 py-4 text-lg bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
            >
              Log in
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
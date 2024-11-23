// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBell, FaBars, FaTimes } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import Headroom from "react-headroom";
// import Logo1 from "../assets/logo1.png";
// import { useSelector } from 'react-redux'; // Import useSelector
// import "../styles/navbar.css";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const token = useSelector((state) => state.user.token); // Access token from Redux

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   const menuVariants = {
//     open: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//       },
//     },
//     closed: {
//       x: "100%",
//       opacity: 0,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//       },
//     },
//   };

//   return (
//     <Headroom className="z-50 relative">
//       <header className="bg-slate-50 shadow-sm">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex justify-between items-center py-3 px-4 md:px-6 relative">
//             {/* Logo Section */}
//             <Link to="/" onClick={closeMenu} className="flex-shrink-0">
//               <div className="flex items-center">
//                 <img
//                   src={Logo1}
//                   alt="logo"
//                   className="w-10 h-10 object-contain rounded"
//                 />
//                 <p className="pl-4 font-alkatra text-2xl whitespace-nowrap">
//                   <span className="text-[#0F67B1]">ATI</span>
//                   <span className="text-[#0F67B1]">SHA</span>
//                 </p>
//               </div>
//             </Link>

//             {/* Desktop Navigation and Right Section */}
//             <div className="hidden md:flex items-center justify-end space-x-4 flex-1">
//               <nav className="flex gap-8 mr-8">
//                 <Link to="/carrer/roadmaps/explore" className="text-gray-700 nav-lin transition-colors font-medium">Explore Career</Link>
//                 <Link to="/sessions/explore" className="text-gray-700 nav-lin transition-colors font-medium">Workshop & Events</Link>
//                 <Link to="/testimonials" className="text-gray-700 nav-lin transition-colors font-medium">Testimonials</Link>
//                 <Link to="/about" className="text-gray-700 nav-lin transition-colors font-medium">About Us</Link>
//                 <Link to="/contactus" className="text-gray-700 nav-lin transition-colors font-medium">Contact</Link>
//               </nav>
//               <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
//                 <FaBell className="text-gray-600" />
//               </button>
//               {/* Conditional Rendering of Signup/Profile Button */}
//               {token ? (
//                 <Link to="/profile">
//                   <button className="bg_primary_color text-white px-6 py-2 rounded-full font-medium nav-lin-bg transition-colors">PROFILE</button>
//                 </Link>
//               ) : (
//                 <Link to="/signup">
//                   <button className="bg_primary_color text-white px-6 py-2 rounded-full font-medium nav-lin-bg transition-colors">SIGNUP</button>
//                 </Link>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden p-2 focus:outline-none"
//               onClick={toggleMenu}
//               aria-label="Toggle menu"
//             >
//               {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               initial="closed"
//               animate="open"
//               exit="closed"
//               variants={menuVariants}
//               className="fixed md:hidden top-[60px] right-0 w-full bg-white shadow-lg"
//             >
//               <nav className="flex flex-col">
//                 <div className="flex flex-col items-center">
//                   {/* Mobile Links */}
//                   <Link to="/carrer/roadmaps/explore" className="px-6 py-3 text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Explore Career</Link>
//                   <Link to="/sessions/explore" className="px-6 py-3 text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Workshop & Events</Link>
//                   <Link to="/testimonials" className="px-6 py-3 text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Testimonials</Link>
//                   <Link to="/about" className="px-6 py-3 text-gray-700 hover:bg-gray-50" onClick={closeMenu}>About Us</Link>
//                   <Link to="/contactus" className="px-6 py-3 text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Contact Us</Link>
//                 </div>
//                 <div className="px-6 py-3 flex items-center justify-between border-t">
//                   <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
//                     <FaBell className="text-gray-600" />
//                   </button>

//                   {/* Conditional Rendering of Signup/Profile Button in Mobile Menu */}
//                   {token ? (
//                     <Link to="/profile" onClick={closeMenu}>
//                       <button className="bg_primary_color text-white px-6 py-2 rounded-full font-medium">PROFILE</button>
//                     </Link>
//                   ) : (
//                     <Link to="/signup" onClick={closeMenu}>
//                       <button className="bg_primary_color text-white px=6 py=2 rounded-full font-medium">SIGNUP</button>
//                     </Link>
//                   )}
//                 </div>
//               </nav>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>
//     </Headroom>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Headroom from "react-headroom";
import Logo1 from "../assets/logo1.png";
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import { logoutUser } from '../store/userActions'; // Import logout action
import "../styles/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = useSelector((state) => state.user.token) || localStorage.getItem('token'); // Access token from Redux
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    navigate(`/`); // Redirect to home or login page after logging out
    dispatch(logoutUser()); // Dispatch logout action
    localStorage.removeItem('token'); // Clear token from local storage if used
  };

  return (
    <Headroom className="z-50 relative">
      <header className="bg-slate-50 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-3 px-4 md:px-6 relative">
            {/* Logo Section */}
            <Link to="/" onClick={closeMenu} className="flex-shrink-0">
              <div className="flex items-center">
                <img src={Logo1} alt="logo" className="w-10 h-10 object-contain rounded" />
                <p className="pl-4 font-alkatra text-2xl whitespace-nowrap">
                  <span className="text-[#0F67B1]">ATI</span>
                  <span className="text-[#0F67B1]">SHA</span>
                </p>
              </div>
            </Link>

            {/* Desktop Navigation and Right Section */}
            <div className="hidden md:flex items-center justify-end space-x-4 flex-1">
              <nav className="flex gap-8 mr-8">
                <Link to="/carrer/roadmaps/explore" className="text-gray-700 nav-lin transition-colors font-medium">Explore Career</Link>
                <Link to="/sessions/explore" className="text-gray-700 nav-lin transition-colors font-medium">Workshop & Events</Link>
                <Link to="/testimonials" className="text-gray-700 nav-lin transition-colors font-medium">Testimonials</Link>
                <Link to="/about" className="text-gray-700 nav-lin transition-colors font-medium">About Us</Link>
                <Link to="/contactus" className="text-gray-700 nav-lin transition-colors font-medium">Contact</Link>
              </nav>
              <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <FaBell className="text-gray-600" />
              </button>
              {/* Conditional Rendering of Signup/Profile Button */}
              {token ? (
                <>
                  <Link to="/profile">
                    <button className="bg_primary_color text-white px=6 py=2 rounded-full font-medium nav-lin-bg transition-colors">PROFILE</button>
                  </Link>
                  <button onClick={handleLogout} className="bg-red-600 text-white px=6 py=2 rounded-full font-medium nav-lin-bg transition-colors">LOGOUT</button> {/* Logout Button */}
                </>
              ) : (
                <Link to="/signup">
                  <button className="bg_primary_color text-white px=6 py=2 rounded-full font-medium nav-lin-bg transition-colors">SIGNUP</button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial="closed" animate="open" exit="closed" variants={menuVariants} className="fixed md:hidden top-[60px] right-0 w-full bg-white shadow-lg">
              <nav className="flex flex-col">
                {/* Mobile Links */}
                {token ? (
                  <>
                    <Link to="/profile" onClick={closeMenu}>
                      <button className="bg_primary_color text-white px=6 py=2 rounded-full font-medium">PROFILE</button>
                    </Link>
                    <button onClick={handleLogout} className="bg-red-600 text-white px=6 py=2 rounded-full font-medium">LOGOUT</button> {/* Logout Button */}
                  </>
                ) : (
                  <Link to="/signup" onClick={closeMenu}>
                    <button className="bg_primary_color text-white px=6 py=2 rounded-full font-medium">SIGNUP</button>
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </Headroom>
  );
};

export default Navbar;
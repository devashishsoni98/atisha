import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaBars, FaTimes, FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Headroom from "react-headroom";
import Logo1 from "../assets/logo1.png";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/userActions';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = useSelector((state) => state.user.token) || localStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    navigate(`/`);
    dispatch(logoutUser());
    localStorage.removeItem('token');
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
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
                <Link to="/carrer/roadmaps/explore" className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium">Explore Career</Link>
                <Link to="/sessions/explore" className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium">Workshop & Events</Link>
                <Link to="/testimonials" className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium">Testimonials</Link>
                <Link to="/about" className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium">About Us</Link>
                <Link to="/contactus" className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium">Contact</Link>
              </nav>
              <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <FaBell className="text-gray-600" />
              </button>
              {/* Profile Dropdown */}
              {token ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="w-10 h-10 bg-[#0F67B1] text-white rounded-full flex items-center justify-center hover:bg-[#0D5A9F] transition-colors"
                  >
                    <FaUser />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Dashboard</Link>
                      <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Home</Link>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100">Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/signup">
                  <button className="bg-[#0F67B1] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0D5A9F] transition-colors">SIGNUP</button>
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
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed md:hidden top-[60px] right-0 w-full bg-white shadow-lg"
            >
              <nav className="flex flex-col p-4">
                <Link to="/carrer/roadmaps/explore" className="py-2 text-gray-700 hover:text-[#0F67B1]" onClick={closeMenu}>Explore Career</Link>
                <Link to="/sessions/explore" className="py-2 text-gray-700 hover:text-[#0F67B1]" onClick={closeMenu}>Workshop & Events</Link>
                <Link to="/testimonials" className="py-2 text-gray-700 hover:text-[#0F67B1]" onClick={closeMenu}>Testimonials</Link>
                <Link to="/about" className="py-2 text-gray-700 hover:text-[#0F67B1]" onClick={closeMenu}>About Us</Link>
                <Link to="/contactus" className="py-2 text-gray-700 hover:text-[#0F67B1]" onClick={closeMenu}>Contact</Link>

                {token ? (
                  <>
                    {/* Profile Dropdown in Mobile */}
                    <div className="mt-2">
                      <button
                        onClick={toggleDropdown}
                        className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-[#0F67B1]"
                      >
                        Profile
                        {dropdownOpen ? (
                          <FaChevronUp className="text-xs ml-2 " />
                        ) : (
                          <FaChevronDown className="text-xs ml-2" />
                        )}
                      </button>
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 overflow-hidden"
                          >
                            <Link to="/dashboard" className="block py-2 text-gray-700 hover:text-[#0F67B1]" onClick={closeMenu}>Dashboard</Link>
                            <Link to="/" className="block py-2 text-gray-700 hover:text-[#0F67B1]" onClick={closeMenu}>Home</Link>
                            <button onClick={handleLogout} className="block w-full text-left py-2 text-red-700 hover:text-red-900">Logout</button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                ) : (
                  <Link to="/signup" onClick={closeMenu}>
                    <button className="mt-2 bg-[#0F67B1] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0D5A9F] transition-colors w-full">SIGNUP</button>
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
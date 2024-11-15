import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Headroom from "react-headroom";
import Logo from "../assets/logo.jpg"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const menuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <Headroom className="z-50 relative">
      <header className="bg-slate-50 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-3 px-4 md:px-6 relative">
            {/* Logo Section */}
            <Link to="/" onClick={closeMenu} className="flex-shrink-0">
              <div className="flex items-center">
                <img
                  src={Logo}
                  alt="logo"
                  className="w-10 h-10 object-contain"
                />
                <p className="pl-4 font-alkatra text-2xl whitespace-nowrap">
                  <span className="text-[#ffbb39]">ATI</span>
                  <span className="text-[#65db82]">SHA</span>
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <nav className="flex gap-8">
                <Link 
                  to="/carrer/roadmaps/explore" 
                  className="text-gray-700 hover:text-[#65db82] transition-colors font-medium"
                >
                  ROADMAP
                </Link>
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-[#65db82] transition-colors font-medium"
                >
                  RESOURCE
                </Link>
                <Link 
                  to="/sessions/explore" 
                  className="text-gray-700 hover:text-[#65db82] transition-colors font-medium"
                >
                  SESSIONS
                </Link>
              </nav>
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <FaBell className="text-gray-600" />
              </button>
              <Link to="/signup">
                <button className="bg-[#65db82] text-white px-6 py-2 rounded-full font-medium hover:bg-[#50c76d] transition-colors">
                  SIGNUP
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 focus:outline-none" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
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
              <nav className="flex flex-col">
                <div className="flex flex-col items-center">
                <Link
                  to="/carrer/roadmaps/explore"
                  className="px-6 py-3 text-gray-700 hover:bg-gray-50"
                  onClick={closeMenu}
                >
                  ROADMAP
                </Link>
                <Link
                  to="/"
                  className="px-6 py-3 text-gray-700 hover:bg-gray-50"
                  onClick={closeMenu}
                >
                  RESOURCE
                </Link>
                <Link
                  to="/sessions/explore"
                  className="px-6 py-3 text-gray-700 hover:bg-gray-50"
                  onClick={closeMenu}
                >
                  SESSIONS
                </Link>
                </div>
                <div className="px-6 py-3 flex items-center justify-between border-t">
                  <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <FaBell className="text-gray-600" />
                  </button>
                  <Link to="/signup" onClick={closeMenu}>
                    <button className="bg-[#65db82] text-white px-6 py-2 rounded-full font-medium">
                      SIGNUP
                    </button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </Headroom>
  );
};

export default Navbar;
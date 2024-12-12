import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaBars,
  FaTimes,
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaLanguage,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Headroom from "react-headroom";
import Logo1 from "../assets/logo1.png";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/userActions";
import apibackend from "../utils/api";
//
// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [notificationSidebarOpen, setNotificationSidebarOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const token =
//     useSelector((state) => state.user.token) || localStorage.getItem("token");
//   const userId =
//     useSelector((state) => state.user.id) || localStorage.getItem("userId");
//   const roleType =
//     useSelector((state) => state.user.roleType) ||
//     localStorage.getItem("userType");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);
//   const notificationSidebarRef = useRef(null);
//
//   useEffect(() => {
//     const addScript = () => {
//       const script = document.createElement("script");
//       script.src =
//         "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       script.async = true;
//       document.body.appendChild(script);
//     };
//
//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//         },
//         "google_translate_element"
//       );
//     };
//     addScript();
//   }, []);
//
//   const toggleMenu = () => setMenuOpen(!menuOpen);
//   const closeMenu = () => setMenuOpen(false);
//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
//   const toggleNotificationSidebar = () => {
//     setNotificationSidebarOpen(!notificationSidebarOpen);
//     if (!notificationSidebarOpen) {
//       fetchNotifications();
//     }
//   };
//
//   useEffect(() => {
//     setInterval(() => {
//       if (userId) {
//         fetchNotifications();
//       }
//     }, 10000);
//   }, []);
//
//   const handleLogout = () => {
//     navigate(`/`);
//     dispatch(logoutUser());
//     localStorage.removeItem("token");
//     setDropdownOpen(false);
//   };
//
//   const fetchNotifications = async () => {
//     setIsLoading(true);
//     try {
//       const response = await apibackend(`/notifications/${userId}`);
//       if (!response) {
//         throw new Error("Failed to fetch notifications");
//       }
//       const data = await response.data;
//       setNotifications(data);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//       setNotifications([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   const markNotificationAsRead = async (notificationId) => {
//     try {
//       const response = await apibackend.post(
//         `/notifications/${notificationId}/mark-as-read`
//       );
//       if (!response) {
//         throw new Error("Failed to mark notification as read");
//       }
//       // Update the local state to reflect the change
//       setNotifications((prevNotifications) =>
//         prevNotifications.map((notification) =>
//           notification.id === notificationId
//             ? { ...notification, is_read: true }
//             : notification
//         )
//       );
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };
//
//   const deleteNotification = async (notificationId) => {
//     try {
//       const response = await fetch(`/notifications/${notificationId}`, {
//         method: "DELETE",
//       });
//       if (!response) {
//         throw new Error("Failed to delete notification");
//       }
//       // Remove the deleted notification from the local state
//       setNotifications((prevNotifications) =>
//         prevNotifications.filter(
//           (notification) => notification.id !== notificationId
//         )
//       );
//     } catch (error) {
//       console.error("Error deleting notification:", error);
//     }
//   };
//
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//       if (
//         notificationSidebarRef.current &&
//         !notificationSidebarRef.current.contains(event.target) &&
//         !event.target.closest(".notification-button")
//       ) {
//         setNotificationSidebarOpen(false);
//       }
//     };
//
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
//
//   const menuVariants = {
//     open: { opacity: 1, y: 0 },
//     closed: { opacity: 0, y: "-100%" },
//   };
//
//   const sidebarVariants = {
//     open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
//     closed: {
//       x: "100%",
//       transition: { type: "spring", stiffness: 300, damping: 30 },
//     },
//   };
//
//   const getCategoryColor = (category) => {
//     switch (category) {
//       case "message":
//         return "bg-blue-100 border-blue-500";
//       case "alert":
//         return "bg-red-100 border-red-500";
//       case "warning":
//         return "bg-yellow-100 border-yellow-500";
//       default:
//         return "bg-gray-100 border-gray-500";
//     }
//   };
//
//   return (
//     <Headroom className="z-[19] relative">
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
//
//             {/* Desktop Navigation and Right Section */}
//             <div className="hidden md:flex items-center justify-end space-x-4 flex-1">
//               <nav className="flex gap-8 mr-8">
//                 <Link
//                   to="/carrer/roadmaps/explore"
//                   className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium"
//                 >
//                   Explore Career
//                 </Link>
//                 <Link
//                   to="/sessions/explore"
//                   className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium"
//                 >
//                   Workshop & Events
//                 </Link>
//                 <Link
//                   to="/interactive-contents"
//                   className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium"
//                 >
//                   Interactive Content
//                 </Link>
//                 <Link
//                   to="/career-library"
//                   className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium"
//                 >
//                   Career Library
//                 </Link>
//                 <Link
//                   to="/about"
//                   className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium"
//                 >
//                   About Us
//                 </Link>
//                 <Link
//                   to="/contactus"
//                   className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium"
//                 >
//                   Contact
//                 </Link>
//               </nav>
//               <button
//                 className="notification-button w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                 onClick={toggleNotificationSidebar}
//                 aria-label="Toggle notifications"
//               >
//                 <FaBell className="text-gray-600" />
//               </button>
//               <div className="relative">
//                 {/* <button
//             onClick={() => {
//               const translateElement = document.getElementById('google_translate_element');
//               if (translateElement) {
//                 translateElement.style.display = translateElement.style.display === 'none' ? 'block' : 'none';
//               }
//             }}
//             className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//             aria-label="Toggle translate"
//           >
//             <FaLanguage className="text-gray-600" />
//           </button> */}
//                 <button
//                   onClick={() => {
//                     const translateElement = document.getElementById(
//                       "google_translate_element"
//                     );
//                     if (translateElement) {
//                       translateElement.style.display =
//                         translateElement.style.display === "none"
//                           ? "block"
//                           : "none";
//                     }
//                   }}
//                   className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                   aria-label="Toggle translate"
//                 >
//                   <FaLanguage className="text-gray-600" />
//                 </button>
//                 <div
//                   id="google_translate_element"
//                   className="absolute right-0 mt-2 bg-white rounded-md shadow-lg p-2 hidden"
//                 ></div>
//               </div>
//               {/* Profile Dropdown */}
//               {token ? (
//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={toggleDropdown}
//                     className="w-10 h-10 bg-[#0F67B1] text-white rounded-full flex items-center justify-center hover:bg-[#0D5A9F] transition-colors"
//                   >
//                     <FaUser />
//                   </button>
//                   {dropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//                       <Link
//                         to={`/dashboard/${roleType}/${userId}`}
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         onClick={() => setDropdownOpen(false)}
//                       >
//                         Dashboard
//                       </Link>
//                       <Link
//                         to="/onboarding"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         onClick={() => setDropdownOpen(false)}
//                       >
//                         Home
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <Link to="/signup">
//                   <button className="bg-[#0F67B1] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0D5A9F] transition-colors">
//                     SIGNUP
//                   </button>
//                 </Link>
//               )}
//             </div>
//
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
//
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
//               <nav className="flex flex-col p-4">
//                 <Link
//                   to="/carrer/roadmaps/explore"
//                   className="py-2 text-gray-700 hover:text-[#0F67B1]"
//                   onClick={closeMenu}
//                 >
//                   Explore Career
//                 </Link>
//                 <Link
//                   to="/sessions/explore"
//                   className="py-2 text-gray-700 hover:text-[#0F67B1]"
//                   onClick={closeMenu}
//                 >
//                   Workshop & Events
//                 </Link>
//                 <Link
//                   to="/interactive-contents"
//                   className="py-2 text-gray-700 hover:text-[#0F67B1]"
//                   onClick={closeMenu}
//                 >
//                   Interactive Contents
//                 </Link>
//                 <Link
//                   to="/career-library"
//                   className="py-2 text-gray-700 hover:text-[#0F67B1]"
//                   onClick={closeMenu}
//                 >
//                   Career Library
//                 </Link>
//                 <Link
//                   to="/about"
//                   className="py-2 text-gray-700 hover:text-[#0F67B1]"
//                   onClick={closeMenu}
//                 >
//                   About Us
//                 </Link>
//                 <Link
//                   to="/contactus"
//                   className="py-2 text-gray-700 hover:text-[#0F67B1]"
//                   onClick={closeMenu}
//                 >
//                   Contact
//                 </Link>
//
//                 <button
//                   className="py-2 text-gray-700 hover:text-[#0F67B1] text-left"
//                   onClick={() => {
//                     toggleNotificationSidebar();
//                     closeMenu();
//                   }}
//                 >
//                   Notifications
//                 </button>
//
//                 {token ? (
//                   <>
//                     {/* Profile Dropdown in Mobile */}
//                     <div className="mt-2">
//                       <button
//                         onClick={toggleDropdown}
//                         className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-[#0F67B1]"
//                       >
//                         Profile
//                         {dropdownOpen ? (
//                           <FaChevronUp className="text-xs ml-2 " />
//                         ) : (
//                           <FaChevronDown className="text-xs ml-2" />
//                         )}
//                       </button>
//                       <AnimatePresence>
//                         {dropdownOpen && (
//                           <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: "auto" }}
//                             exit={{ opacity: 0, height: 0 }}
//                             transition={{ duration: 0.2 }}
//                             className="ml-4 overflow-hidden"
//                           >
//                             <Link
//                               to="/dashboard"
//                               className="block py-2 text-gray-700 hover:text-[#0F67B1]"
//                               onClick={closeMenu}
//                             >
//                               Dashboard
//                             </Link>
//                             <Link
//                               to="/"
//                               className="block py-2 text-gray-700 hover:text-[#0F67B1]"
//                               onClick={closeMenu}
//                             >
//                               Home
//                             </Link>
//                             <button
//                               onClick={handleLogout}
//                               className="block w-full text-left py-2 text-red-700 hover:text-red-900"
//                             >
//                               Logout
//                             </button>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   </>
//                 ) : (
//                   <Link to="/signup" onClick={closeMenu}>
//                     <button className="mt-2 bg-[#0F67B1] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0D5A9F] transition-colors w-full">
//                       SIGNUP
//                     </button>
//                   </Link>
//                 )}
//                 {/* <button
//                   className="py-2 text-gray-700 hover:text-[#0F67B1] text-left flex items-center"
//                   onClick={() => {
//                     const translateElement = document.getElementById('google_translate_element');
//                     if (translateElement) {
//                       translateElement.style.display = translateElement.style.display === 'none' ? 'block' : 'none';
//                     }
//                     closeMenu();
//                   }}
//                 >
//                   <FaLanguage className="mr-2" />
//                   Translate
//                 </button> */}
//                 <button
//                   onClick={() => {
//                     const translateElement = document.getElementById(
//                       "google_translate_element"
//                     );
//                     if (translateElement) {
//                       translateElement.style.display =
//                         translateElement.style.display === "none"
//                           ? "block"
//                           : "none";
//                     }
//                   }}
//                   className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                   aria-label="Toggle translate"
//                 >
//                   <FaLanguage className="text-gray-600" />
//                 </button>
//               </nav>
//             </motion.div>
//           )}
//         </AnimatePresence>
//
//         {/* Notification Sidebar */}
//         <AnimatePresence>
//           {notificationSidebarOpen && (
//             <motion.div
//               initial="closed"
//               animate="open"
//               exit="closed"
//               variants={sidebarVariants}
//               className="fixed inset-y-0 right-0 w-full h-screen sm:w-80 bg-white shadow-lg z-50"
//               ref={notificationSidebarRef}
//             >
//               <div className="flex flex-col h-full">
//                 <div className="flex justify-between items-center p-4 border-b">
//                   <h2 className="text-xl font-semibold">Notifications</h2>
//                   <button
//                     onClick={toggleNotificationSidebar}
//                     className="text-gray-500 hover:text-gray-700"
//                     aria-label="Close notifications"
//                   >
//                     <FaTimes size={24} />
//                   </button>
//                 </div>
//                 <div className="flex-grow h-screen bg-white overflow-y-auto">
//                   {isLoading ? (
//                     <div className="flex items-center justify-center h-full">
//                       <p className="text-gray-500">Loading...</p>
//                     </div>
//                   ) : notifications.length > 0 ? (
//                     <div className="p-4">
//                       {notifications.map((notification) => (
//                         <div
//                           key={notification.id}
//                           className={`mb-4 p-3 rounded-lg border-l-4 ${getCategoryColor(
//                             notification.category
//                           )} relative`}
//                         >
//                           {notification.link ? (
//                             <Link
//                               to={notification.link}
//                               className="block"
//                               onClick={() =>
//                                 markNotificationAsRead(notification.id)
//                               }
//                             >
//                               <p className="text-gray-800">
//                                 {notification.content}
//                               </p>
//                             </Link>
//                           ) : (
//                             <p className="text-gray-800">
//                               {notification.content}
//                             </p>
//                           )}
//                           <p className="text-sm text-gray-500 mt-1">
//                             {new Date(notification.created_at).toLocaleString()}
//                           </p>
//                           <button
//                             onClick={() => deleteNotification(notification.id)}
//                             className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
//                             aria-label="Delete notification"
//                           >
//                             <FaTimes size={16} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-center h-full">
//                       <p className="text-gray-500">No new notifications</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>
//     </Headroom>
//   );
// };
// export default Navbar;


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationSidebarOpen, setNotificationSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token =
      useSelector((state) => state.user.token) || localStorage.getItem("token");
  const userId =
      useSelector((state) => state.user.id) || localStorage.getItem("userId");
  const roleType =
      useSelector((state) => state.user.roleType) ||
      localStorage.getItem("userType");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const notificationSidebarRef = useRef(null);
  const scriptAddedRef = useRef(false);


  useEffect(() => {
    if (scriptAddedRef.current) return;

    const addScript = () => {
      const script = document.createElement("script");
      script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      scriptAddedRef.current = true;
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
      );
    };
    addScript();

    // Add custom styles for Google Translate
    const style = document.createElement('style');
    style.textContent = `
      .google-te-gadget-simple {
        border: none !important;
        background-color: transparent !important;
      }
      .google-te-gadget-simple .goog-te-menu-value {
        color: #4B5563 !important;
      }
      .google-te-banner-frame {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);


  // useEffect(() => {
  //   const addScript = () => {
  //     const script = document.createElement("script");
  //     script.src =
  //         "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //     script.async = true;
  //     document.body.appendChild(script);
  //   };

  //   window.googleTranslateElementInit = () => {
  //     new window.google.translate.TranslateElement(
  //         {
  //           pageLanguage: "en",
  //           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
  //           autoDisplay: false,
  //         },
  //         "google_translate_element"
  //     );
  //   };
  //   addScript();
  // }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleNotificationSidebar = () => {
    setNotificationSidebarOpen(!notificationSidebarOpen);
    if (!notificationSidebarOpen) {
      fetchNotifications();
    }
  };

  useEffect(() => {
    setInterval(() => {
      if (userId) {
        fetchNotifications();
      }
    }, 10000);
  }, []);

  const handleLogout = () => {
    navigate(`/`);
    dispatch(logoutUser());
    localStorage.removeItem("token");
    setDropdownOpen(false);
  };

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await apibackend(`/notifications/${userId}`);
      if (!response) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.data;
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      const response = await apibackend.post(
          `/notifications/${notificationId}/mark-as-read`
      );
      if (!response) {
        throw new Error("Failed to mark notification as read");
      }
      // Update the local state to reflect the change
      setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
              notification.id === notificationId
                  ? { ...notification, is_read: true }
                  : notification
          )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const response = await fetch(`/notifications/${notificationId}`, {
        method: "DELETE",
      });
      if (!response) {
        throw new Error("Failed to delete notification");
      }
      // Remove the deleted notification from the local state
      setNotifications((prevNotifications) =>
          prevNotifications.filter(
              (notification) => notification.id !== notificationId
          )
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
          notificationSidebarRef.current &&
          !notificationSidebarRef.current.contains(event.target) &&
          !event.target.closest(".notification-button")
      ) {
        setNotificationSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
  };

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: {
      x: "100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "message":
        return "bg-blue-100 border-blue-500";
      case "alert":
        return "bg-red-100 border-red-500";
      case "warning":
        return "bg-yellow-100 border-yellow-500";
      default:
        return "bg-gray-100 border-gray-500";
    }
  };

  return (
      <Headroom className="z-[19] relative">
        <header className="bg-slate-50 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center py-3 px-4 md:px-6 relative">
              {/* Logo Section */}
              <Link to="/" onClick={closeMenu} className="flex-shrink-0">
                <div className="flex items-center">
                  <img
                      src={Logo1}
                      alt="logo"
                      className="w-10 h-10 object-contain rounded"
                  />
                  <p className="pl-4 font-alkatra text-2xl whitespace-nowrap">
                    <span className="text-[#0F67B1]">ATI</span>
                    <span className="text-[#0F67B1]">SHA</span>
                  </p>
                </div>
              </Link>

              {/* Desktop Navigation and Right Section */}
              <div className="hidden md:flex items-center justify-end space-x-4 flex-1">
                <nav className="flex gap-8 mr-8">
                  
                  <Link
                      to="/carrer/roadmaps/explore"
                      className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium"
                  >
                    Explore Career
                  </Link>
                  <Link
                      to="/lens"
                      className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium"
                  >
                    Lens
                  </Link>
                
                  <Link
                      to="/interactive-contents"
                      // to="/"
                      className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium"
                  >
                    Interactive Content
                  </Link>
                  <Link
                      to="/resources"
                      className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium"
                  >
                    E - Resources
                  </Link>
                  <Link
                      to="/about"
                      className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium"
                  >
                    About Us
                  </Link>
                  <Link
                      to="/contactus"
                      className="text-gray-700 hover:text-[#0F67B1] transition-colors font-medium"
                  >
                    Contact
                  </Link>
                </nav>
                <button
                    className="notification-button w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    onClick={toggleNotificationSidebar}
                    aria-label="Toggle notifications"
                >
                  <FaBell className="text-gray-600" />
                </button>
                <div className="relative">
                  <button
                      onClick={() => {
                        const translateElement = document.getElementById(
                            "google_translate_element"
                        );
                        if (translateElement) {
                          translateElement.style.display =
                              translateElement.style.display === "none"
                                  ? "block"
                                  : "none";
                        }
                      }}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                      aria-label="Toggle translate"
                  >
                    <FaLanguage className="text-gray-600" />
                  </button>
                  <div
                      id="google_translate_element"
                      className="absolute right-0 mt-2 bg-white rounded-md shadow-lg p-2 hidden"
                  ></div>
                </div>
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
                            <Link
                                to={`/dashboard/${roleType}/${userId}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setDropdownOpen(false)}
                            >
                              Dashboard
                            </Link>
                            <Link
                                to="/onboarding"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setDropdownOpen(false)}
                            >
                              Home
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                            >
                              Logout
                            </button>
                          </div>
                      )}
                    </div>
                ) : (
                    <Link to="/signup">
                      <button className="bg-[#0F67B1] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0D5A9F] transition-colors">
                        SIGNUP
                      </button>
                    </Link>
                )}
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
                  <nav className="flex flex-col p-4">
                  <Link
                        to="/lens"
                        className="py-2 text-gray-700 hover:text-[#0F67B1]"
                        onClick={closeMenu}
                    >
                      Lens
                    </Link>
                    <Link
                        to="/carrer/roadmaps/explore"
                        className="py-2 text-gray-700 hover:text-[#0F67B1]"
                        onClick={closeMenu}
                    >
                      Explore Career
                    </Link>
                    {/*<Link*/}
                    {/*    to="/sessions/explore"*/}
                    {/*    className="py-2 text-gray-700 hover:text-[#0F67B1]"*/}
                    {/*    onClick={closeMenu}*/}
                    {/*>*/}
                    {/*  Workshop & Events*/}
                    {/*</Link>*/}
                    <Link
                        to="/interactive-contents"
                        className="py-2 text-gray-700 hover:text-[#0F67B1]"
                        onClick={closeMenu}
                    >
                      Interactive Contents
                    </Link>
                    <Link
                        to="/career-library"
                        className="py-2 text-gray-700 hover:text-[#0F67B1]"
                        onClick={closeMenu}
                    >
                      Career Library
                    </Link>
                    <Link
                        to="/about"
                        className="py-2 text-gray-700 hover:text-[#0F67B1]"
                        onClick={closeMenu}
                    >
                      About Us
                    </Link>
                    <Link
                        to="/contactus"
                        className="py-2 text-gray-700 hover:text-[#0F67B1]"
                        onClick={closeMenu}
                    >
                      Contact
                    </Link>

                    <button
                        className="py-2 text-gray-700 hover:text-[#0F67B1] text-left"
                        onClick={() => {
                          toggleNotificationSidebar();
                          closeMenu();
                        }}
                    >
                      Notifications
                    </button>

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
                                    <Link
                                        to="/dashboard"
                                        className="block py-2 text-gray-700 hover:text-[#0F67B1]"
                                        onClick={closeMenu}
                                    >
                                      Dashboard
                                    </Link>
                                    <Link
                                        to="/"
                                        className="block py-2 text-gray-700 hover:text-[#0F67B1]"
                                        onClick={closeMenu}
                                    >
                                      Home
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left py-2 text-red-700 hover:text-red-900"
                                    >
                                      Logout
                                    </button>
                                  </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </>
                    ) : (
                        <Link to="/signup" onClick={closeMenu}>
                          <button className="mt-2 bg-[#0F67B1] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0D5A9F] transition-colors w-full">
                            SIGNUP
                          </button>
                        </Link>
                    )}
                    <button
                        onClick={() => {
                          const translateElement = document.getElementById(
                              "google_translate_element"
                          );
                          if (translateElement) {
                            translateElement.style.display =
                                translateElement.style.display === "none"
                                    ? "block"
                                    : "none";
                          }
                        }}
                        className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                        aria-label="Toggle translate"
                    >
                      <FaLanguage className="text-gray-600" />
                    </button>
                  </nav>
                </motion.div>
            )}
          </AnimatePresence>

          {/* Notification Sidebar */}
          <AnimatePresence>
            {notificationSidebarOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={sidebarVariants}
                    className="fixed inset-y-0 right-0 w-full h-screen sm:w-80 bg-white shadow-lg z-50"
                    ref={notificationSidebarRef}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 border-b">
                      <h2 className="text-xl font-semibold">Notifications</h2>
                      <button
                          onClick={toggleNotificationSidebar}
                          className="text-gray-500 hover:text-gray-700"
                          aria-label="Close notifications"
                      >
                        <FaTimes size={24} />
                      </button>
                    </div>
                    <div className="flex-grow h-screen bg-white overflow-y-auto">
                      {isLoading ? (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Loading...</p>
                          </div>
                      ) : notifications.length > 0 ? (
                          <div className="p-4">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`mb-4 p-3 rounded-lg border-l-4 ${getCategoryColor(
                                        notification.category
                                    )} relative`}
                                >
                                  {notification.link ? (
                                      <Link
                                          to={notification.link}
                                          className="block"
                                          onClick={() =>
                                              markNotificationAsRead(notification.id)
                                          }
                                      >
                                        <p className="text-gray-800">
                                          {notification.content}
                                        </p>
                                      </Link>
                                  ) : (
                                      <p className="text-gray-800">
                                        {notification.content}
                                      </p>
                                  )}
                                  <p className="text-sm text-gray-500 mt-1">
                                    {new Date(notification.created_at).toLocaleString()}
                                  </p>
                                  <button
                                      onClick={() => deleteNotification(notification.id)}
                                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                      aria-label="Delete notification"
                                  >
                                    <FaTimes size={16} />
                                  </button>
                                </div>
                            ))}
                          </div>
                      ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">No new notifications</p>
                          </div>
                      )}
                    </div>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </header>
      </Headroom>
  );
};

export default Navbar;
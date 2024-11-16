// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     setFormData({ name: '', email: '', message: '' });
//   };

//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br bg-[#275079] py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <motion.h1
//           initial="initial"
//           animate="animate"
//           variants={fadeInUp}
//           className="text-5xl font-extrabold text-center mb-8 text-white"
//         >
//           Let's Connect
//         </motion.h1>

//         <motion.p
//           initial="initial"
//           animate="animate"
//           variants={fadeInUp}
//           className="text-xl text-center text-white mb-12 max-w-3xl mx-auto"
//         >
//           Your future is calling. Reach out and let's shape your career path together.
//         </motion.p>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <motion.div
//             initial="initial"
//             animate="animate"
//             variants={fadeInUp}
//             className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
//           >
//             <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 rounded-full bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-transparent focus:border-white focus:ring-0 transition duration-300"
//                   placeholder="Your Name"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 rounded-full bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-transparent focus:border-white focus:ring-0 transition duration-300"
//                   placeholder="your@email.com"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 rounded-2xl bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-transparent focus:border-white focus:ring-0 transition duration-300 h-32"
//                   placeholder="Your message here..."
//                   required
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-white text-purple-600 font-bold py-3 px-4 rounded-full hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
//               >
//                 <Send className="w-5 h-5 mr-2" />
//                 Send Message
//               </button>
//             </form>
//           </motion.div>

//           <motion.div
//             initial="initial"
//             animate="animate"
//             variants={fadeInUp}
//             className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
//           >
//             <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
//             <div className="space-y-6">
//               <div className="flex items-center text-white">
//                 <MapPin className="w-8 h-8 mr-4 text-pink-300" />
//                 <span>123 Dream Career Avenue, Ambition City, 54321</span>
//               </div>
//               <div className="flex items-center text-white">
//                 <Phone className="w-8 h-8 mr-4 text-pink-300" />
//                 <span>+1 (555) 987-6543</span>
//               </div>
//               <div className="flex items-center text-white">
//                 <Mail className="w-8 h-8 mr-4 text-pink-300" />
//                 <span>future@studentcareerguidance.com</span>
//               </div>
//               <div className="flex items-center text-white">
//                 <Clock className="w-8 h-8 mr-4 text-pink-300" />
//                 <span>Monday - Friday: 9am - 6pm</span>
//               </div>
//             </div>

//             <div className="mt-12">
//               <h3 className="text-2xl font-bold text-white mb-4">Find Your Way to Success</h3>
//               <div className="rounded-2xl overflow-hidden shadow-lg">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648750455!2d-73.98784534903857!3d40.74844097922791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629794729807!5m2!1sen!2sus"
//                   width="100%"
//                   height="300"
//                   style={{ border: 0 }}
//                   allowFullScreen={false}
//                   loading="lazy"
//                   title="Our Location"
//                 ></iframe>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;
// import React, { useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
// import emailjs from '@emailjs/browser';

// const ContactUs = () => {
//   const form = useRef();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   const [isValidEmail, setIsValidEmail] = useState(true);

//   const userid = "service_nm4slgk"; // Your EmailJS service ID
//   const templateid = "template_exooari"; // Your EmailJS template ID
//   const myapi = "qbaTDu1MQLBILlCS7"; // Your EmailJS public API key

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));

//     if (name === 'email') {
//       setIsValidEmail(/\S+@\S+\.\S+/.test(value));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!isValidEmail) {
//       alert("Please enter a valid email address.");
//       return;
//     }

//     emailjs.sendForm(userid, templateid, form.current, myapi).then(
//       (result) => {
//         e.target.reset();
//         alert("Message sent successfully!");
//         setFormData({ name: '', email: '', message: '' }); // Reset form data
//       },
//       (error) => {
//         alert("Something went wrong! Try again after some time.");
//       }
//     );
//   };

//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br bg-[#275079] py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <motion.h1
//           initial="initial"
//           animate="animate"
//           variants={fadeInUp}
//           className="text-5xl font-extrabold text-center mb-8 text-white"
//         >
//           Let's Connect
//         </motion.h1>

//         <motion.p
//           initial="initial"
//           animate="animate"
//           variants={fadeInUp}
//           className="text-xl text-center text-white mb-12 max-w-3xl mx-auto"
//         >
//           Your future is calling. Reach out and let's shape your career path together.
//         </motion.p>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <motion.div
//             initial="initial"
//             animate="animate"
//             variants={fadeInUp}
//             className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
//           >
//             <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
//             <form ref={form} onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="user_name" // Change to match EmailJS field name
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 rounded-full bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-transparent focus:border-white focus:ring-0 transition duration-300"
//                   placeholder="Your Name"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="user_email" // Change to match EmailJS field name
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 rounded-full bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-transparent focus:border-white focus:ring-0 transition duration-300 ${!isValidEmail ? 'border-red-500' : ''}`}
//                   placeholder="your@email.com"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message" // Change to match EmailJS field name
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 rounded-2xl bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-transparent focus:border-white focus:ring-0 transition duration-300 h-32"
//                   placeholder="Your message here..."
//                   required
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-white text-purple-600 font-bold py-3 px-4 rounded-full hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
//               >
//                 <Send className="w-5 h-5 mr-2" />
//                 Send Message
//               </button>
//             </form>
//           </motion.div>

//           <motion.div
//             initial="initial"
//             animate="animate"
//             variants={fadeInUp}
//             className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
//           >
//             <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
//             <div className="space-y-6">
//               <div className="flex items-center text-white">
//                 <MapPin className="w-8 h-8 mr-4 text-pink-300" />
//                 <span>123 Dream Career Avenue, Ambition City, 54321</span>
//               </div>
//               <div className="flex items-center text-white">
//                 <Phone className="w-8 h-8 mr-4 text-pink-300" />
//                 <span>+1 (555) 987-6543</span>
//               </div>
//               <div className="flex items-center text-white">
//                 <Mail className="w-8 h-8 mr-4 text-pink-300" />
//                 <span>future@studentcareerguidance.com</span>
//               </div>
//               <div className="flex items-center text-white">
//                 <Clock className="w-8 h-8 mr-4 text-pink-300" />
//                 <span>Monday - Friday: 9am - 6pm</span>
//               </div>
//             </div>

//             <div className="mt-12">
//               <h3 className="text-2xl font-bold text-white mb-4">Find Your Way to Success</h3>
//               <div className="rounded-2xl overflow-hidden shadow-lg">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648750455!2d-73.98784534903857!3d40.74844097922791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629794729807!5m2!1sen!2sus"
//                   width="100%"
//                   height="300"
//                   style={{ border: 0 }}
//                   allowFullScreen={false}
//                   loading="lazy"
//                   title="Our Location"
//                 ></iframe>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

// import React, { useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
// import emailjs from '@emailjs/browser';

// const ContactUs = () => {
//   const form = useRef();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   const [isValidEmail, setIsValidEmail] = useState(true);

//   const userid = "service_nm4slgk";
//   const templateid = "template_exooari";
//   const myapi = "qbaTDu1MQLBILlCS7";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));

//     if (name === 'email') {
//       setIsValidEmail(/\S+@\S+\.\S+/.test(value));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!isValidEmail) {
//       alert("Please enter a valid email address.");
//       return;
//     }

//     emailjs.sendForm(userid, templateid, form.current, myapi).then(
//       (result) => {
//         e.target.reset();
//         alert("Message sent successfully!");
//         setFormData({ name: '', email: '', message: '' });
//       },
//       (error) => {
//         alert("Something went wrong! Try again after some time.");
//       }
//     );
//   };

//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br bg-[#275079] py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <motion.h1
//           initial="initial"
//           animate="animate"
//           variants={fadeInUp}
//           className="text-5xl font-extrabold text-center mb-8 text-white"
//         >
//           Let's Connect
//         </motion.h1>

//         <motion.p
//           initial="initial"
//           animate="animate"
//           variants={fadeInUp}
//           className="text-xl text-center text-white mb-12 max-w-3xl mx-auto"
//         >
//           Your future is calling. Reach out and let's shape your career path together.
//         </motion.p>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <motion.div
//             initial="initial"
//             animate="animate"
//             variants={fadeInUp}
//             className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
//           >
//             <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
//             <form ref={form} onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="user_name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 rounded-full bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 border border-transparent focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300"
//                   placeholder="Your Name"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="user_email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 rounded-full bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 border border-transparent focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300 ${!isValidEmail ? 'border-red-500' : ''}`}
//                   placeholder="your@email.com"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 rounded-2xl bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 border border-transparent focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300 h-32"
//                   placeholder="Your message here..."
//                   required
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-white text-purple-600 font-bold py-3 px-4 rounded-full hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
//               >
//                 <Send className="w-5 h-5 mr-2" />
//                 Send Message
//               </button>
//             </form>
//           </motion.div>

//           <motion.div
//             initial="initial"
//             animate="animate"
//             variants={fadeInUp}
//             className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
//           >
//             <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
//             <div className="space-y-6">
//               <div className="flex items-center text-white">
//                 <MapPin className="w-8 h-8 mr-4 text-pink-300" />
//                 <span>123 Dream Career Avenue, Ambition City, 54321</span>
//               </div>
//               <div className="flex items-center text-white">
//                 <Phone className="w-8 h-8 mr-4 text-pink-300" />
//                 <span>+1 (555) 987-6543</span>
//               </div>
//               <div className="flex items-center text-white">
//                 <Mail className="w-8 h-8 mr-4 text-pink-300" />
//                 <span>future@studentcareerguidance.com</span>
//               </div>
//               <div className="flex items-center text-white">
//                 <Clock className="w-8 h-8 mr-4 text-pink-300" />
//                 <span>Monday - Friday: 9am - 6pm</span>
//               </div>
//             </div>

//             <div className="mt-12">
//               <h3 className="text-2xl font-bold text-white mb-4">Find Your Way to Success</h3>
//               <div className="rounded-2xl overflow-hidden shadow-lg">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648750455!2d-73.98784534903857!3d40.74844097922791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629794729807!5m2!1sen!2sus"
//                   width="100%"
//                   height="300"
//                   style={{ border: 0 }}
//                   allowFullScreen={false}
//                   loading="lazy"
//                   title="Our Location"
//                 ></iframe>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isValidEmail, setIsValidEmail] = useState(true);

  const userid = "service_vrxrss3"; // Your EmailJS service ID
  const templateid = "template_h8gu4n8"; // Your EmailJS template ID
  const myapi = "akzY_6dbotnJBfIvc"; // Your EmailJS public API key

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({ ...prevState, [name]: value }));

      if (name === "email") {
        setIsValidEmail(/\S+@\S+\.\S+/.test(value));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!isValidEmail) {
        alert("Please enter a valid email address.");
        return;
      }

      emailjs.sendForm(userid, templateid, form.current, myapi).then(
        (result) => {
          e.target.reset();
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          alert("Something went wrong! Try again after some time.");
        }
      );
    };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#275079] to-[#1a365d] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-5xl font-extrabold text-center mb-8 text-white"
        >
          Let's Connect
        </motion.h1>

        <motion.p
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-xl text-center text-white mb-12 max-w-3xl mx-auto"
        >
          Your future is calling. Reach out and let's shape your career path
          together.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="user_name" // Ensure this matches your EmailJS template field
                  // value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 border border-transparent focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="user_email" // Ensure this matches your EmailJS template field
                  // value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-full bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 border border-transparent focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300 ${
                    !isValidEmail ? "border-red-500" : ""
                  }`}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message" // Ensure this matches your EmailJS template field
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-2xl bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 border border-transparent focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300 h-32"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-white text-purple-600 font-bold py-3 px-4 rounded-full hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-center text-white">
                <MapPin className="w-8 h-8 mr-4 text-pink-300" />
                <span>123 Dream Career Avenue, Ambition City, 54321</span>
              </div>
              <div className="flex items-center text-white">
                <Phone className="w-8 h-8 mr-4 text-pink-300" />
                <span>+1 (555) 987-6543</span>
              </div>
              <div className="flex items-center text-white">
                <Mail className="w-8 h-8 mr-4 text-pink-300" />
                <span>future@studentcareerguidance.com</span>
              </div>
              <div className="flex items-center text-white">
                <Clock className="w-8 h-8 mr-4 text-pink-300" />
                <span>Monday - Friday: 9am - 6pm</span>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-4">
                Find Your Way to Success
              </h3>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648750455!2d-73.98784534903857!3d40.74844097922791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629794729807!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Our Location"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

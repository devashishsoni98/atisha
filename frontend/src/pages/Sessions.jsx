import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Man from "../assets/mankibaat.jpg";

const fallbackSessions = [
  {
    id: 1,
    title: "Mann Ki Baat",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore repellat, numquam excepturi voluptas, nemo repellendus, quis possimus repudiandae qui hic asperiores laudantium corporis ex sunt. Reiciendis eligendi sequi dolorum, pariatur neque repellat voluptates, itaque culpa rerum doloremque adipisci impedit esse ex, placeat beatae. Laborum consectetur vel at officia, doloremque id. Maxime recusandae autem culpa rem quo maiores quidem, ad a dolore corporis, harum aliquid neque, deserunt accusantium voluptates minima officia.",
    image: Man,
  },
  {
    id: 2,
    title: "Session Title 2",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore repellat, numquam excepturi voluptas, nemo repellendus, quis possimus repudiandae qui hic asperiores laudantium corporis ex sunt. Reiciendis eligendi sequi dolorum, pariatur neque repellat voluptates, itaque culpa rerum doloremque adipisci impedit esse ex, placeat beatae. Laborum consectetur vel at officia, doloremque id. Maxime recusandae autem culpa rem quo maiores quidem, ad a dolore corporis, harum aliquid neque, deserunt accusantium voluptates minima officia.",
    image: Man,
  },
  {
    id: 3,
    title: "Session Title 3",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore repellat, numquam excepturi voluptas, nemo repellendus, quis possimus repudiandae qui hic asperiores laudantium corporis ex sunt. Reiciendis eligendi sequi dolorum, pariatur neque repellat voluptates, itaque culpa rerum doloremque adipisci impedit esse ex, placeat beatae. Laborum consectetur vel at officia, doloremque id. Maxime recusandae autem culpa rem quo maiores quidem, ad a dolore corporis, harum aliquid neque, deserunt accusantium voluptates minima officia.",
    image: Man,
  },
  {
    id: 4,
    title: "Session Title 4",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore repellat, numquam excepturi voluptas, nemo repellendus, quis possimus repudiandae qui hic asperiores laudantium corporis ex sunt. Reiciendis eligendi sequi dolorum, pariatur neque repellat voluptates, itaque culpa rerum doloremque adipisci impedit esse ex, placeat beatae. Laborum consectetur vel at officia, doloremque id. Maxime recusandae autem culpa rem quo maiores quidem, ad a dolore corporis, harum aliquid neque, deserunt accusantium voluptates minima officia.",
    image: Man,
  },
  {
    id: 5,
    title: "Session Title 5",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore repellat, numquam excepturi voluptas, nemo repellendus, quis possimus repudiandae qui hic asperiores laudantium corporis ex sunt. Reiciendis eligendi sequi dolorum, pariatur neque repellat voluptates, itaque culpa rerum doloremque adipisci impedit esse ex, placeat beatae. Laborum consectetur vel at officia, doloremque id. Maxime recusandae autem culpa rem quo maiores quidem, ad a dolore corporis, harum aliquid neque, deserunt accusantium voluptates minima officia.",
    image: Man,
  },
];

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    try {
      const response = await fetch("https://api.example.com/sessions");
      const data = await response.json();

      if (data && data.length > 0) {
        setSessions(data);
      } else {
        setSessions(fallbackSessions);
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setSessions(fallbackSessions);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="w-full min-h-screen px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-10 w-full text-center"
      >
        <h1 className="text-4xl font-bold primary_color">Sessions</h1>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary_color"></div>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 h-auto w-full"
        >
          {sessions.map((session) => (
            <motion.div
              key={session.id}
              variants={itemVariants}
              className="p-4 rounded-2xl bg_gray flex flex-col md:flex-row gap-4 mb-4"
            >
              <div className="rounded-xl overflow-hidden w-full md:w-[40%]">
                <img src={session.image} alt={session.title} className="w-full h-auto object-cover" />
              </div>
              <div className="w-full md:w-[60%] rounded-xl p-2 px-4 bg_dark_gray grid gap-2">
                <h2 className="text-2xl font-semibold">{session.title}</h2>
                <p className="p-1 text-justify line-clamp-5">{session.description}</p>
                
                <div className="w-full flex flex-col sm:flex-row justify-evenly items-center gap-2">
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto p-2 px-6 text-sm font-semibold rounded-full bg_light_primary_color text-white cursor-pointer text-center"
                    href={`/sessions/details/${session.id}`}
                  >
                    View Details
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto p-2 px-6 text-sm font-semibold rounded-full text-white bg_light_primary_color cursor-pointer text-center"
                    href={`/sessions/join/${session.id}`}
                  >
                    Join Session
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Sessions;
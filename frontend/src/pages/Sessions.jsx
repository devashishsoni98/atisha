import React, { useEffect, useState } from "react";
import Man from "../assets/mankibaat.jpg"; 

const fallbackSessions = [
  {
    id: 1,
    title: "Mann Ki Baat",
    description: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore repellat, numquam excepturi voluptas, nemo repellendus, quis possimus repudiandae qui hic asperiores laudantium corporis ex sunt. Reiciendis eligendi sequi dolorum, pariatur neque repellat voluptates, itaque culpa rerum doloremque adipisci impedit esse ex, placeat beatae. Laborum consectetur vel at officia, doloremque id. Maxime recusandae autem culpa rem quo maiores quidem, ad a dolore corporis, harum aliquid neque, deserunt accusantium voluptates minima officia.",
    image: Man,
  },
  {
    id: 2,
    title: "Session Title 2",
    description: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore repellat, numquam excepturi voluptas, nemo repellendus, quis possimus repudiandae qui hic asperiores laudantium corporis ex sunt. Reiciendis eligendi sequi dolorum, pariatur neque repellat voluptates, itaque culpa rerum doloremque adipisci impedit esse ex, placeat beatae. Laborum consectetur vel at officia, doloremque id. Maxime recusandae autem culpa rem quo maiores quidem, ad a dolore corporis, harum aliquid neque, deserunt accusantium voluptates minima officia.",
    image: Man, // Replace with actual image
  },
  {
    id: 3,
    title: "Session Title 3",
    description: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore repellat, numquam excepturi voluptas, nemo repellendus, quis possimus repudiandae qui hic asperiores laudantium corporis ex sunt. Reiciendis eligendi sequi dolorum, pariatur neque repellat voluptates, itaque culpa rerum doloremque adipisci impedit esse ex, placeat beatae. Laborum consectetur vel at officia, doloremque id. Maxime recusandae autem culpa rem quo maiores quidem, ad a dolore corporis, harum aliquid neque, deserunt accusantium voluptates minima officia.",
    image: Man, // Replace with actual image
  },
  {
    id: 4,
    title: "Session Title 4",
    description: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore repellat, numquam excepturi voluptas, nemo repellendus, quis possimus repudiandae qui hic asperiores laudantium corporis ex sunt. Reiciendis eligendi sequi dolorum, pariatur neque repellat voluptates, itaque culpa rerum doloremque adipisci impedit esse ex, placeat beatae. Laborum consectetur vel at officia, doloremque id. Maxime recusandae autem culpa rem quo maiores quidem, ad a dolore corporis, harum aliquid neque, deserunt accusantium voluptates minima officia.",
    image: Man, // Replace with actual image
  },
  {
    id: 5,
    title: "Session Title 5",
    description: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore repellat, numquam excepturi voluptas, nemo repellendus, quis possimus repudiandae qui hic asperiores laudantium corporis ex sunt. Reiciendis eligendi sequi dolorum, pariatur neque repellat voluptates, itaque culpa rerum doloremque adipisci impedit esse ex, placeat beatae. Laborum consectetur vel at officia, doloremque id. Maxime recusandae autem culpa rem quo maiores quidem, ad a dolore corporis, harum aliquid neque, deserunt accusantium voluptates minima officia.",
    image: Man, // Replace with actual image
  },
];

const Sessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("https://api.example.com/sessions"); // Replace with your API URL
        const data = await response.json();

        if (data && data.length > 0) {
          setSessions(data);
        } else {
          setSessions(fallbackSessions);
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
        setSessions(fallbackSessions); // Fall back to default sessions on error
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="w-full min-h-screen px-6">
      {/* Heading */}
      <div className="mt-10 w-full text-center">
        <h1 className="text-4xl font-bold">Sessions</h1>
      </div>

      {/* Sessions */}
      <div className="mt-10 h-auto w-full">
        {sessions.map((session) => (
          <div key={session.id} className="p-4 rounded-2xl bg_gray flex gap-4 mb-4">
            <div className="rounded-xl overflow-hidden w-[40%]">
              <img src={session.image} alt={session.title} className="w-full h-auto" />
            </div>
            <div className="w-[60%] rounded-xl p-2 px-4 bg_dark_gray grid gap-2">
              <h2 className="text-2xl font-semibold">{session.title}</h2>
              <p className="p-1 text-justify line-clamp-5">{session.description}</p>
              
              <div className="w-full flex justify-evenly items-center">
                <a 
                  className="p-2 px-6 text-sm font-semibold rounded-full bg_primary_color cursor-pointer"
                  href={`/sessions/details/${session.id}`}
                >
                  View Details
                </a>
                <a 
                  className="p-2 px-6 text-sm font-semibold rounded-full bg_primary_color cursor-pointer"
                  href={`/sessions/join/${session.id}`}
                >
                  Join Session
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sessions;
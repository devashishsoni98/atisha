import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SessionsLists = ({ sessions, loading }) => {
    console.log(sessions);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <div className="space-y-6 p-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">My Sessions</h2>
            {sessions.length > 0 ? (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                >
                    {sessions?.map(session => (
                        <motion.div
                            key={session.id}
                            variants={itemVariants}
                            className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl "
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Session with {session.counselor ? session.counselor?.name : session.mentor?.name }
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    session.status === 'approved'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                                </span>
                            </div>
                            <div className="flex  justify-between items-end"> 

                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    <span className="font-medium">Date:</span> {new Date(session.date).toLocaleDateString()} at {new Date(session.start_time).toLocaleTimeString()}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Student:</span> {session?.student.name ? session.student?.name : session.mentor?.name}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Email:</span> {session.student.email}
                                </p>
                            </div>
                            <div className="">
                                {/* <Link to={`/chats/${session.counselor? session.counselor.id : session.mentor.id}`}> */}
                                <Link to="/chats">
                                hey
                                </Link>
                            </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-600 text-center text-lg bg-gray-100 rounded-lg p-8 shadow-inner"
                >
                    You don't have any sessions yet.
                </motion.p>
            )}
        </div>
    );
};

export default SessionsLists;


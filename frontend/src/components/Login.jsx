import React, {useState} from "react";
import {motion} from "framer-motion";
import {User, Building2, GraduationCap} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser, setToken, setUserId, setUserType, setUserName} from "../store/userActions";
import axios from "axios";

const Login = ({setAuthType}) => {
    // const [selectedType, setSelectedType] = useState("Student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const options = [
        {id: "Student", label: "Student", icon: GraduationCap},
        {id: "Institute", label: "Institute", icon: Building2},
        {id: "Counselor", label: "Counselor", icon: User},
        {id: "Mentor", label: "Mentor", icon: User},
    ];

        const handleLogin = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:4000/api/auth/users/login",
                    { email, password }
                );

                // Check if the response status is 200 (OK)
                if (response.status !== 200) {
                    throw new Error("Login failed");
                }

                const data = response.data; // Use response.data to get the API response
                console.log(data);

                // Assuming the API returns user info and a token
                const { token, user } = data; // Extracting user directly from response

                // Check if role exists and has a role_name
                const roleType = user.role_name ? user.role_name.toLowerCase() : null;
                console.log(roleType);
                // Check if role exists and has a role_name
                const userName = user.name;
                console.log(userName);

                dispatch(setToken(token)); // Store token in Redux
                dispatch(setUserId(user.id)); // Store user ID in localStorage
                dispatch(setUserType(roleType)); // Store user type in localStorage
                dispatch(setUserName(userName)); //store user name in redux
                
                    navigate("/onboarding"); 

            } catch (error) {
                alert(error.message);
            }
        };
return (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.5}}
        className="flex justify-center items-center w-full min-h-screen"
        style={{
            background:
                "linear-gradient(135deg, #EBF4FF 0%, #FFFFFF 50%, #FAF5FF 100%)",
            position: "relative",
        }}
    >
        {/* Background Pattern */}
        <div
            className="absolute inset-0 opacity-10"
            style={{
                backgroundImage: `radial-gradient(circle at center, #4A5568 2px, transparent 2px)`,
                backgroundSize: "24px 24px",
            }}
        />

        <motion.div
            initial={{y: -20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.5, delay: 0.2}}
            className="relative bg-white/90 backdrop-blur-sm w-full max-w-2xl p-12 rounded-2xl shadow-xl m-8"
        >
            <motion.h1
                initial={{y: -10, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5, delay: 0.3}}
                className="mb-8 text-center text-4xl font-bold text-gray-800"
            >
                Login to Atisha
            </motion.h1>

            <div className="space-y-8">
               

                <motion.div
                    initial={{y: 10, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.5, delay: 0.5}}
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
                            className="w-full px-6 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration=200"
                            placeholder="Password"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{y: 10, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.5, delay: 0.6}}
                >
                    <motion.button
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                        className="w-full bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition duration=300 hover:bg-blue=700 shadow-lg hover=shadow-xl"
                        onClick={handleLogin} // Updated function call here
                    >
                        Login
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{y: 10, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.5, delay: 0.7}}
                    className='text-center mt=8'
                >
                    <p className='text-base text-gray=600'>
                        Haven't signed up yet?{" "}
                        <motion.span
                            whileHover={{scale: 1.05}}
                            className='text-blue=500 cursor-pointer hover=underline font-medium'
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
}
;

export default Login;
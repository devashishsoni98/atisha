// import React, { useEffect, useState } from "react";
// import { User, Building2, GraduationCap } from "lucide-react";
// import { replace, useNavigate } from "react-router-dom";

// const SignUp = ({ setAuthType }) => {
//   const [selectedType, setSelectedType] = useState("Student");
//   const id = 1;
//   const navigator = useNavigate();

//   const options = [
//     {
//       id: "Student",
//       label: "Student",
//       icon: GraduationCap,
//     },
//     {
//       id: "Institute",
//       label: "Institute",
//       icon: Building2,
//     },
//     {
//       id: "Counselor",
//       label: "Counselor",
//       icon: User,
//     },
//   ];

//   const handleRegister= async()=>{
//     if(selectedType==="Student"){
//       navigator(`/dashboard/student/${id}`)
//     }
//     else if(selectedType==="Institute"){
//       navigator(`/dashboard/institute/${id}`)
//     }
//     else if(selectedType==="Counselor"){
//       navigator(`/dashboard/counselor/${id}`)
//     }
//     else{
//       alert("Issue in redirecting")
//     }
//   }


//   useEffect(() => {
//     console.log(selectedType);
//   });

//   return (
//     <div className="flex justify-center items-center w-full h-screen">
//       <div className="bg_dark_gray w-[65vh] h-[70vh] rounded-xl ">

//       <h1 className="my-6 text-center text-2xl " >Create your account with Atisha</h1>

//           <div className="my-4 grid gap-2 px-2">
//             <h3 className="text-sm ">Create account as</h3>
//             <div className="flex flex-wrap gap-4 pl-4">
//               {options.map(({ id, label, icon: Icon }) => (
//                 <div key={id} className="relative">
//                   <input
//                     type="radio"
//                     id={id}
//                     name="accountType"
//                     value={id}
//                     checked={selectedType === id}
//                     onChange={(e) => setSelectedType(e.target.value)}
//                     className="peer absolute opacity-0 w-full h-full cursor-pointer"
//                   />
//                   <label
//                     htmlFor={id}
//                     className={`
//                 flex items-center gap-2 px-6 py-3 
//                 border rounded-full cursor-pointer
//                 transition-all duration-200
//                 peer-checked:text-blue-600 
//                 peer-checked:border-blue-600 
//                 peer-checked:bg-blue-50
//                 hover:bg-gray-50 
//                 peer-checked:hover:bg-blue-100
//               `}
//                   >
//                     <Icon className="w-5 h-5" />
//                     <span className="text-sm font-medium">{label}</span>
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         <div className="grid gap-4">
//           <div className="px-2">
//             <input
//               type="text"
//               className="ml-4 w-[57vh] px-6 py-2 rounded-md"
//               placeholder="Full Name"
//             />
//           </div>
//           <div className="px-2">
//             <input
//               type="email"
//               className="ml-4 w-[57vh] px-6 py-2 rounded-md"
//               placeholder="Email"
//             />
//           </div>
//           <div className="px-2">
//             <input
//               type="password"
//               className="ml-4 w-[57vh] px-6 py-2 rounded-md"
//               placeholder="Password"
//             />
//           </div>
//           <div className="px-2">
//             <input
//               type="password"
//               className="ml-4 w-[57vh] px-6 py-2 rounded-md"
//               placeholder="Confirm Password"
//             />
//           </div>
//         </div>

//         <div className="my-4 flex py-2   justify-center">
//           <button className="bg-[#65DB82] px-6 py-2 font-semibold rounded " onClick={()=>handleRegister()}>
//             Register
//           </button>
//         </div>

//         <div className="text-center">
//           <p>
//             Already signup ?
//             <span className="text-blue-500 cursor-pointer hover:border-b-2 border-blue-700 hover:text-blue-700" onClick={()=>setAuthType("login")}>
//               Login
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import React, { useEffect, useState } from "react";
import { User, Building2, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'; // Importing Axios

const SignUp = ({ setAuthType }) => {
  const [selectedType, setSelectedType] = useState("Student");
  const navigator = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const options = [
    { id: "Student", label: "Student", icon: GraduationCap },
    { id: "Institute", label: "Institute", icon: Building2 },
    { id: "Counselor", label: "Counselor", icon: User },
  ];

  const handleRegister = async (data) => {
    const { fullName, email, password, confirmPassword } = data;

    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const accountType = selectedType.toLowerCase(); // Convert to lowercase for consistency

    const userData = {
      fullName,
      email,
      password,
      accountType,
    };

    try {
      const response = await axios.post("http://localhost:4000/api/signup", userData); // Using Axios to send POST request

      // Handle successful registration
      navigator(`/dashboard/${accountType}/${response.data.id}`);
      
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  useEffect(() => {
    console.log(selectedType);
  }, [selectedType]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="bg_dark_gray w-[65vh] h-[70vh] rounded-xl ">
        <h1 className="my-6 text-center text-2xl">Create your account with Atisha</h1>
        <form onSubmit={handleSubmit(handleRegister)} className="my-4 grid gap-2 px-2">
          <h3 className="text-sm">Create account as</h3>
          <div className="flex flex-wrap gap-4 pl-4">
            {options.map(({ id, label, icon: Icon }) => (
              <div key={id} className="relative">
                <input
                  type="radio"
                  id={id}
                  name="accountType"
                  value={id}
                  checked={selectedType === id}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="peer absolute opacity-0 w-full h-full cursor-pointer"
                />
                <label
                  htmlFor={id}
                  className={`
                    flex items-center gap-2 px-6 py-3 
                    border rounded-full cursor-pointer
                    transition-all duration-200
                    peer-checked:text-blue-600 
                    peer-checked:border-blue-600 
                    peer-checked:bg-blue-50
                    hover:bg-gray-50 
                    peer-checked:hover:bg-blue-100
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{label}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="grid gap-4">
            <div className="px-2">
              <input
                type="text"
                {...register("fullName", { required: true })}
                className="ml-4 w-[57vh] px-6 py-2 rounded-md"
                placeholder="Full Name"
              />
              {errors.fullName && <span className="text-red-500">Full Name is required</span>}
            </div>
            <div className="px-2">
              <input
                type="email"
                {...register("email", { required: true })}
                className="ml-4 w-[57vh] px-6 py-2 rounded-md"
                placeholder="Email"
              />
              {errors.email && <span className="text-red-500">Email is required</span>}
            </div>
            <div className="px-2">
              <input
                type="password"
                {...register("password", { required: true })}
                className="ml-4 w-[57vh] px-6 py-2 rounded-md"
                placeholder="Password"
              />
              {errors.password && <span className="text-red-500">Password is required</span>}
            </div>
            <div className="px-2">
              <input
                type="password"
                {...register("confirmPassword", { required: true })}
                className="ml-4 w-[57vh] px-6 py-2 rounded-md"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <span className="text-red-500">Confirm Password is required</span>}
            </div>
          </div>

          <div className="my-4 flex py-2 justify-center">
            <button type="submit" className="bg-[#65DB82] px-6 py-2 font-semibold rounded">
              Register
            </button>
          </div>

          <div className="text-center">
            <p>
              Already signed up?
              <span 
                className="text-blue-500 cursor-pointer hover:border-b-2 border-blue-700 hover:text-blue-700" 
                onClick={() => setAuthType("login")}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
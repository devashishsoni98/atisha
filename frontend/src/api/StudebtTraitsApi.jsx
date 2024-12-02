import  axios from "axios";
const BASE_URL = "http://localhost:4000/api";

export const getStudentTraitsByStudentId = async (userId) => {
    console.log("Fetching student traits for student ID:", userId);
  const response = await  axios.get(`${BASE_URL}/student-traits/${userId}`);
    console.log(response.data);
   return  response.data;
};
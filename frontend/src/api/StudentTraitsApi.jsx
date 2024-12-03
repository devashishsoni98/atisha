
import apiBackend from '../utils/api'
const BASE_URL = "http://localhost:4000/api";

export const getStudentTraitsByStudentId = async (userId) => {
    console.log("Fetching student traits for student ID:", userId);
  const response = await  apiBackend.get(`${BASE_URL}/student-traits/${userId}`);
   return  response.data;
};
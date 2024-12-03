import apibackend from "../utils/api";

export const getCompletedEvents = async () => {
  const response = await apibackend.get("/events/completed");
  console.log(response.data);

  return response.data;
};

export const getUpcommingEvents = async () => {
  const response = await apibackend.get("/events/upcoming");
  console.log(response.data);
  return response.data;
};

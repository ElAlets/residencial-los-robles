import api from "./api";

export const getEmergencyServices = async () => {

  const response = await api.get("/emergency");

  return response.data;

};
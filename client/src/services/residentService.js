import api from "./api";

export const getResidents = async () => {

  const response = await api.get("/residents");

  return response.data;

};
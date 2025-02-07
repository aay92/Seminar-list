import axios from "axios";

const API_URL = "http://localhost:4000/seminars";

export const fetchSeminars = async () => {
  try {
    const responce = await axios.get(API_URL);
    return responce.data;
  } catch (error) {
    console.log("Ошибка с получением данных seminars", error);
    throw error;
  }
};

export const deleteSeminar = async (id: number) => {
  try {
    axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.log("Ошибка с удалением семинара", error);
    throw error;
  }
};

export const updateSeminar = async (id: number, updatedDate: any) => {
  try {
    axios.put(`${API_URL}/${id}`, updatedDate);
  } catch (error) {
    console.log("Ошибка с обновлением семинаров", error);
    throw error;
  }
};

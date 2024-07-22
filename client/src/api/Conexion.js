import axios from "axios";

const API_URL = "http://localhost:8080";
const headers = {
  "Content-Type": "application/json",
  "Authorization": localStorage.getItem("token")
};

export const get = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};

export const post = async (endpoint, data) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    };

    const response = await axios.post(`${API_URL}/${endpoint}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
};

export const put = async (endpoint, data) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    };

    const response = await axios.put(`${API_URL}/${endpoint}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error making PUT request:", error);
    throw error;
  }
};
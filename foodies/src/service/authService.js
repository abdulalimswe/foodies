import axios from "axios";

const API_URL = 'http://localhost:8080/api/users/';
const API_URL_LOGIN = 'http://localhost:8080/api/login';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}register`, userData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (userData) => {
    try{
        const response = await axios.post(`${API_URL_LOGIN}`, userData);
        return response;
    } catch (error) {
        throw error;
    }
};
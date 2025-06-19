import axios from "axios";
import BASE_URL from "./baseUrl";

//get token from local storage
const organizer = localStorage.getItem('organizer');
const token = JSON.parse(organizer || '{}').token;



export const getAllEvents = async () => {
    
    try {
        const response = await axios.get(`${BASE_URL}/event`,  {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'

            }
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
        return { error: error.response?.data || 'An unknown error occurred' }
    }
};

//create ticket
export const createTicket = async (data: any) => {
    
    try {
        const response = await axios.post(`${BASE_URL}/ticket`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'

            }
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
        return { error: error.response?.data || 'An unknown error occurred' }
    }
};
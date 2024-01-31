import axios from 'axios';
import { API_HOST } from '../constants';

export class UserService {
    static async addUser(data: {
        username: string;
        email: string;
        phone: string;
    }) {
        const response = await axios.post(`${API_HOST}/add-user`, data);

        return response.data;
    }

    static async getUser(id: number, token: string) {
        const response = await axios.get(`${API_HOST}/get-user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }
}
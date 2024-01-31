import axios from 'axios';
import { API_HOST } from '../constants';

export class AuthService {
    static async login(data: {
        username: string;
    }) {
        const response = await axios.post(`${API_HOST}/login`, data);

        return response.data;
    }
}
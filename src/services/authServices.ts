import axios, { type AxiosInstance } from 'axios';
import type {
	ApiResponse,
	IUser,
	SignInData,
	SignUpData,
} from '../shared/types/index.type';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api: AxiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const authService = {
	signUp: async (userData: SignUpData): Promise<ApiResponse<IUser>> => {
		try {
			const response = await api.post<ApiResponse<IUser>>(
				'/profile/signUp',
				userData,
			);
			return response.data;
		} catch (error: any) {
			throw (
				error.response?.data || {
					success: false,
					message: 'Error al registrar',
				}
			);
		}
	},

	signIn: async (credentials: SignInData): Promise<ApiResponse<IUser>> => {
		try {
			const response = await api.post<ApiResponse<IUser>>(
				'/profile/signIn',
				credentials,
			);
			return response.data;
		} catch (error: any) {
			throw (
				error.response?.data || {
					success: false,
					message: 'Error al iniciar sesión',
				}
			);
		}
	},

	signOut: async (): Promise<ApiResponse> => {
		try {
			const response = await api.post<ApiResponse>('/profile/signOut');
			return response.data;
		} catch (error: any) {
			throw (
				error.response?.data || {
					success: false,
					message: 'Error al cerrar sesión',
				}
			);
		}
	},

	getCurrentUser: async (): Promise<ApiResponse<IUser>> => {
		try {
			const response = await api.get<ApiResponse<IUser>>('/profile');
			return response.data;
		} catch (error: any) {
			throw (
				error.response?.data || {
					success: false,
					message: 'Error al obtener usuario',
				}
			);
		}
	},
};

export default api;

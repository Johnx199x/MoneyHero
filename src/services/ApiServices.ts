/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import axios, { type AxiosInstance } from 'axios';
import type { IAchievement } from '../shared/types/achievement';
import type {
	ApiResponse,
	IDashboardStats,
	IFilter,
	Transaction as ITransaction,
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
		Accept: 'application/json',
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
					message: 'Registration failed',
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
					message: 'Sign in failed',
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
					message: 'Sign out failed',
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
					message: 'Failed to fetch user',
				}
			);
		}
	},
};

export const TransactionService = {
	getAll: async (filter?: IFilter): Promise<ApiResponse<ITransaction[]>> => {
		try {
			const params = new URLSearchParams();
			if (filter?.type) params.append('type', filter.type);
			if (filter?.category) params.append('category', filter.category);

			const response = await api.get<ApiResponse<ITransaction[]>>(
				`/transactions${params.toString() ? `?${params.toString()}` : ''}`,
			);
			return response.data;
		} catch (error: any) {
			throw (
				error.response?.data || {
					success: false,
					message: 'Failed to fetch transactions',
				}
			);
		}
	},

	create: async (
		transaction: Omit<ITransaction, 'id'>,
	): Promise<ApiResponse<ITransaction>> => {
		try {
			const response = await api.post<ApiResponse<ITransaction>>(
				'/transactions',
				transaction,
			);
			return response.data;
		} catch (error: any) {
			throw (
				error.response?.data || {
					success: false,
					message: 'Failed to create transaction',
				}
			);
		}
	},

	update: async (
		id: string,
		updates: Partial<ITransaction>,
	): Promise<ApiResponse<ITransaction>> => {
		try {
			const response = await api.patch<ApiResponse<ITransaction>>(
				`/transactions/${id}`,
				updates,
			);

			return response.data;
		} catch (error: any) {
			throw (
				error.response?.data || {
					success: false,
					message: 'Failed to update transaction',
				}
			);
		}
	},

	delete: async (id: string): Promise<ApiResponse> => {
		try {
			const response = await api.delete<ApiResponse>(`/transactions/${id}`);
			return response.data;
		} catch (error: any) {
			throw (
				error.response?.data || {
					success: false,
					message: 'Failed to delete transaction',
				}
			);
		}
	},
};
export const DashboardService = {
	getStats: async (): Promise<ApiResponse<IDashboardStats>> => {
		try {
			const response =
				await api.get<ApiResponse<IDashboardStats>>('/dashboard/stats');
			return response.data;
		} catch (error: any) {
			throw (
				error.response?.data || {
					success: false,
					message: 'Failed to fetch dashboard stats',
				}
			);
		}
	},
};
export const AchievementService = {
	getAchievement: async (): Promise<ApiResponse<IAchievement[]>> => {
		try {
			const response =
				await api.get<ApiResponse<IAchievement[]>>('/achievement');
			return response.data;
		} catch (error: any) {
			throw (
				error.response?.data || {
					success: false,
					message: 'Failed to fetch achievement',
				}
			);
		}
	},
};

export default api;

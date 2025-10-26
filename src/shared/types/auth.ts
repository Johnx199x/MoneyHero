export interface IUser {
	id: string;
	username: string;
	email: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface SignUpData {
	username: string;
	email: string;
	password: string;
}

export interface SignInData {
	email: string;
	password: string;
}

export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	message: string;
	error?: any;
}

export interface AuthContextType {
	user: IUser | null;
	isAuthenticated: boolean;
	loading: boolean;
	signUp: (userData: SignUpData) => Promise<ApiResponse<IUser>>;
	signIn: (email: string, password: string) => Promise<ApiResponse<IUser>>;
	signOut: () => Promise<void>;
	checkAuth: () => Promise<void>;
}

// context/AuthContext.tsx
/** biome-ignore-all lint/suspicious/noAssignInExpressions: <explanation> */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { authService } from '../services/authServices';
import type {
	ApiResponse,
	AuthContextType,
	IUser,
	SignUpData,
} from '../shared/types/index.type';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<IUser | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const initAuth = async () => {
			await checkAuth();
		};
		initAuth();
	}, []);

	const checkAuth = async (): Promise<void> => {
		try {
			const response = await authService.getCurrentUser();
			if (response.success && response.data) {
				setUser(response.data);
				setIsAuthenticated(true);
			} else {
				setUser(null);
				setIsAuthenticated(false);
			}
		} catch (error) {
			setUser(null);
			setIsAuthenticated(false);
		} finally {
			setLoading(false);
		}
	};

	const signUp = async (userData: SignUpData): Promise<ApiResponse<IUser>> => {
		try {
			const response = await authService.signUp(userData);
			if (response.success) {
				return response;
			}
			throw new Error(response.message || 'Error en el registro');
		} catch (error: unknown) {
			throw error;
		}
	};

	const signIn = async (
		email: string,
		password: string,
	): Promise<ApiResponse<IUser>> => {
			const response = await authService.signIn({ email, password });
			if (response.success && response.data) {
				setUser(response.data);
				setIsAuthenticated(true);
				return response;
			}
			throw new Error(response.message || 'Error al iniciar sesión');
	};

	const signOut = async (): Promise<void> => {
		try {
			await authService.signOut();
			setUser(null);
			setIsAuthenticated(false);
		} catch (error) {
			console.error('Error al cerrar sesión:', error);
			setUser(null);
			setIsAuthenticated(false);
		}
	};

	const contextValue: AuthContextType = {
		user,
		isAuthenticated,
		loading,
		signUp,
		signIn,
		signOut,
		checkAuth,
	};

	return (
    <AuthContext.Provider value={contextValue} >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth debe ser usado dentro de AuthProvider');
	}
	return context;
}

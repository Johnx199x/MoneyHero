export type { Achievement } from './achievement';
export type {
	ApiResponse,
	AuthContextType,
	IUser,
	SignInData,
	SignUpData,
} from './auth';
export type { Category, Transaction } from './transaction';

export interface CardInfo {
	title: string;
	description: string;
	titleColor?: string;
}

export interface PlayerStats {
	level: number;
	hp: number; // Health Points (dinero actual)
	maxHp: number;
	exp: number;
	expToNextLevel: number;
	gold: number; //
}

export interface Achievement {
	id: string;
	name: string;
	description: string;
	icon: string;
	unlockedAt?: Date;
	isUnlocked: boolean;
}
export interface Quest {
	id: string;
	title: string;
	description: string;
	targetAmount: number;
	currentAmount: number;
	reward: {
		exp: number;
		gold: number;
		achievement?: string;
	};
	isCompleted: boolean;
	deadline?: Date;
}
export interface Transaction {
	id: string;
	type: 'income' | 'expense';
	amount: number;
	category: string;
	description: string;
	date: Date;

	battleResult: 'victory' | 'defeat' | 'critical';
	expGained: number;
	damageDealt?: number;
}
export interface PlayerState {
	//player data
	playerName: string;
	stats: PlayerStats;
	achievements: Achievement[];
	activeQuests: Quest[];
	completedQuests: Quest[];
	transactionHistory: Transaction[];

	// Settings
	settings: {
		theme: 'dark' | 'light';
		notificationsEnabled: boolean;
	};

	//record
	totalSaving: number;

	setPlayerName: (name: string) => void;

	//
	addIcome: (amount: number, description: string, category?: string) => void;
	addExpense: (amount: number, description: string, category?: string) => void;

	// exp and level system
	gainExp: (amount: number) => void;
	levelUp: () => void;

	//achievement
	unlockAchievement: (achievementId: string) => void;
	checkAchievement: () => void;
}

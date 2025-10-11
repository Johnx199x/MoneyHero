import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ACHIEVEMENTS } from '../../../../shared/constants/achievement';
import type { Transaction } from '../../../../shared/types/index.type';

export interface PlayerState {
	playerName: string;
	money: number;
	debt: number;
	level: number;
	percentLevel: number;
	exp: number;
	expToNextLevel: number;
	transactionHistory: Transaction[];
	unlockedAchievements: string[];

	checkAchievements: () => string[];
	setPlayerName: (name: string) => void;
	addMoney: (amount: number) => { gainedExp: number };
	spendMoney: (amount: number) => { losedExp: number; isDebt: boolean };
	addTransaction: (transaction: Transaction) => void;
	deleteTransaction: (id: string) => void;
	addExp: (amount: number) => void;
	loseExp: (amount: number) => void;
}

const config = {
	expGainRate: 0.1,
	expLossRate: 0.07,
	levelGrowthRate: 1.1,
	baseExp: 100,
};

function getExpForLevel(level: number): number {
	return Math.floor(config.baseExp * config.levelGrowthRate ** (level - 1));
}

function generateId(): string {
	if (typeof crypto !== 'undefined' && crypto.randomUUID) {
		return crypto.randomUUID();
	}
	return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Storage personalizado con manejo de errores
const storage = createJSONStorage<PlayerState>(() => ({
	getItem: (name: string) => {
		try {
			const str = localStorage.getItem(name);
			return str ? JSON.parse(str) : null;
		} catch (error) {
			console.error('Error reading from localStorage:', error);
			// Si hay error, devolver null y el estado inicial se usará
			return null;
		}
	},
	setItem: (name: string, value: string) => {
		try {
			localStorage.setItem(name, value);
		} catch (error) {
			console.error('Error writing to localStorage:', error);

			// Si es error de cuota, intentar limpiar espacio
			if (error instanceof Error && error.name === 'QuotaExceededError') {
				alert(
					'Storage is full! Your data might not be saved. Consider exporting your data.',
				);
			}
		}
	},
	removeItem: (name: string) => {
		try {
			localStorage.removeItem(name);
		} catch (error) {
			console.error('Error removing from localStorage:', error);
		}
	},
}));

export const usePlayerStore = create<PlayerState>()(
	persist(
		(set, get) => ({
			// Estado inicial
			playerName: 'Hero',
			money: 0,
			debt: 0,
			level: 1,
			exp: 0,
			percentLevel: 0,
			expToNextLevel: config.baseExp,
			transactionHistory: [],
			unlockedAchievements: [],

			checkAchievements: () => {
				try {
					const state = get();
					const newUnlocked: string[] = [];

					ACHIEVEMENTS.forEach(achievement => {
						try {
							const isUnlocked = state.unlockedAchievements.includes(
								achievement.id,
							);
							const meetsCondition = achievement.condition(state);

							if (!isUnlocked && meetsCondition) {
								newUnlocked.push(achievement.id);

								if (achievement.reward?.exp) {
									state.addExp(achievement.reward.exp);
								}
							}
						} catch (error) {
							console.error(
								`Error checking achievement ${achievement.id}:`,
								error,
							);
						}
					});

					if (newUnlocked.length > 0) {
						set({
							unlockedAchievements: [
								...state.unlockedAchievements,
								...newUnlocked,
							],
						});
					}

					return newUnlocked;
				} catch (error) {
					console.error('Error in checkAchievements:', error);
					return [];
				}
			},

			addTransaction: transaction => {
				try {
					const state = get();
					const transactionHistory = state.transactionHistory;
					const newTransaction = { ...transaction };

					newTransaction.id = generateId();

					if (newTransaction.type === 'income') {
						const result = state.addMoney(newTransaction.amount);
						newTransaction.expGained = result.gainedExp;
						newTransaction.battleResult = 'victory';
					} else {
						const result = state.spendMoney(newTransaction.amount);
						newTransaction.expLoosed = result.losedExp;
						newTransaction.battleResult = result.isDebt ? 'critical' : 'defeat';
					}

					const newTransactionHistory = [...transactionHistory, newTransaction];

					set({
						transactionHistory: newTransactionHistory,
					});

					setTimeout(() => {
						try {
							get().checkAchievements();
						} catch (error) {
							console.error(
								'Error checking achievements after transaction:',
								error,
							);
						}
					}, 0);
				} catch (error) {
					console.error('Error adding transaction:', error);
					throw new Error('Failed to add transaction');
				}
			},

			deleteTransaction: (id: string) => {
				try {
					const state = get();
					const transaction = state.transactionHistory.find(t => t.id === id);

					if (!transaction) return;

					const newHistory = state.transactionHistory.filter(t => t.id !== id);

					let money = 0;
					let debt = 0;
					let exp = 0;
					let level = 1;
					let expToNextLevel = config.baseExp;

					const sortedHistory = [...newHistory].sort(
						(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
					);

					for (const t of sortedHistory) {
						if (t.type === 'income') {
							if (debt > 0) {
								if (debt >= t.amount) {
									debt -= t.amount;
								} else {
									const remaining = t.amount - debt;
									debt = 0;
									money += remaining;
									exp += remaining * config.expGainRate;
								}
							} else {
								money += t.amount;
								exp += t.amount * config.expGainRate;
							}
						} else {
							if (money >= t.amount) {
								money -= t.amount;
							} else {
								const shortage = t.amount - money;
								money = 0;
								debt += shortage;
								exp -= shortage * config.expLossRate;
								exp = Math.max(0, exp);
							}
						}

						while (exp >= expToNextLevel) {
							exp -= expToNextLevel;
							level++;
							expToNextLevel = getExpForLevel(level);
						}

						while (exp < 0 && level > 1) {
							level--;
							expToNextLevel = getExpForLevel(level);
							exp += expToNextLevel;
						}
					}

					set({
						transactionHistory: newHistory,
						money: Math.floor(money),
						debt: Math.floor(debt),
						exp: Math.floor(exp),
						level,
						expToNextLevel: Math.floor(expToNextLevel),
						percentLevel: Math.floor((exp / expToNextLevel) * 100),
					});
				} catch (error) {
					console.error('Error deleting transaction:', error);
					throw new Error('Failed to delete transaction');
				}
			},

			setPlayerName: name => {
				try {
					set({ playerName: name });
				} catch (error) {
					console.error('Error setting player name:', error);
				}
			},

			addMoney: amount => {
				try {
					const state = get();
					let debt = state.debt;
					let newMoney = state.money;
					let gainedExp = (amount - debt) * config.expGainRate;

					if (debt !== 0) {
						if (debt - amount < 0) {
							newMoney = amount - debt;
							state.addExp(gainedExp);
							debt = 0;
						} else debt -= amount;
					} else {
						newMoney = state.money + amount;
						gainedExp = amount * config.expGainRate;
						state.addExp(gainedExp);
					}

					set({ money: newMoney, debt });
					return { gainedExp };
				} catch (error) {
					console.error('Error adding money:', error);
					return { gainedExp: 0 };
				}
			},

			spendMoney: amount => {
				try {
					const state = get();
					const newMoney = Math.max(0, state.money - amount);
					let isDebt = false;
					let newDebt = state.debt;
					let expLoosed = 0;

					if (state.money - amount < 0) {
						newDebt += amount - state.money;
						isDebt = true;
						expLoosed = (amount - state.money) * config.expLossRate;
						state.loseExp(expLoosed);
					}

					set({ money: newMoney, debt: newDebt });
					return { losedExp: expLoosed, isDebt };
				} catch (error) {
					console.error('Error spending money:', error);
					return { losedExp: 0, isDebt: false };
				}
			},

			addExp: amount => {
				try {
					const state = get();
					let newExp = state.exp + amount;
					let newLevel = state.level;
					let newExpToNextLevel = state.expToNextLevel;

					while (newExp >= newExpToNextLevel) {
						newExp -= newExpToNextLevel;
						newLevel += 1;
						newExpToNextLevel = getExpForLevel(newLevel);
					}

					set({
						exp: Math.floor(newExp),
						percentLevel: Math.floor((newExp / newExpToNextLevel) * 100),
						level: newLevel,
						expToNextLevel: Math.floor(newExpToNextLevel),
					});
				} catch (error) {
					console.error('Error adding exp:', error);
				}
			},

			loseExp: amount => {
				try {
					const state = get();
					let newExp = state.exp;
					let newLevel = state.level;
					let newExpToNextLevel = state.expToNextLevel;

					while (amount > 0) {
						if (newExp > amount) {
							newExp -= amount;
							amount = 0;
						} else {
							if (newLevel === 1 && amount > newExp) {
								newExp = 0;
								amount = 0;
								break;
							}
							newLevel--;
							amount -= newExp;
							newExpToNextLevel = getExpForLevel(newLevel);
							newExp = newExpToNextLevel;
						}
					}

					set({
						exp: Math.floor(newExp),
						level: newLevel,
						percentLevel: Math.floor((newExp / newExpToNextLevel) * 100),
						expToNextLevel: newExpToNextLevel,
					});
				} catch (error) {
					console.error('Error losing exp:', error);
				}
			},
		}),
		{
			name: 'moneyhero-simple-storage',
			storage: storage,
			onRehydrateStorage: () => (state, error) => {
				if (error) {
					console.error('Error rehydrating storage:', error);
				}
				if (state) {
					console.log('Storage rehydrated successfully');
				}
			},
		},
	),
);

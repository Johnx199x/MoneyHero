// src/store/playerStore.ts - Versión SUPER SIMPLE
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transaction } from '../../../../shared/types/index.type';

interface PlayerState {
	// Datos básicos
	playerName: string;
	money: number;
	debt: number;
	level: number;
	percentLevel: number;
	exp: number;
	expToNextLevel: number;
	transactionHistory: Transaction[];

	// Acciones básicas
	setPlayerName: (name: string) => void;
	addMoney: (amount: number) => { gainedExp: number };
	spendMoney: (amount: number) => { losedExp: number; isDebt: boolean };
	addTransaction: (transaction: Transaction) => void;
	deleteTransaction: (id: string) => void;
	addExp: (amount: number) => void;
	loseExp: (amount: number) => void;
}
const config = {
	expGainRate: 0.1, // 10% del dinero ganado = exp
	expLossRate: 0.07, // 7% del dinero en deudads -= exp
	levelGrowthRate: 1.1, // cada nivel requiere +10% exp que el anterior
	baseExp: 100, // exp base
};
function getExpForLevel(level: number): number {
	return Math.floor(config.baseExp * config.levelGrowthRate ** (level - 1));
}
function generateId(): string {
	// Fallback si crypto.randomUUID no está disponible
	if (typeof crypto !== 'undefined' && crypto.randomUUID) {
		return crypto.randomUUID();
	}
	// Fallback manual
	return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

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

			// Acciones

			addTransaction: transaction => {
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
			},
			deleteTransaction: (id: string) => {
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
							exp = Math.max(0, exp); // No puede ser negativa
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
			},

			setPlayerName: name => set({ playerName: name }),

			addMoney: amount => {
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

				set({
					money: newMoney,
					debt,
				});
				return { gainedExp };
			},

			spendMoney: amount => {
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
			},

			addExp: amount => {
				const state = get();

				let newExp = state.exp + amount;
				let newLevel = state.level;
				let newExpToNextLevel = state.expToNextLevel;

				// Level up
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
			},
			loseExp: amount => {
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
			},
		}),
		{
			name: 'moneyhero-simple-storage',
		},
	),
);

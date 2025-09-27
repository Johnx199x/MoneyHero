// src/store/playerStore.ts - Versión SUPER SIMPLE
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlayerState {
	// Datos básicos
	playerName: string;
	money: number;
	level: number;
	porcentLevel: number;
	exp: number;
	expToNextLevel: number;

	// Acciones básicas
	setPlayerName: (name: string) => void;
	addMoney: (amount: number) => void;
	spendMoney: (amount: number) => void;
	addExp: (amount: number) => void;
}

export const usePlayerStore = create<PlayerState>()(
	persist(
		(set, get) => ({
			// Estado inicial
			playerName: 'Hero',
			money: 1000,
			level: 1,
			exp: 0,
			porcentLevel: 0,
			expToNextLevel: 100,

			// Acciones
			setPlayerName: name => set({ playerName: name }),

			addMoney: amount => {
				const state = get();
				const newMoney = state.money + amount;

				set({
					money: newMoney,
				});
			},

			spendMoney: amount => {
				const state = get();
				const newMoney = Math.max(0, state.money - amount);

				set({ money: newMoney });
			},

			addExp: amount => {
				const expGained = Math.floor(amount / 10);

				const state = get();
				let newExp = state.exp + expGained;
				let newLevel = state.level;
				let newExpToNextLevel = state.expToNextLevel;

				// Level up
				while (newExp >= newExpToNextLevel) {
					newExp -= newExpToNextLevel;
					newLevel += 1;
					newExpToNextLevel *= 1.1;
				}

				set({
					exp: Math.floor(newExp),
					porcentLevel: Math.floor((newExp / newExpToNextLevel) * 100),
					level: newLevel,
					expToNextLevel: Math.floor(newExpToNextLevel),
				});
			},
		}),
		{
			name: 'moneyhero-simple-storage',
		},
	),
);

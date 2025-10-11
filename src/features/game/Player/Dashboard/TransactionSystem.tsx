/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import './TransactionSystem.css';
import type React from 'react';
import { useState } from 'react';
import {
	expenseCategories,
	incomeCategories,
} from '../../../../shared/constants';
import type {
	Category,
	Transaction,
} from '../../../../shared/types/index.type';
import { usePlayerStore } from '../store/playerStore';
import TransactionForm from './Components/TransactionForm';

interface ModalProps {
	setShowForm: (show: boolean) => void;
	type: 'income' | 'expense';
}

export const TransactionSystem = ({ setShowForm, type }: ModalProps) => {
	const currentDate = new Date().toISOString().split('T')[0];

	const categories =
		type === 'income' ? [...incomeCategories] : [...expenseCategories];

	const isExpense = type === 'expense';
	const initialTransaction: Transaction = {
		id: '',
		name: '',
		type: type,
		amount: 0,
		category: 'other',
		description: '',
		date: currentDate,
		battleResult: !isExpense ? 'victory' : 'defeat',
	};

	const [warning, setWarning] = useState<string>('');
	const [newTransaction, setNewTransaction] =
		useState<Transaction>(initialTransaction);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setWarning('');

		setNewTransaction({
			...newTransaction,
			[name]: value,
		});
	};
	const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		setNewTransaction({
			...newTransaction,
			category: value as Category,
		});
	};

	const { addTransaction } = usePlayerStore();

	const handleModal = (e?: React.FormEvent) => {
		e?.preventDefault();

		newTransaction.amount = Number(newTransaction.amount);

		if (!newTransaction.name.trim()) {
			setWarning('Transaction name is required');
			return;
		}
		if (!newTransaction.date) {
			setWarning('Date is required');
			return;
		}
		const num = Number(newTransaction.amount);

		if (num <= 0) {
			setWarning('Amount must be positive');
			return;
		}

		addTransaction({
			...newTransaction,
			amount: num,
		});
		setShowForm(false);
		setNewTransaction(initialTransaction);
		setWarning('');
	};

	return (
		<div className='modal-overlay' onClick={() => setShowForm(false)}>
			<form className='modal-content' onClick={e => e.stopPropagation()} onSubmit={handleModal}>
				<h3
					className={`modal-title ${isExpense ? 'spend-money' : 'add-money'}`}>
					{isExpense ? '💸 Spend Money' : '💰 Add Money'}
				</h3>

				<TransactionForm
					newTransaction={newTransaction}
					isExpense={isExpense}
					handleChange={handleChange}
					handleChangeSelect={handleChangeSelect}
					categories={categories}
				/>

				<div className='modal-actions'>
					<button
						type='button'
						className='modal-btn cancel'
						onClick={() => setShowForm(false)}>
						Cancel
					</button>
					<button
						type='submit'
						className={`modal-btn submit ${isExpense ? 'spend-money' : 'add-money'}`}
						disabled={warning !== ''}>
						{isExpense ? 'Spend Money' : 'Add Money'}
					</button>

					{warning && (
						<div
							className='form-warning'
							style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
							⚠️ {warning}
						</div>
					)}
				</div>
			</form>
		</div>
	);
};

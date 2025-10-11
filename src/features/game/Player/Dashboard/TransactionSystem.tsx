/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
import './TransactionSystem.css';
import type React from 'react';
import { useState } from 'react';
import {
	expenseCategories,
	incomeCategories,
} from '../../../../shared/constants/constants';
import type {
	Category,
	Transaction,
} from '../../../../shared/types/index.type';
import { usePlayerStore } from '../store/playerStore';
import { sanitizeString, validateTransaction } from '../utils/validationUtils';
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
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [newTransaction, setNewTransaction] =
		useState<Transaction>(initialTransaction);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setWarning('');

		const sanitizedValue =
			name === 'name' || name === 'description' ? sanitizeString(value) : value;

		setNewTransaction({
			...newTransaction,
			[name]: sanitizedValue,
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

	const handleModal = async (e?: React.FormEvent) => {
		e?.preventDefault();

		if (isSubmitting) return;

		setIsSubmitting(true);
		setWarning('');

		try {
			const validation = validateTransaction({
				name: newTransaction.name,
				description: newTransaction.description || '',
				amount: newTransaction.amount,
				date: newTransaction.date,
			});

			if (!validation.isValid) {
				setWarning(validation.error || 'Invalid transaction');
				setIsSubmitting(false);
				return;
			}

			const amount = Number(newTransaction.amount);

			const transactionToAdd: Transaction = {
				...newTransaction,
				name: sanitizeString(newTransaction.name),
				description: sanitizeString(newTransaction.description || ''),
				amount,
			};

			addTransaction(transactionToAdd);

			setNewTransaction(initialTransaction);
			setWarning('');
			setShowForm(false);
		} catch (error) {
			console.error('Error adding transaction:', error);
			setWarning('Failed to save transaction. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCancel = () => {
		setNewTransaction(initialTransaction);
		setWarning('');
		setShowForm(false);
	};

	return (
		<div className='modal-overlay' onClick={handleCancel}>
			<form
				className='modal-content'
				onClick={e => e.stopPropagation()}
				onKeyDown={e => e.stopPropagation()}
				onSubmit={handleModal}>
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

				{warning && (
					<div
						className='form-warning'
						style={{
							color: 'var(--danger)',
							marginBottom: '1rem',
							padding: '0.75rem',
							background: 'rgba(239, 68, 68, 0.1)',
							borderRadius: '0.5rem',
							textAlign: 'center',
						}}>
						⚠️ {warning}
					</div>
				)}

				<div className='modal-actions'>
					<button
						type='button'
						className='modal-btn cancel'
						onClick={handleCancel}
						disabled={isSubmitting}>
						Cancel
					</button>
					<button
						type='submit'
						className={`modal-btn submit ${isExpense ? 'spend-money' : 'add-money'}`}
						disabled={isSubmitting}>
						{isSubmitting
							? 'Saving...'
							: isExpense
								? 'Spend Money'
								: 'Add Money'}
					</button>
				</div>
			</form>
		</div>
	);
};

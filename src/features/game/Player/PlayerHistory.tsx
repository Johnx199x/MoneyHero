import { useMemo, useState } from 'react';
import TransactionCard from './Components/TransactionCard';
import './PlayerHistory.css';
import type { Category } from '../../../shared/types/transaction';
import { usePlayerStore } from './store/playerStore';

export default function PlayerHistory() {
	const { transactionHistory } = usePlayerStore();

	type FilterType = 'income' | 'expense' | 'all';

	type FilterState = {
		type: FilterType;
		category: Category | 'all';
	};

	const [activeFilter, setActiveFilter] = useState<FilterState>({
		type: 'all',
		category: 'all',
	});
	const getBattleIcon = (result: string) => {
		switch (result) {
			case 'victory':
				return '⚔️';
			case 'defeat':
				return '💀';
			case 'critical':
				return '⭐';
			default:
				return '⚔️';
		}
	};

	const handleFilterType = (filter: FilterType) => {
		setActiveFilter(prev => ({ ...prev, type: filter }));
	};
	const handleFilterCategory = (category: Category | 'all') => {
		setActiveFilter(prev => ({ ...prev, category }));
	};
	const filteredTransactions = useMemo(() => {
		return transactionHistory.filter(transaction => {
			// Filter by type (income/expense)
			if (activeFilter.type !== 'all') {
				if (activeFilter.type === 'income' && transaction.type !== 'income')
					return false;
				if (activeFilter.type === 'expense' && transaction.type !== 'expense')
					return false;
			}

			// Filter by category
			if (
				activeFilter.category !== 'all' &&
				transaction.category !== activeFilter.category
			) {
				return false;
			}

			return true;
		});
	}, [transactionHistory, activeFilter]);

	return (
		<section className='history-section'>
			<span className='section-title-2'>Transaction History</span>

			{/* Filters */}
			<div className='filters-container'>
				<div className='filter-group'>
					<button
						type='button'
						className={`filter-btn ${activeFilter.type === 'all' ? 'active' : ''}`}
						onClick={() => handleFilterType('all')}>
						All
					</button>
					<button
						type='button'
						className={`filter-btn ${activeFilter.type === 'income' ? 'active' : ''}`}
						onClick={() => handleFilterType('income')}>
						Income
					</button>
					<button
						type='button'
						className={`filter-btn ${activeFilter.type === 'expense' ? 'active' : ''}`}
						onClick={() => handleFilterType('expense')}>
						Expense
					</button>
				</div>
				<div className='filter-group'>
					<select
						value={activeFilter.category}
						onChange={e =>
							handleFilterCategory(e.target.value as Category | 'all')
						}
						className='category-select'>
						<option value='all'>All Categories</option>
						<option value='food'>Food</option>
						<option value='entertainment'>Entertainment</option>
						<option value='utilities'>Utilities</option>
						<option value='salary'>Salary</option>
						<option value='freelance'>Freelance</option>
						<option value='investment'>Investment</option>
						<option value='other'>Other</option>
					</select>
				</div>
			</div>

			{/* Transaction List */}
			<div className='history-container'>
				{filteredTransactions.length === 0 ? (
					<span className='empty-history'>
						<p>
							{transactionHistory.length === 0
								? 'There are no transactions to display'
								: 'No transactions match the selected filters'}
						</p>
					</span>
				) : (
					filteredTransactions.map(transaction => (
						<TransactionCard
							key={transaction.id}
							transaction={transaction}
							battleIcon={getBattleIcon(transaction.battleResult)}
						/>
					))
				)}
			</div>
		</section>
	);
}

// PlayerAnalytics.tsx
/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import './PlayerAnalytics.css';
import { useState } from 'react';
import { usePlayerStore } from '../store/playerStore';
import { BalanceChart } from './Component/BalanceChart';
import { CategoryPieChart } from './Component/CategoryPieChart';
import { ExpProgressChart } from './Component/ExpProgressChart';
import { MonthlyComparisonChart } from './Component/MonthlyComparisonChart';

export default function PlayerAnalytics() {
	const { transactionHistory } = usePlayerStore();
	const [activeTab, setActiveTab] = useState<
		'balance' | 'monthly' | 'category' | 'exp'
	>('balance');

	if (transactionHistory.length === 0) {
		return (
			// biome-ignore lint/correctness/useUniqueElementIds: <explanation>
			<section className='analytics-section' id='analytics'>
				<h2 className='section-title-2'>📊 Analytics</h2>
				<div className='empty-state'>
					<p>Start adding transactions to see your stats!</p>
				</div>
			</section>
		);
	}

	return (
		<section className='analytics-section' id='analytics'>
			<h2 className='section-title-2'>📊 Analytics</h2>

			{/* Tabs */}
			<div className='analytics-tabs'>
				<button type='button'
					className={`tab ${activeTab === 'balance' ? 'active' : ''}`}
					onClick={() => setActiveTab('balance')}>
					💰 Balance
				</button>
				<button type='button'
					className={`tab ${activeTab === 'monthly' ? 'active' : ''}`}
					onClick={() => setActiveTab('monthly')}>
					📊 Monthly
				</button>
				<button type='button'
					className={`tab ${activeTab === 'category' ? 'active' : ''}`}
					onClick={() => setActiveTab('category')}>
					🎯 Categories
				</button>
				<button type='button'
					className={`tab ${activeTab === 'exp' ? 'active' : ''}`}
					onClick={() => setActiveTab('exp')}>
					⭐ EXP
				</button>
			</div>

			{/* Chart Display */}
			<div className='chart-container'>
				{activeTab === 'balance' && (
					<BalanceChart transactions={transactionHistory} />
				)}
				{activeTab === 'monthly' && (
					<MonthlyComparisonChart transactions={transactionHistory} />
				)}
				{activeTab === 'category' && (
					<CategoryPieChart transactions={transactionHistory} />
				)}
				{activeTab === 'exp' && (
					<ExpProgressChart transactions={transactionHistory} />
				)}
			</div>
		</section>
	);
}

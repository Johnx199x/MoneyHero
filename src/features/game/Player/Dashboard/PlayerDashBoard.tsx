import { useState } from 'react';
import './PlayerDashboard.css';
import PlayerStats from './PlayerStats';
import {TransactionSystem } from './TransactionSystem';

export default function SimpleDashboard() {
	const [showAddForm, setShowAddForm] = useState(false);
	const [showSpendForm, setShowSpendForm] = useState(false);

	return (
		<section className='dashboard-container'>
			{/* Header del Jugador */}

			<PlayerStats />

			{/* Action Buttons */}
			<div className='main-actions'>
				<button
					type='button'
					className='action-btn add-money'
					onClick={() => setShowAddForm(true)}>
					💰 Add Money
				</button>

				<button
					type='button'
					className='action-btn spend-money'
					onClick={() => setShowSpendForm(true)}>
					💸 Spend Money
				</button>
			</div>

			{/* Add Money Modal */}
			{showAddForm && (
				<TransactionSystem type='income' setShowForm={setShowAddForm} />
			)}

			{/* Spend Money Modal */}
			{showSpendForm && (
				<TransactionSystem type='expense' setShowForm={setShowSpendForm} />
			)}

			{/* Tip */}
			<div className='tip-section'>
				<strong className='tip-highlight'>💡 Tip:</strong> You gain 1 EXP for
				every $10 you add.
			</div>
		</section>
	);
}

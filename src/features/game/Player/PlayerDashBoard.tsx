// src/components/SimpleDashboard.tsx
/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import React, { useState } from 'react';
import './PlayerDashboard.css';
import PlayerStats from './PlayerStats';
import { usePlayerStore } from './store/playerStore';

interface ModalProps {
	setShowForm: (show: boolean) => void;
	setAmount: (ele: string) => void;
	setDescription: (ele: string) => void;
	handleModal: () => void;

	amount: string;
	description: string;
}

const ExpendMoneyModal = ({
	setShowForm: setShowSpendForm,
	setAmount,
	setDescription,
	handleModal: handleSpendMoney,
	amount,
	description,
}: ModalProps) => {
	return (
		<div className='modal-overlay' onClick={() => setShowSpendForm(false)}>
			<div className='modal-content' onClick={e => e.stopPropagation()}>
				<h3 className='modal-title spend-money'>💸 Spend Money</h3>

				<div className='form-group'>
					<label htmlFor='expendMoneyAmount' className='form-label'>
						Amount ($)
					</label>
					<input
						id='expendMoneyAmount'
						type='number'
						value={amount}
						onChange={e => setAmount(e.target.value)}
						placeholder='0.00'
						className='form-input'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='expendDesc' className='form-label'>
						Description (optional)
					</label>
					<input
						id='expendDesc'
						type='text'
						value={description}
						onChange={e => setDescription(e.target.value)}
						placeholder='Food, gas, entertainment...'
						className='form-input'
					/>
				</div>

				<div className='modal-actions'>
					<button
						type='button'
						className='modal-btn cancel'
						onClick={() => setShowSpendForm(false)}>
						Cancel
					</button>
					<button
						type='button'
						className='modal-btn submit spend-money'
						onClick={handleSpendMoney}>
						Spend Money
					</button>
				</div>
			</div>
		</div>
	);
};
const AddMoneyModal = ({
	setShowForm: setShowAddForm,
	setAmount,
	setDescription,
	handleModal: handleAddMoney,
	amount,
	description,
}: ModalProps) => {
	return (
		<div className='modal-overlay' onClick={() => setShowAddForm(false)}>
			<div className='modal-content' onClick={e => e.stopPropagation()}>
				<h3 className='modal-title add-money'>💰 Add Money</h3>

				<div className='form-group'>
					<label htmlFor='amountAddMoney' className='form-label'>
						Amount ($)
					</label>
					<input
						id='amountAddMoney'
						type='number'
						value={amount}
						onChange={e => setAmount(e.target.value)}
						placeholder='0.00'
						className='form-input'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='addMoneyDes' className='form-label'>
						Description (optional)
					</label>
					<input
						id='addMoneyDes'
						type='text'
						value={description}
						onChange={e => setDescription(e.target.value)}
						placeholder='Salary, side gig, gift...'
						className='form-input'
					/>
				</div>

				<div className='modal-actions'>
					<button
						type='button'
						className='modal-btn cancel'
						onClick={() => setShowAddForm(false)}>
						Cancel
					</button>
					<button
						type='button'
						className='modal-btn submit add-money'
						onClick={handleAddMoney}>
						Add Money
					</button>
				</div>
			</div>
		</div>
	);
};

export default function SimpleDashboard() {
	const {addExp, addMoney, spendMoney } = usePlayerStore();

	const [showAddForm, setShowAddForm] = useState(false);
	const [showSpendForm, setShowSpendForm] = useState(false);
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');

	const handleAddMoney = () => {
		const num = parseFloat(amount);
		if (num > 0) {
			addMoney(num);
			addExp(num);
			setAmount('');
			setDescription('');
			setShowAddForm(false);
		}
	};

	const handleSpendMoney = () => {
		const num = parseFloat(amount);
		if (num > 0) {
			spendMoney(num);
			setAmount('');
			setDescription('');
			setShowSpendForm(false);
		}
	};

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
				<AddMoneyModal
					setShowForm={setShowAddForm}
					setAmount={setAmount}
					setDescription={setDescription}
					handleModal={handleAddMoney}
					amount={amount}
					description={description}
				/>
			)}

			{/* Spend Money Modal */}
			{showSpendForm && (
				<ExpendMoneyModal
					setShowForm={setShowSpendForm}
					setAmount={setAmount}
					setDescription={setDescription}
					handleModal={handleSpendMoney}
					amount={amount}
					description={description}
				/>
			)}

			{/* Tip */}
			<div className='tip-section'>
				<strong className='tip-highlight'>💡 Tip:</strong> You gain 1 EXP for
				every $10 you add. Level up every 100 EXP!
			</div>
		</section>
	);
}

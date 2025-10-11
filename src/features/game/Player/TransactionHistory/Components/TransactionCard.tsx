import './TransactionCard.css';
import { useState } from 'react';
import ConfirmModal from '../../../../../components/ui/ConfirmationModal';
import type { Transaction } from '../../../../../shared/types/index.type';
import { usePlayerStore } from '../../store/playerStore';

interface transactionCardProps {
	battleIcon: string;
	transaction: Transaction;
}

export default function TransactionCard({
	transaction,
	battleIcon,
}: transactionCardProps) {
	const { deleteTransaction } = usePlayerStore();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const handleDelete = (id: string) => {
		deleteTransaction(id);
		setShowDeleteModal(false);
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('es-ES', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		});
	};
	
	return (
		<div
			key={transaction.id}
			className={`transaction-card ${transaction.type}`}>
			<div className='transaction-header'>
				<div className='transaction-title'>
					<span className='battle-icon'>{battleIcon}</span>
					<h3>{transaction.name}</h3>
				</div>
				<span className={`transaction-amount ${transaction.type}`}>
					{transaction.type === 'income' ? '+' : '-'}$
					{Math.abs(transaction.amount).toLocaleString()}
				</span>
			</div>

			<div className='transaction-body'>
				<div className='transaction-info'>
					<span className='info-label'>Category:</span>
					<span className='info-value'>{transaction.category}</span>
				</div>

				{transaction.description && (
					<div className='transaction-info'>
						<span className='info-label'>Description:</span>
						<span className='info-value'>{transaction.description}</span>
					</div>
				)}

				<div className='transaction-info'>
					<span className='info-label'>Battle result:</span>
					<span className={`battle-result ${transaction.battleResult}`}>
						{transaction.battleResult === 'victory'
							? 'Victort'
							: transaction.battleResult === 'defeat'
								? 'Defeat'
								: 'Critical'}
					</span>
				</div>

				{transaction.expGained && (
					<div className='transaction-info'>
						<span className='info-label'>Gained exp:</span>
						<span className='exp-gained'>
							+{transaction.expGained.toFixed(2)} EXP
						</span>
					</div>
				)}

				{transaction.expLoosed && transaction.battleResult === 'critical' && (
					<div className='transaction-info'>
						<span className='info-label'>Losed exp:</span>
						<span className='exp-lost'>
							-{transaction.expLoosed.toFixed(2)} EXP
						</span>
					</div>
				)}

				<div className='transaction-footer'>
					<div className='transaction-options'>
						<button
							type='button'
							className='small-btn'
							onClick={() => setShowDeleteModal(true)}>
							Delete
						</button>
						<ConfirmModal
						isOpen={showDeleteModal}
						title='Delete Transaction'
						message='Are you sure you want to delete this transaction? This action cannot be undone.'
						icon='🗑️'
						confirmText='Delete'
						cancelText='Cancel'
						onConfirm={() => handleDelete(transaction.id)}
						onCancel={() => setShowDeleteModal(false)}
					/>
					</div>
					

					<span>{formatDate(transaction.date)}</span>
				</div>
			</div>
		</div>
		
	);
	
}

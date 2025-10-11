/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */

import type { Category, Transaction } from "../../../../../shared/types/index.type";

interface transactionFormProps{
    newTransaction: Transaction;
    isExpense: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    categories: Category[];
}

export default function TransactionForm({ newTransaction,  isExpense, handleChange, handleChangeSelect, categories }: transactionFormProps) {
	// todo: validar mejor la fecha 


    return (
        <div className='form-group'>
					<label htmlFor='TransactionName' className='form-label'>
						Transaction name
					</label>
					<input required
						type='text'
                        name='name'
                        value={newTransaction.name}
						id='TransactionName'
						onChange={handleChange}

						placeholder={
							isExpense
								? 'Coffee, Gym membership, Rent...'
								: 'Salary, Freelance project, Bonus...'
						}
						className='form-input'
					/>
					<label htmlFor='MoneyDesc' className='form-label'>
						Description (optional)
					</label>
					<input 
						id='MoneyDesc'
						type='text'
                        name='description'
						value={newTransaction.description}
						onChange={handleChange}
						placeholder={
							isExpense
								? 'Paid with credit card, dinner with friends'
								: 'Bank transfer, bonus, freelance work'
						}
						className='form-input'
					/>
					<label htmlFor='TransactionAmount' className='form-label'>
						Amount ($)
					</label>
					<input required
						id='TransactionAmount'
						type='number'
                        name='amount'
						value={newTransaction.amount || ''}
						onChange= {handleChange}
						placeholder='0.00'
						className='form-input'
					/>
					<label htmlFor='TransactionCategory' className='form-label'>
						Transaction Category
					</label>
					<select id='TransactionCategory' value={newTransaction.category} onChange={handleChangeSelect} className='form-input' >
						{categories.map((cat) => {
							 return <option  key={cat} value={cat}>{cat}</option>
						})}
					</select>

                    <label htmlFor='TransactionDate' className='form-label'>
						Transaction Date
					</label>
					<input required
						type='date'
                        value={newTransaction.date}
						onChange={handleChange}
                        name='date'
						id='TransactionDate'
						max={new Date().toISOString().split('T')[0]}
						className='form-input'
					/>
				</div>
    )
}
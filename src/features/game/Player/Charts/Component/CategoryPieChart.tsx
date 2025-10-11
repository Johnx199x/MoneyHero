import { useMemo } from 'react';
import {
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';
import type { Transaction } from '../../../../../shared/types/index.type';

const CATEGORY_COLORS: Record<string, string> = {
	food: '#ef4444',
	transport: '#f97316',
	housing: '#f59e0b',
	entertainment: '#8b5cf6',
	health: '#10b981',
	education: '#3b82f6',
	shopping: '#ec4899',
	travel: '#06b6d4',
	debt: '#dc2626',
	other: '#6b7280',
};

export function CategoryPieChart({
	transactions,
}: {
	transactions: Transaction[];
}) {
	const data = useMemo(() => {
		const categoryTotals: Record<string, number> = {};

		transactions
			.filter(t => t.type === 'expense')
			.forEach(t => {
				categoryTotals[t.category] =
					(categoryTotals[t.category] || 0) + t.amount;
			});

		return Object.entries(categoryTotals)
			.map(([category, amount]) => ({
				name: category.charAt(0).toUpperCase() + category.slice(1),
				value: amount,
				color: CATEGORY_COLORS[category] || '#6b7280',
			}))
			.sort((a, b) => b.value - a.value);
	}, [transactions]);

	if (data.length === 0) {
		return (
			<div
				style={{
					textAlign: 'center',
					padding: '2rem',
					color: 'var(--text-secondary)',
				}}>
				No expense data available
			</div>
		);
	}

	return (

		<ResponsiveContainer width='100%' height={300}>
			<PieChart>
                <Pie
                    data={data}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={({ name, percent }) =>
                        `${name}: ${typeof percent === 'number' ? (percent * 100).toFixed(0) : '0'}%`
                    }
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
index}`} fill={entry.color} />
                    ))}
                </Pie>
				<Tooltip
					formatter={(value: number) => `$${value.toLocaleString()}`}
					contentStyle={{
						backgroundColor: 'var(--bg-secondary)',
						border: '1px solid rgba(255,255,255,0.1)',
						borderRadius: '0.5rem',
					}}
				/>
			</PieChart>
		</ResponsiveContainer>
	);
}

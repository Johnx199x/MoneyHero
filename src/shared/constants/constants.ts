export const incomeCategories = [
	'salary',
	'business',
	'investment',
	'gift',
	'freelance',
	'refunds',
	'other',
] as const;

export const expenseCategories = [
	'food',
	'transport',
	'housing',
	'entertainment',
	'health',
	'education',
	'shopping',
	'travel',
	'debt',
	'other',
] as const;

export const NavAboutLinks = [
	{ name: 'Home', to: '/' },
	{ name: 'Game', to: '/game' },
];

export const NavLandingLinks = [
	{ name: 'Home', to: 'home' },
	{ name: 'How It Works', to: 'how-it-works' },
	{ name: 'Features', to: 'features' },
	{ name: 'About Proyect', to: '/about' },
];
export const NavGameLinks = [
	{ name: 'Dashboard', to: 'dashboard' },
	{ name: 'Analytics', to: 'analytics' },
	{ name: 'BattleLog', to: 'battleLogs' },
	{ name: 'Achievements', to: 'achievements' },
	{ name: 'About Proyect', to: '/about' },
	{ name: 'Sign Out', to: '/' },
];

import { useState } from 'react';
import './NavBar.css';
import { Link, useLocation } from 'react-router-dom';
import NavButton from '../ui/NavButton';

function NavLinksLanding({ closeMenu }: { closeMenu?: () => void }) {
	function scrollInto(zone: string) {
		document.getElementById(zone)?.scrollIntoView({ behavior: 'smooth' });
		if (closeMenu) closeMenu();
	}

	return (
		<>
			<button
				type='button'
				onClick={() => scrollInto('home')}
				className='navbar-link'>
				Home
			</button>
			<button
				type='button'
				onClick={() => scrollInto('how-it-works')}
				className='navbar-link'>
				How It Works
			</button>
			<button
				type='button'
				onClick={() => scrollInto('features')}
				className='navbar-link'>
				Features
			</button>
			<NavButton navTo='dashboard' />
		</>
	);
}
export default function NavBar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const location = useLocation().pathname;

	const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
	return (
		<nav className='navbar'>
			<div className='navbar-container'>
				{/* Logo/Brand */}
				<div className='navbar-brand'>
					<Link to={"/"} style={{textDecoration:"none"}}>
						<span className='brand-icon'>⚔️</span>
						<span className='brand-text'>MoneyHero</span>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<div className='navbar-menu'>
					{location === '/' ? <NavLinksLanding /> : ''}
				</div>

				{/* Mobile Menu Button */}
				<button
					type='button'
					className='mobile-menu-btn'
					onClick={toggleMobileMenu}>
					☰
				</button>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className='mobile-menu'>
					<NavLinksLanding closeMenu={toggleMobileMenu} />
				</div>
			)}
		</nav>
	);
}

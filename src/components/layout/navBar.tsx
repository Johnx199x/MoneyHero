import { useEffect, useState } from 'react';
import './NavBar.css';
import { Link, useLocation } from 'react-router-dom';
import { NavGameLinks, NavLandingLinks } from '../../shared/constants/constants';
import NavButton from '../ui/NavButton';

function NavLinks({
	closeMenu,
	links,
}: {
	closeMenu?: () => void;
	links: { name: string; to: string }[];
}) {
	function scrollInto(zone: string) {
		document.getElementById(zone)?.scrollIntoView({ behavior: 'smooth' });
		if (closeMenu) closeMenu();
	}

	return (
		<>
			{links.map(link => (
				<button
					key={link.name}
					type='button'
					onClick={() => scrollInto(link.to)}
					className='navbar-link'>
					{link.name}
				</button>
			))}
			{location.pathname === '/' && <NavButton navTo='game' />}
		</>
	);
}

export default function NavBar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const location = useLocation().pathname;

	useEffect(() => {
		const link = location === '/' ? NavLandingLinks : NavGameLinks;
		setLink(link);
	}, [location]);

	const [links, setLink] = useState(NavLandingLinks);

	const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
	return (
		<nav className='navbar'>
			<div className='navbar-container'>
				{/* Logo/Brand */}
				<div className='navbar-brand'>
					<Link to={'/'} style={{ textDecoration: 'none' }}>
						<span className='brand-icon'>⚔️</span>
						<span className='brand-text'>MoneyHero</span>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<div className='navbar-menu'>
					<NavLinks links={links} />
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
					<NavLinks closeMenu={toggleMobileMenu} links={links} />
				</div>
			)}
		</nav>
	);
}

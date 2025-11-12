/** biome-ignore-all lint/suspicious/noAssignInExpressions: <explanation> */
import { useEffect, useState } from 'react';
import './NavBar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import {NavAboutLinks,
	NavGameLinks,
	NavLandingLinks,
} from '../../shared/constants/constants';
import NavButton from '../ui/NavButton';

interface NavLinksProps {
	closeMenu?: () => void;
	links: { name: string; to: string }[];
	currentPath: string; // Añadido para pasar la ubicación actual
}

function NavLinks({ closeMenu, links, currentPath }: NavLinksProps) {
	const { signOut } = useAuth();
	const navigate = useNavigate()

	function scrollInto(zone: string) {

		if(zone.startsWith("/")) navigate(zone)
		else document.getElementById(zone)?.scrollIntoView({ behavior: 'smooth' });
		;
	}

	return (
		<>
			{links.map(link => (
				<button
					key={link.name}
					type='button'
					onClick={() =>{
						if (link.name === 'Sign Out') {
							signOut()
							navigate("/")
						}
						else scrollInto(link.to)

						if (closeMenu) closeMenu()
					}
					}
					className='navbar-link'>
					{link.name}
				</button>
			))}
			{currentPath === '/' && <NavButton navTo='game' />}
		</>
	);
}

export default function NavBar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const location = useLocation();
	const [links, setLink] = useState<{ name: string; to: string }[] | undefined>(
		NavLandingLinks,
	);

	useEffect(() => {
		let link: { name: string; to: string }[] | undefined;
		if (location.pathname === '/') link = NavLandingLinks;
		else if (location.pathname === '/game') link = NavGameLinks;
		else if (location.pathname === "/about")  link= NavAboutLinks
		else link = undefined;

		setLink(link);
	}, [location.pathname]);

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
				{links && (
					<div className='navbar-menu'>
						<NavLinks links={links} currentPath={location.pathname} />
					</div>
				)}
				{/* Mobile Menu Button */}
				{links && (
					<button
						type='button'
						className='mobile-menu-btn'
						onClick={toggleMobileMenu}>
						☰
					</button>
				)}
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && links && (
				<div className='mobile-menu'>
					<NavLinks
						closeMenu={toggleMobileMenu}
						links={links}
						currentPath={location.pathname}
					/>
				</div>
			)}
		</nav>
	);
}

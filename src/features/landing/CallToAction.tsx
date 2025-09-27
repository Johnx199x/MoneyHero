import NavButton from '../../components/ui/NavButton';
import { getCSSVariable } from '../../utils/getVariableCss';

export default function CallToAction() {
	const emerald = getCSSVariable('--emerald');

	// todo: change button with component button

	return (
		<section className='callToAction-section'>
			<span
				className='section-title-2'
				style={{ display: 'block', marginBottom: '2rem' }}>
				"Join to others players who've leveled up their finances"
			</span>
			<span
				className='section-title'
				style={{ color: emerald, display: 'block', marginBottom: '2rem' }}>
				Ready to Level Up?
			</span>
			<NavButton navTo='dashboard' />
		</section>
	);
}

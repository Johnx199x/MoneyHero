import NavButton from '../../components/ui/NavButton'
import './HeroSection.css'
import heroImg from '../../assets/hero-img.png'
import heroMobile from '../../assets/hero-mobile.png'

export default function HeroSection(){
    // todo: change button with component button
    return(
        // biome-ignore lint/correctness/useUniqueElementIds: <explanation>
<section className="hero-section" id='home'>
    <h1 className="hero-section-h1">Transform Your Finances Into An Epic RPG Adventure</h1>
    <h2 className='hero-section-h2'>Where saving money makes you stronger and spending is strategic combat</h2>
    <NavButton navTo='game' />
    <picture className='hero-picture'>
        <source media="(max-width: 768px)" srcSet={heroMobile} />
        <img src={heroImg} alt="hero-img" className='hero-img'/>
    </picture>
</section>
    )
}
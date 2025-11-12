/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */
import { GitHubIcon, GmailIcon, LinkedInIcon, TelegramIcon } from '../../shared/svg';
import './aboutPage.css';


export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1 className="page-title">About MoneyHero</h1>
        <p className="page-subtitle">The story behind the project</p>
      </header>

      <main className="about-content">
        
        <section className="content-section">
          <h2 className="section-title">Why I Created MoneyHero</h2>
          <div className="content-text">
            <p>
              I've always been into both gaming and personal finance, but I noticed something: 
              every budgeting app out there felt like a chore. Spreadsheets, boring charts, 
              and endless numbers that made you want to avoid checking your finances altogether.
            </p>
            <p>
              One day, while playing an RPG game, it hit me: <strong>What if managing money 
              felt like leveling up a character?</strong> What if every dollar saved was EXP, 
              and every expense was a strategic battle?
            </p>
            <p>
              That's when MoneyHero was born. I wanted to create something that would make me 
              (and hopefully others) actually <em>excited</em> to check their finances. 
              Something that turned boring budgets into an adventure.
            </p>
          </div>
        </section>

        <section className="content-section highlight-section">
          <h2 className="section-title">What Motivates Me</h2>
          <div className="content-text">
            <p>
              Financial literacy is crucial, but it's often taught in the most boring ways possible. 
              I believe that learning and practicing good financial habits should be engaging, 
              not exhausting.
            </p>
            <p>
              Through MoneyHero, I want to show that finance apps don't have to be dry and serious. 
              They can be fun, motivating, and even addictive (in a good way). If gamification 
              can help even one person save more or spend smarter, then this project is worth it.
            </p>
          </div>
        </section>

        <section className="content-section">
          <h2 className="section-title">About Me</h2>
          <div className="about-me-content">
            <div className="profile-card">
              <div className="profile-avatar">
                <span>⚔️</span>
              </div>
              <h3>Jonathan Cruz </h3>
             <p className="profile-role">Caffeine-Powered Code Paladin</p>

            </div>
            
            <div className="profile-text">
              <p>
                Hi! I'm Jonathan, a developer passionate about creating practical solutions 
                that make people's lives easier. I love combining creativity with functionality, 
                and MoneyHero is a perfect example of that.
              </p>
              <p>
                When I'm not coding, you'll probably find me playing video games, exploring 
                new technologies, or thinking about my next project. I believe in building 
                things that matter and sharing them with the world.
              </p>
              <p>
                MoneyHero started as a personal experiment, but it's grown into something 
                I'm really proud of. I hope it helps you on your financial journey!
              </p>
            </div>
          </div>
        </section>

        <section className="content-section connect-section">
          <h2 className="section-title">Let's Connect</h2>
          <p className="connect-intro">
            I'd love to hear from you! Whether you have feedback, questions, or just want to chat about the project.
          </p>
          
          <div className="social-links">
            <a href="https://github.com/johnx199x" target="_blank" rel="noopener noreferrer" className="social-card">
              <div className="social-icon">
                {GitHubIcon}
              </div>
              <div className="social-info">
                <h4>GitHub</h4>
                <p>Check out the code</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/jonathan-cruz-martin-741a30268/" target="_blank" rel="noopener noreferrer" className="social-card">
              <div className="social-icon">
                {LinkedInIcon}
              </div>
              <div className="social-info">
                <h4>LinkedIn</h4>
                <p>Connect professionally</p>
              </div>
            </a>

            <a href="mailto:jeremydev666@gmail.com" className="social-card">
              <div className="social-icon">
               {GmailIcon}
              </div>
              <div className="social-info">
                <h4>Email</h4>
                <p>jeremydev666@gmail.com</p>
              </div>
            </a>

            <a href="https://t.me/Johnx199x" target="_blank" rel="noopener noreferrer" className="social-card">
              <div className="social-icon">
                {TelegramIcon}
              </div>
              <div className="social-info">
                <h4>Telegram</h4>
                <p>Message me directly</p>
              </div>
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
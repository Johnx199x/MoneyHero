import Card from '../../components/ui/Card';
import type {CardInfo} from '../../shared/types/index.type.ts';
export default function HowItWork() {
	const cardsTired: CardInfo[] = [
        {
			title: 'Managing money is boring... until now.',
			description:
				'Turn budgeting into an addictive game where YOU are the hero.',
		},{
            title: 'Turn boring budgets into epic RPG adventures.',
            description:'Every dollar saved makes you stronger. Every expense is a strategic battle.'
        }
	];
    const cardHowGamesWork: CardInfo[]= [
        {
            title:'Your Money = Your Health Points',
				titleColor:'--emerald',
				description:'Every dollar saved makes you stronger. Your bank account becomes your HP.'
        },{
            title:'Expenses = Combat Damage',
				titleColor:'--danger',
				description:'Spending money means taking damage in battle. Every purchase is a strategic decision.'
        },{
                title:'Savings = Leveling Up',
				titleColor:'--gold-light',
				description:'The more you save, the higher your level. Watch your hero grow stronger.'
        },{
            title:'Goals = Epic Quests',
			titleColor:'--mystic-blue',
			description:'Turn financial goals into exciting missions. Complete quests to unlock powerful rewards.'
        }
    ]

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <explanation>
<section className='howItWork-section' id='how-it-works' style={{scrollMarginTop:'80px'}}>
			<span className='section-title'>Tired of boring spreadsheets?</span>
        {cardsTired.map((card)=>(
            <Card key={card.title}  title={card.title} description={card.description}  />
        ))}

            {//how it work
            }
			<span className='section-title'>How The Game Works</span>
		{cardHowGamesWork.map((card)=>(
            <Card key={card.title}  title={card.title} titleColor={card.titleColor} description={card.description}  />
        ))}	
		</section>
	);
}

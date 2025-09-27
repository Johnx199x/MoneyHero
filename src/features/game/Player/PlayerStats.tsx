import {useState} from "react"
import { usePlayerStore } from "./store/playerStore";
import './PlayerStats.css'


export default function PlayerStats(){

    const {playerName, money, level, exp,expToNextLevel,porcentLevel, setPlayerName}= usePlayerStore()

    const [showNameEdit, setShowNameEdit] = useState(false);
	const [newName, setNewName] = useState(playerName);

    const handleNameChange = () => {
		setPlayerName(newName);
		setShowNameEdit(false);
	};

    return(
        <div className='player-header'>
				<span className='player-title-section'>
					<h1 className='player-title'>⚔️ {playerName}</h1>

					{!showNameEdit ? (
						<button type='button'
							className='edit-name-btn'
							onClick={() => setShowNameEdit(true)}>
							✏️ Edit
						</button>
					) : (
						<div className='name-edit-form'>
							<input
								type='text'
								value={newName}
								onChange={e => setNewName(e.target.value)}
								className='name-input'
								onKeyPress={e => e.key === 'Enter' && handleNameChange()}
							/>
							<button type='button' onClick={handleNameChange} className='name-save-btn'>
								✓
							</button>
							<button type='button'
								onClick={() => setShowNameEdit(false)}
								className='name-cancel-btn'>
								✗
							</button>
						</div>
					)}
				</span>

				{/* Stats Grid */}
				<div className='stats-grid'>
					<div className='stat-card money'>
						<span style={{display:"block"}} className='stat-icon'>💰</span>
						<span style={{display:"block"}} className='stat-label'>Money</span>
						<span style={{display:"block"}} className='stat-value money'>${money.toLocaleString()}</span>
					</div>

					<div className='stat-card level'>
						<span style={{display:"block"}} className='stat-icon'>⚡</span>
						<span style={{display:"block"}} className='stat-label'>Level</span>
						<span style={{display:"block"}} className='stat-value level'>{level}</span>
					</div>

					<div className='stat-card exp'>
						<span style={{display:"block"}}  className='stat-icon'>🌟</span>
						<span style={{display:"block"}}  className='stat-label'>Experience</span>
						<span style={{display:"block"}}  className='stat-value exp'>{exp}/{expToNextLevel}

                        </span>
					</div>
				</div>

				{/* EXP Progress Bar */}
				<div className='progress-section'>
					<div className='progress-labels'>
						<span>Level {level}</span>
						<span>
							{porcentLevel}% to Level {level + 1}
						</span>
					</div>
					<div className='progress-bar-container'>
						<div className='progress-bar-fill' style={{ width: `${porcentLevel}%` }} />
					</div>
				</div>
			</div>
    )
    

}
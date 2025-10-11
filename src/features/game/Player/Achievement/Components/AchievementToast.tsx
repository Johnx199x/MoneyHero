import { useEffect } from 'react';
import { ACHIEVEMENTS } from '../../../../../shared/constants/achievement';
import './AchievementToast.css';

interface ToastProps {
  achievementId: string;
  onClose: () => void;
}

export function AchievementToast({ achievementId, onClose }: ToastProps) {
  const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
  
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!achievement) return null;

  return (
    <div className={`achievement-toast ${achievement.rarity}`}>
      <span className="achievement-icon">{achievement.icon}</span>
      <div className="achievement-content">
        <h4>Achievement Unlocked!</h4>
        <p className="achievement-name">{achievement.name}</p>
        <p className="achievement-desc">{achievement.description}</p>
      </div>
    </div>
  );
}
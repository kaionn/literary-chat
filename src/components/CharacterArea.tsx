import characterImage from '../assets/character.png';
import backgroundImage from '../assets/background.png';

interface CharacterAreaProps {
  isChatEnded?: boolean;
}

export function CharacterArea({ isChatEnded = false }: CharacterAreaProps) {
  return (
    <div className="character-area">
      <div className="character-image-container">
        <img 
          src={isChatEnded ? backgroundImage : characterImage} 
          alt={isChatEnded ? "背景" : "栞"} 
          className="character-img" 
        />
      </div>
    </div>
  );
}

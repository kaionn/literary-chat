import characterImage from '../assets/character.png';

export function CharacterArea() {
  return (
    <div className="character-area">
      <div className="character-image-container">
        <img src={characterImage} alt="栞" className="character-img" />
      </div>
    </div>
  );
}

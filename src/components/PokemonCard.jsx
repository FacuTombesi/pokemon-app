import styles from "../styles/PokemonCard.module.css";

export default function PokemonCard({ id, name, type, sprite }) {
  return (
    <div key={id} className={styles.pokemonCard}>
      <img src={sprite} alt={name} className={styles.cardSprite} />
      <div className={styles.cardInfo}>
        <p className={styles.cardName}>{name}</p>
        <div className={styles.cardTypeCont}>
          {type.map((t, index) => (
            <span key={index} className={`${styles.cardType} ${styles[t.toLowerCase()]}`}>{t}</span>
          ))}
        </div>
        <span className={styles.cardNumber}>Pokédex No. {id}</span>
      </div>
    </div>
  );
}

import styles from "./styles.module.css";

export default function Note_Card({
  src,
  userName,
  postedDate,
  title,
  content,
}) {
  return (
    <div className={styles.card_container}>
      <div className={styles.card_head}>
        <div className={styles.card_head_item}>
          <img src={src} alt="profile_photo"></img>
        </div>

        <div className={styles.card_head_item}>
          <h4>{userName}</h4>
          <p>{postedDate}</p>
        </div>
      </div>

      <div className={styles.card_body}>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
}

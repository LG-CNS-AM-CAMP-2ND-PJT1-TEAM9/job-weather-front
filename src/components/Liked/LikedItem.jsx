import styles from "./LikedItem.module.css";

const LikedItem = ({ data, onUnLike, type }) => {
  // HTML 엔티티 디코딩 함수
  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  return data.map((item) => {
    const formatdate = item.date
      ? new Date(item.date).toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "numeric",
          minute: "2-digit",
          hour12: true, // 오전/오후 표시
        })
      : "";
    const decodedText = item.title ? decodeHtmlEntities(item.title) : "";
    return (
      <div className={styles.card} key={item.id}>
        {type === "news" ? (
          <>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.content}
            >
              <h3 className={styles.title}>{decodedText}</h3>
              <p className={styles.description}>{item.description}</p>
            </a>

            <div className={styles.meta}>
              <p className={styles.date}>{formatdate}</p>
              <button
                className={`${styles["like-button"]} ${styles.liked}`}
                onClick={() => {
                  console.log(item.id);
                  onUnLike(item.id);
                }}
              >
                ★
              </button>
            </div>
          </>
        ) : (
          <>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.content}
            >
              <p className={styles.company}>{item.company}</p>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </a>

            <div className={styles.meta}>
              <p className={styles.date}>{item.deadline}</p>
              <button
                className={`${styles["like-button"]} ${styles.liked}`}
                onClick={() => {
                  console.log(item.id);
                  onUnLike(item.id);
                }}
              >
                ★
              </button>
            </div>
          </>
        )}
      </div>
    );
  });
};

export default LikedItem;

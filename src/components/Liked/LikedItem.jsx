import styles from "./LikedItem.module.css";

const LikedItem = ({ data, onUnLike, type }) => {
  return data.map((item) => {
    console.log(item);
    const formatdate = item.date ? item.date.split("T")[0] : "";

    return (
      <div className={styles.card} key={item.id}>
        {console.log(item)}
        {type === "news" ? (
          <>
            <a href={item.url}>
              <h3 className={styles.title}>{item.title}</h3>
            </a>
            <p className={styles.description}>{item.description}</p>
            <p className={styles.date}>{formatdate}</p>
          </>
        ) : (
          <>
            <p className={styles.company}>{item.company}</p>
            <a href={item.url}>
              <h3 className={styles.title}>{item.title}</h3>
            </a>
            <p className={styles.description}>{item.description}</p>
            <p className={styles.date}>{item.deadline}</p>
          </>
        )}
        <div className={styles.starContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="gold"
            class="bi bi-star-fill"
            viewBox="0 0 16 16"
            onClick={() => {
              console.log(item.id);
              onUnLike(item.id);
            }}
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        </div>
      </div>
    );
  });
};

export default LikedItem;

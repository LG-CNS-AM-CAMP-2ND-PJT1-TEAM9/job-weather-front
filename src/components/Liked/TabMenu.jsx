import styles from "./TabMenu.module.css";

const TabMenu = ({ activeTab, onTabClick }) => {
  return (
    <div className={styles.tabContainer}>
      <button
        className={`${styles.tabButton} ${styles.firstChild} ${
          activeTab === "emp" ? styles.active : ""
        }`}
        onClick={() => onTabClick("emp")}
      >
        채용공고
      </button>
      <button
        className={`${styles.tabButton} ${styles.lastChild} ${
          activeTab === "news" ? styles.active : ""
        }`}
        onClick={() => onTabClick("news")}
      >
        뉴스
      </button>
    </div>
  );
};

export default TabMenu;

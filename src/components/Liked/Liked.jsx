import TabMenu from "./TabMenu";
import LikedItem from "./LikedItem";
import styles from "./Liked.module.css";
import { useEffect, useState } from "react";
import { getLikedItem, unLikedItem } from "../../api/mypage_api";

const Liked = () => {
  const [activeTab, setActiveTab] = useState("emp");
  const [likedItems, setLikedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 스크랩한 데이터 출력
  useEffect(() => {
    const fetchData = async () => {
      const res = await getLikedItem(activeTab);
      setLikedItems(res);
      setCurrentPage(1);
    };
    fetchData();
  }, [activeTab]);

  // 스크랩 취소
  const handleUnLike = async (id) => {
    console.log("handleUnLike's item.id", id);
    await unLikedItem(activeTab, id);
    setLikedItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Pagenation을 위한 설정
  let page_item = 3;
  const totalPages = Math.ceil(likedItems.length / page_item);
  const paginatedData = likedItems.slice(
    (currentPage - 1) * page_item,
    currentPage * page_item
  );

  // 화살표로 페이지 넘기기
  // const handlePrevPage = () => {
  //   setCurrentPage((prev) => Math.max(prev - 1, 1));
  // };

  // const handleNextPage = () => {
  //   setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  // };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };

  return (
    <section className={styles.likedSection}>
      <TabMenu activeTab={activeTab} onTabClick={handleTabClick}></TabMenu>
      <div className={styles.contentGrid}>
        {likedItems.length == 0 ? (
          <p className={styles.emptyMessage}>스크랩된 채용공고가 없습니다</p>
        ) : (
          <LikedItem
            data={paginatedData}
            onUnLike={handleUnLike}
            type={activeTab}
          ></LikedItem>
        )}
      </div>

      {likedItems.length > page_item && (
        <div className={styles.paginationControls}>
          <div className={styles.pageIndicators}>
            {[...Array(totalPages)].map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  currentPage === index + 1 ? styles.activeDot : ""
                }`}
                onClick={() => setCurrentPage(index + 1)} // 점 클릭으로 페이지 이동
              ></span>
            ))}
          </div>
          {/* <div className={styles.arrowButtons}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={styles.arrowButton}
            >
              &lt; 
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={styles.arrowButton}
            >
              &gt; 
            </button>
          </div> */}
        </div>
      )}
    </section>
  );
};

export default Liked;

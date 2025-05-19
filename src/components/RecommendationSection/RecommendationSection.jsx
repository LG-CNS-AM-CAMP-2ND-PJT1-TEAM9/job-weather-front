import React, { useState } from 'react';
import JobCard from '../JobCard/JobCard';
// import NewsCard from '../NewsCard/NewsCard'; // 뉴스 카드도 필요시 만듭니다.
import styles from './RecommendationSection.module.css';

// 임시 데이터 (API로부터 받아올 데이터)
const dummyJobPostings = [
  { id: 1, category: "금융권 IT", title: "IBK기업은행 체험형..", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 2, category: "대기업 SI", title: "삼성SDS ...", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 3, category: "대기업 SI", title: "CJ그룹 ...", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 4, category: "부트캠프", title: "LG CNS AM ...", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 5, category: "금융권 IT", title: "다른 IBK 공고", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 6, category: "대기업 SI", title: "다른 삼성 공고", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 7, category: "대기업 SI", title: "다른 CJ 공고", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 8, category: "부트캠프", title: "다른 LG 공고", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 9, category: "스타트업", title: "새로운 회사 공고 1", description: "새로운 설명입니다. 다음 페이지 내용입니다." },
  { id: 10, category: "스타트업", title: "새로운 회사 공고 2", description: "새로운 설명입니다." },
  { id: 11, category: "중견기업", title: "새로운 회사 공고 3", description: "새로운 설명입니다." },
  { id: 12, category: "중견기업", title: "새로운 회사 공고 4", description: "새로운 설명입니다." },
];

// 임시 뉴스 데이터 (필요시)
// const dummyNewsItems = [ ... ];

const ITEMS_PER_PAGE = 4; // 한 페이지에 보여줄 카드 수를 4로 변경!

function RecommendationSection() {
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'news'
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 탭에 따라 보여줄 데이터 선택
  const currentData = activeTab === 'jobs' ? dummyJobPostings : []; // TODO: 뉴스 데이터 추가
  const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);

  // 현재 페이지에 보여줄 아이템들
  const paginatedData = currentData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1); // 탭 변경 시 첫 페이지로
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section className={styles.recommendationSection}>
      <h3 className={styles.sectionTitle}>
        {/* TODO: 사용자 이름 동적으로 변경 */}
        OOO님을 위한 소식을 확인하세요
      </h3>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === 'jobs' ? styles.active : ''}`}
          onClick={() => handleTabClick('jobs')}
        >
          채용공고
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'news' ? styles.active : ''}`}
          onClick={() => handleTabClick('news')}
        >
          뉴스
        </button>
      </div>

      <div className={styles.contentGrid}>
        {activeTab === 'jobs' && paginatedData.length > 0 && paginatedData.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
        {activeTab === 'jobs' && paginatedData.length === 0 && <p className={styles.emptyMessage}>표시할 채용 공고가 없습니다.</p>}
        {/* TODO: 뉴스 탭 선택 시 뉴스 카드 렌더링 */}
        {activeTab === 'news' && <p className={styles.emptyMessage}>뉴스 정보가 곧 제공될 예정입니다.</p>}
      </div>

      {currentData.length > ITEMS_PER_PAGE && (
        <div className={styles.paginationControls}>
          <div className={styles.pageIndicators}>
            {[...Array(totalPages)].map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${currentPage === index + 1 ? styles.activeDot : ''}`}
                onClick={() => setCurrentPage(index + 1)} // 점 클릭으로 페이지 이동
              ></span>
            ))}
          </div>
          <div className={styles.arrowButtons}>
            <button onClick={handlePrevPage} disabled={currentPage === 1} className={styles.arrowButton}>
              &lt; {/* TODO: 왼쪽 화살표 아이콘 */}
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className={styles.arrowButton}>
              &gt; {/* TODO: 오른쪽 화살표 아이콘 */}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default RecommendationSection;

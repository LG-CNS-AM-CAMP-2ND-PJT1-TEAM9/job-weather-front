import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../JobCard/JobCard';
import NewsCard from '../NewsCard/NewsCard';
import styles from './RecommendationSection.module.css';

const dummyJobPostings = [
  { id: 1, category: "금융권 IT", title: "IBK기업은행 체험형..", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 2, category: "대기업 SI", title: "삼성SDS ...", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 3, category: "대기업 SI", title: "CJ그룹 ...", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 4, category: "부트캠프", title: "LG CNS AM ...", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
];

const ITEMS_PER_PAGE = 4;

function RecommendationSection() {
  const [activeTab, setActiveTab] = useState('jobs'); // 초기 탭을 'jobs'로 설정
  const [currentPage, setCurrentPage] = useState(1);

  const [recommendedNews, setRecommendedNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [errorNews, setErrorNews] = useState(null);

  const [recommendedJobs, setRecommendedJobs] = useState(dummyJobPostings);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [errorJobs, setErrorJobs] = useState(null);

  useEffect(() => {
    console.log("[useEffect] 현재 활성화된 탭:", activeTab);

    const fetchRecommendations = async () => {
      if (activeTab === 'news') {
        console.log("[useEffect] 뉴스 데이터 가져오기 시도...");
        setLoadingNews(true);
        setErrorNews(null);
        try {
          console.log("[useEffect] axios.get 호출 직전. URL: http://localhost:8080/api/main/recommendations");
          const response = await axios.get('http://localhost:8080/api/main/recommendations');
          console.log("[useEffect] API 응답 전체:", response);
          if (response.data && response.data.news) {
            console.log("[useEffect] API에서 받아온 뉴스 데이터:", response.data.news);
            setRecommendedNews(response.data.news);
          } else {
            console.warn("[useEffect] API 응답에 뉴스 데이터가 없거나 형식이 다릅니다:", response.data);
            setRecommendedNews([]);
          }
        } catch (err) {
          console.error("[useEffect] 추천 뉴스 로딩 실패:", err);
          // 에러 객체의 상세 내용도 확인 (네트워크 오류, 서버 오류 등)
          if (err.response) {
            // 요청이 이루어졌으나 서버가 2xx 범위 외의 상태 코드로 응답한 경우
            console.error("[useEffect] 에러 데이터:", err.response.data);
            console.error("[useEffect] 에러 상태 코드:", err.response.status);
          } else if (err.request) {
            // 요청이 이루어졌으나 응답을 받지 못한 경우
            console.error("[useEffect] 응답 없음, 요청 정보:", err.request);
          } else {
            // 요청을 설정하는 중에 문제가 발생한 경우
            console.error('[useEffect] 요청 설정 오류:', err.message);
          }
          setErrorNews("추천 뉴스를 불러오는 데 실패했습니다.");
          setRecommendedNews([]);
        } finally {
          setLoadingNews(false);
          console.log("[useEffect] 뉴스 데이터 가져오기 완료 (로딩 상태 false).");
        }
      } else if (activeTab === 'jobs') {
        console.log("[useEffect] 채용공고 데이터 설정 (현재는 더미 데이터).");
        // TODO: 채용공고 API 연동 로직
        setRecommendedJobs(dummyJobPostings);
        setLoadingJobs(false); // 로딩 상태 초기화
        setErrorJobs(null);    // 에러 상태 초기화
      }
    };

    // activeTab이 변경될 때마다 fetchRecommendations 함수를 호출합니다.
    // 초기 탭이 'jobs'이므로, 처음에는 채용공고 로직이 실행됩니다.
    // '뉴스' 탭을 클릭하면 activeTab이 'news'로 바뀌고 이 useEffect가 다시 실행됩니다.
    fetchRecommendations();

  }, [activeTab]); // activeTab이 변경될 때마다 이 useEffect 훅을 다시 실행

  let currentData, loadingState, errorState, CardComponent;
  if (activeTab === 'jobs') {
    currentData = recommendedJobs;
    loadingState = loadingJobs;
    errorState = errorJobs;
    CardComponent = JobCard;
  } else { // activeTab === 'news'
    currentData = recommendedNews;
    loadingState = loadingNews;
    errorState = errorNews;
    CardComponent = NewsCard;
  }

  const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);
  const paginatedData = currentData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTabClick = (tabName) => {
    console.log(tabName + " 탭 클릭됨. setActiveTab 호출 예정.");
    setActiveTab(tabName); // 이 호출로 인해 위의 useEffect가 다시 실행됩니다.
    setCurrentPage(1);
  };

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // 렌더링 직전에 상태 값들을 확인
  // console.log("--- 렌더링 직전 상태 ---");
  // console.log("activeTab:", activeTab);
  // console.log("recommendedNews:", recommendedNews);
  // console.log("paginatedData:", paginatedData);
  // console.log("loadingState:", loadingState);
  // console.log("errorState:", errorState);
  // console.log("----------------------");

  return (
    <section className={styles.recommendationSection}>
      <h3 className={styles.sectionTitle}>
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

      <div className={styles.contentDisplayArea}>
        {loadingState && <p className={styles.loadingMessage}>데이터를 불러오는 중...</p>}
        {!loadingState && errorState && <p className={styles.errorMessage}>{errorState}</p>}
        {!loadingState && !errorState && paginatedData.length === 0 && (
          <p className={styles.infoMessage}>표시할 내용이 없습니다.</p>
        )}
        {!loadingState && !errorState && paginatedData.length > 0 && (
          <div className={styles.contentGrid}>
            {paginatedData.map(item => (
              <CardComponent
                key={activeTab === 'jobs' ? item.id : item.newsSn}
                {...(activeTab === 'jobs' ? { job: item } : { news: item })}
              />
            ))}
          </div>
        )}
      </div>

      {currentData.length > ITEMS_PER_PAGE && !loadingState && !errorState && (
        <div className={styles.paginationControls}>
          <div className={styles.pageIndicators}>
            {[...Array(totalPages)].map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${currentPage === index + 1 ? styles.activeDot : ''}`}
                onClick={() => setCurrentPage(index + 1)}
              ></span>
            ))}
          </div>
          <div className={styles.arrowButtons}>
            <button onClick={handlePrevPage} disabled={currentPage === 1} className={styles.arrowButton}>&lt;</button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className={styles.arrowButton}>&gt;</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default RecommendationSection;

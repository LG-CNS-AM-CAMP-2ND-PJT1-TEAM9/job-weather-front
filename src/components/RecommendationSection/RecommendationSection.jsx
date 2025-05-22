import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../JobCard/JobCard';
import NewsCard from '../NewsCard/NewsCard';
import styles from './RecommendationSection.module.css';

// 채용공고 탭에 표시할 고정된 더미 데이터 (4개)
const fixedDummyJobs = [
  { id: 'dummy-job-1', category: "IT/기술", title: "웹 프론트엔드 개발자 (신입/경력)", description: "React, Vue.js 경험자 우대. 함께 성장할 열정적인 인재를 찾습니다." },
  { id: 'dummy-job-2', category: "데이터 분석", title: "데이터 사이언티스트 (주니어)", description: "SQL, Python 활용 능력 필수. 데이터 기반 의사결정을 지원합니다." },
  { id: 'dummy-job-3', category: "모바일 앱 개발", title: "Android 앱 개발자 (신입)", description: "Kotlin 또는 Java 사용. 사용자 중심의 앱 개발에 참여하세요." },
  { id: 'dummy-job-4', category: "서버/백엔드", title: "Java 백엔드 개발자 (경력무관)", description: "Spring Boot 기반 시스템 개발 및 운영. MSA 환경 경험자 환영." },
];

// 뉴스 탭에서 한 페이지에 보여줄 아이템 수 (페이지네이션용)
const NEWS_ITEMS_PER_PAGE = 4;

function RecommendationSection() {
  // 초기 탭을 'news'로 변경
  const [activeTab, setActiveTab] = useState('news');
  const [currentPage, setCurrentPage] = useState(1);

  const [recommendedNews, setRecommendedNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [errorNews, setErrorNews] = useState(null);

  // 채용공고 데이터는 이제 고정된 더미 데이터를 사용
  const recommendedJobs = fixedDummyJobs;

  useEffect(() => {
    console.log("[useEffect] 현재 활성화된 탭:", activeTab);

    const fetchRecommendations = async () => {
      if (activeTab === 'news') {
        console.log("[useEffect] 뉴스 데이터 가져오기 시도...");
        setLoadingNews(true);
        setErrorNews(null);
        try {
          // console.log("[useEffect] axios.get 호출 직전. URL: http://localhost:8080/api/main/recommendations");
          // const response = await axios.get('http://localhost:8080/api/main/recommendations');
          console.log("[useEffect] axios.get 호출 직전. URL: https://port-0-job-weather-back-maz0osy29beb3cb3.sel4.cloudtype.app/api/main/recommendations");
          const response = await axios.get('https://port-0-job-weather-back-maz0osy29beb3cb3.sel4.cloudtype.app/api/main/recommendations');
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
          if (err.response) {
            console.error("[useEffect] 에러 데이터:", err.response.data);
            console.error("[useEffect] 에러 상태 코드:", err.response.status);
          } else if (err.request) {
            console.error("[useEffect] 응답 없음, 요청 정보:", err.request);
          } else {
            console.error('[useEffect] 요청 설정 오류:', err.message);
          }
          setErrorNews("추천 뉴스를 불러오는 데 실패했습니다.");
          setRecommendedNews([]);
        } finally {
          setLoadingNews(false);
          console.log("[useEffect] 뉴스 데이터 가져오기 완료 (로딩 상태 false).");
        }
      }
      // 채용공고 탭에 대한 API 호출 로직은 없음 (고정 더미 데이터 사용)
    };

    if (activeTab === 'news') {
        fetchRecommendations();
    } else {
        // 뉴스 탭이 아닐 경우, 뉴스 관련 상태 초기화 (선택적)
        setRecommendedNews([]); // 뉴스 목록 비우기
        setLoadingNews(false);  // 로딩 상태 false
        setErrorNews(null);     // 에러 상태 null
    }

  }, [activeTab]);

  let currentData, loadingState, errorState, CardComponent, itemsPerPageForPagination;
  if (activeTab === 'jobs') {
    currentData = recommendedJobs;
    loadingState = false;
    errorState = null;
    CardComponent = JobCard;
    itemsPerPageForPagination = recommendedJobs.length; // 채용공고는 한 페이지에 모두 표시
  } else { // activeTab === 'news'
    currentData = recommendedNews;
    loadingState = loadingNews;
    errorState = errorNews;
    CardComponent = NewsCard;
    itemsPerPageForPagination = NEWS_ITEMS_PER_PAGE; // 뉴스 페이징 처리
  }

  const totalPages = Math.ceil(currentData.length / itemsPerPageForPagination);
  const paginatedData = currentData.slice(
    (currentPage - 1) * itemsPerPageForPagination,
    currentPage * itemsPerPageForPagination
  );

  const handleTabClick = (tabName) => {
    console.log(tabName + " 탭 클릭됨. setActiveTab 호출 예정.");
    setActiveTab(tabName);
    setCurrentPage(1);
  };

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <section className={styles.recommendationSection}>
      <h3 className={styles.sectionTitle}>
        추천 소식을 확인하세요
      </h3>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === 'news' ? styles.active : ''}`}
          onClick={() => handleTabClick('news')}
        >
          뉴스
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'jobs' ? styles.active : ''}`}
          onClick={() => handleTabClick('jobs')}
        >
          채용공고
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

      {currentData.length > itemsPerPageForPagination && !loadingState && !errorState && (
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

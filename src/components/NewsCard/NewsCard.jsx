// src/components/NewsCard/NewsCard.jsx
import React from 'react';
import styles from './NewsCard.module.css';

// HTML 엔티티 디코딩 및 간단한 태그 제거 함수
const cleanText = (htmlString) => {
    if (!htmlString) return '';
    const textarea = document.createElement('textarea');
    textarea.innerHTML = htmlString; // HTML 엔티티 디코딩
    // 간단한 태그 제거 (더 정교한 제거는 라이브러리 사용 고려)
    let text = textarea.value;
    text = text.replace(/<[^>]+>/g, ''); // HTML 태그 제거
    return text;
};


function NewsCard({ news }) {
  if (!news) {
    return null;
  }

  // NewsDto의 필드명 확인: newsTitle, newsDescription, newsLink, newsDateTime
  const title = cleanText(news.newsTitle) || "제목 없음";
  // 설명은 일정 길이로 자르기 (예: 100자)
  const description = news.newsDescription ? cleanText(news.newsDescription).substring(0, 100) + "..." : "내용 없음";
  const link = news.newsLink || "#";
  const date = news.newsDateTime ? new Date(news.newsDateTime).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'short', day: 'numeric'
  }) : "날짜 정보 없음";

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
      <div className={styles.card}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
        <div className={styles.meta}>
          <span className={styles.date}>{date}</span>
          {/* <span className={styles.source}>{news.source || "출처 미상"}</span> */} {/* 출처 정보가 있다면 표시 */}
        </div>
      </div>
    </a>
  );
}

export default NewsCard;

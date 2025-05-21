import React from 'react';
import styles from './JobCard.module.css';

function JobCard({ job }) {
  if (!job) {
    return null; // job 데이터가 없으면 렌더링하지 않음
  }

  return (
    <div className={styles.card}>
      <div className={styles.categoryTag}>{job.category || "미분류"}</div>
      <h4 className={styles.title}>{job.title || "제목 없음"}</h4>
      <p className={styles.description}>{job.description || "설명 없음"}</p>
      <button className={styles.detailsButton}>
        Button &gt; {/* TODO: 버튼 텍스트 및 기능 구현 */}
      </button>
    </div>
  );
}

export default JobCard;
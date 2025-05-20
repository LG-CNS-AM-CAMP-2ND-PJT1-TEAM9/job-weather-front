import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brandInfo}>
          {/* TODO: 로고 아이콘 */}
          <div className={styles.brandIcon}>🧊</div> {/* 임시 아이콘 */}
          <span className={styles.brandName}>(가제)취업하기 좋은 날</span>
        </div>
        <div className={styles.footerLinks}>
          {/* TODO: 실제 링크 및 내용으로 변경 */}
          <p>설명설명</p>
          <p>연락처 연락처</p>
          <p>뭐를 사용했습니다</p>
          {/* <a href="/terms">이용약관</a>
          <a href="/privacy">개인정보처리방침</a>
          <a href="/contact">고객센터</a> */}
        </div>
      </div>
      <div className={styles.copyright}>
        © {new Date().getFullYear()} Your Company Name. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
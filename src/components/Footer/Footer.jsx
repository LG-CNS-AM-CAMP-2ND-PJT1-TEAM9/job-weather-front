import React from 'react';
import styles from './Footer.module.css';
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brandInfo}>
          <Link to="/">
            <img src="/img/goodjob.png" alt="홈으로 이동" style={{ height: "100px", cursor: "pointer" }} />
          </Link>
         
        </div>
        <div className={styles.footerLinks}>
          {/* TODO: 실제 링크 및 내용으로 변경 */}
          <p>LG CNS AM Inspire Camp 2기</p>
          <p>9조 김지은 문지욱 안효준 윤준서 정모경 조수빈</p>
          <p>https://github.com/LG-CNS-AM-CAMP-2ND-PJT1-TEAM9</p>
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
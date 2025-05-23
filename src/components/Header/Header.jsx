import React, { useEffect, useState } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom"; // NavLink 추가 (활성 링크 스타일링용)
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
// import { UserCircle } from 'lucide-react'; // 예시: 아이콘 라이브러리 사용 시

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/notifications/isLogin`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {" "}
        {/* 로고와 주요 네비게이션을 묶는 div */}
        <div className={styles.logo}>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              style={{ width: "100%", height: "auto" }}
            />
          </Link>
        </div>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <NavLink
                to="/news"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
              >
                뉴스
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/job_search"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
              >
                채용정보
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.userActions}>
        {user ? (
          <span
            className={styles.userIcon}
            onClick={() => navigate("/alarm")}
            style={{ cursor: "pointer" }}
          >
            👤
          </span>
        ) : (
          <>
            <Link to="/users/login" className={styles.authLink}>
              로그인
            </Link>
            <Link
              to="/users/signup"
              className={`${styles.authLink} ${styles.signupButton}`}
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

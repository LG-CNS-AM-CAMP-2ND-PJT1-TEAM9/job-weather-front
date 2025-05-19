import React from 'react';
import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <a href="/">Logo</a> {/* TODO: 로고 이미지 또는 컴포넌트로 교체 /}
</div>
<nav className={styles.navigation}>
<ul>
<li><a href="/">홈</a></li>
<li><a href="/news">뉴스</a></li>
<li><a href="/jobs">채용공고</a></li>
<li>
<a href="/link-four">
Link Four <span className={styles.dropdownArrow}>▼</span> {/ TODO: 실제 드롭다운 아이콘으로 교체 /}
</a>
{/ TODO: 드롭다운 메뉴 구현 /}
</li>
</ul>
</nav>
<div className={styles.userActions}>
{/ TODO: 사용자 아이콘 (예: react-icons 라이브러리 사용) /}
<span className={styles.userIcon}>👤</span> {/ 임시 사용자 아이콘 */}
            </div>
        </header>
    );
}

export default Header;
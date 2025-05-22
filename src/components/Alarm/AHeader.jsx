// 상단 유저(마이페이지 이동) + 로그아웃
import { useNavigate } from "react-router-dom";

function AHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. 토큰 삭제
    localStorage.removeItem("accessToken");

    // 2. 필요하면 사용자 정보도 제거해야
    // localStorage.removeItem("user");

    // 3. 로그아웃 후 메인 페이지 또는 로그인 페이지로 이동
    navigate("/login");
  };

  return (
    <div className="A-header">
      <div className="A-user-info">
        <div className="A-user-icon">👤</div>
        <span className="A-username">user1</span>
      </div>
      <button className="A-logout-btn" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}

export default AHeader;
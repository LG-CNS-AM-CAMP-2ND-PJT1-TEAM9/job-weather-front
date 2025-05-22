// 상단 유저(마이페이지 이동) + 로그아웃
function AHeader() {
  return (
    <div className="A-header">
      <div className="A-user-info">
        <div className="A-user-icon">👤</div>
        <span className="A-username">user1</span>
      </div>
      <button className="A-logout-btn">로그아웃</button>
    </div>
  );
}

export default AHeader;
import { useEffect, useState } from "react";
import axios from "axios";

function AHeader() {
  const [nickname, setNickname] = useState("..."); // 

  useEffect(() => {
    const userSn = localStorage.getItem("userSn:7"); // 
    if (!userSn) return;

    axios.post("http://localhost:8080/api/users/info", { userSn }, { withCredentials: true })
      .then((res) => {
        setNickname(res.data.nickname); // 
      })
      .catch((err) => {
        console.error("닉네임 가져오기 실패:", err);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/logout", {}, { withCredentials: true });
      localStorage.removeItem("userSn");
      localStorage.removeItem("nickname");
      window.location.href = "/login";
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <div className="A-header">
      <div className="A-user-info">
        <div className="A-user-icon">👤</div>
        <span className="A-username">{nickname}</span> 
      </div>
      <button className="A-logout-btn" onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default AHeader;
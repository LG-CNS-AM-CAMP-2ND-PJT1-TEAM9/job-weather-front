import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
function AHeader() {
  const [nickname, setNickname] = useState(""); //

  // useEffect(() => {
  //   // const userSn = localStorage.getItem("userSn:7"); //
  //   if (!userSn) return;

  //   axios
  //     .post(
  //       `${API_BASE_URL}/api/users/info`,
  //       { userSn },
  //       { withCredentials: true }
  //     )
  //     .then((res) => {
  //       setNickname(res.data.nickname); //
  //     })
  //     .catch((err) => {
  //       console.error("닉네임 가져오기 실패:", err);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/users/info`, { withCredentials: true })
      .then((res) => {
        setNickname(res.data.nickname);
      })
      .catch((err) => {
        console.error("닉네임 가져오기 실패:", err);
        setNickname(null);
      });
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("userSn");
      localStorage.removeItem("nickname");

      if (res.data === "네이버 로그아웃 완료") {
        //우리 홈페이지로 이동
        window.location.href = "/";
      } else {
        window.location.href = "/users/login";
      }
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
      <button className="A-logout-btn" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}

export default AHeader;

import Profile from "../../components/Profile/Profile";
import Liked from "../../components/Liked/Liked";
import Custom from "../../components/Custom/Custom";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../api/mypage_api";
import "./Mypage.css";

const Mypage = () => {
  const navigate = useNavigate();
  const isChecked = useRef(false);

  useEffect(() => {
    async function check() {
      if (isChecked.current) return;
      isChecked.current = true;

      const res = await checkLogin();
      console.log("status", res.status);

      if (res.status === 401) {
        alert("로그인 후 이용해주세요");
        navigate("/users/login");
      }
    }
    check();
  }, []);

  return (
    <div className="mypageContainer">
      <Profile></Profile>
      <Liked></Liked>
      <Custom></Custom>
    </div>
  );
};

export default Mypage;

import Profile from "../../components/Profile/Profile";
import Liked from "../../components/Liked/Liked";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Custom from "../../components/Custom/Custom";
import "./Mypage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../api/mypage_api";

const Mypage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function check() {
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

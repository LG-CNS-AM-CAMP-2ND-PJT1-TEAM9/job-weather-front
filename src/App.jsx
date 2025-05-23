import { useState, useEffect } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import JobSearch from "./pages/job_search/job_search.jsx";
import Resetpw from "./pages/Resetpw";
import MainPage from "./pages/MainPage/MainPage";
import News from "./pages/News/News";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Mypage from "./pages/mypage/Mypage.jsx";

//알람경로
import AlarmPage from "./components/Alarm/AlarmPage";
import Custom from "./components/Custom/Custom";

function PageRoutesWithLayout() {
  const location = useLocation();
  const [layoutClass, setLayoutClass] = useState("app-layout-default"); // 기본값
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/users/isLogin`, {
          withCredentials: true,
        });
        setIsLoggedIn(res.data); // true or false
      } catch (error) {
        setIsLoggedIn(false);
        console.error("로그인 상태 확인 실패", error);
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path === "/news" || path === "/job_search") {
      // MainPage, News, JobSearch는 전체 너비 레이아웃 사용
      setLayoutClass("app-layout-main");
    } else {
      // 그 외 페이지들(로그인, 회원가입 등)은 기본 중앙 정렬 레이아웃 사용
      setLayoutClass("app-layout-default");
    }
  }, [location.pathname]);

  return (
    <div className={layoutClass}>
      <Routes>
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/reset-password" element={<Resetpw />} />
        <Route path="/job_search" element={<JobSearch />} />
        <Route path="/news" element={<News />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/" element={<MainPage />} />

        {/**알람기능 여기서 부터 해봅니댜 */}
        <Route path="/alarm" element={<AlarmPage isLoggedIn={isLoggedIn} />} />
        <Route path="/keywords" element={<Custom />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <PageRoutesWithLayout />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

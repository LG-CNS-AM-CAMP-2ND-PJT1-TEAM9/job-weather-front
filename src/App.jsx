import { useState, useEffect } from 'react';
// import reactLogo from './assets/react.svg'; // 사용하지 않는다면 제거 가능
// import viteLogo from '/vite.svg'; // 사용하지 않는다면 제거 가능
import './App.css'; // App.css import
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/Login';
import JobSearch from './pages/job_search/job_search.jsx'; // JobSearch 페이지 import 추가
import Resetpw from './pages/Resetpw'; // 비밀번호 재설정 페이지 import
import MainPage from './pages/MainPage/MainPage';
import News from './pages/News'


// 라우트에 따라 다른 레이아웃 클래스를 적용하기 위한 내부 컴포넌트
function AppLayout() {
  const location = useLocation();
  const [layoutClass, setLayoutClass] = useState('app-layout-default'); // 기본 레이아웃

  // location.pathname이 변경될 때마다 적절한 레이아웃 클래스 설정
  useEffect(() => {
    if (location.pathname === '/') { // MainPage 경로
      setLayoutClass('app-layout-main');
    } else {
      // MainPage 이외의 모든 페이지 (로그인, 회원가입, 비밀번호 재설정, 채용검색 등)
      setLayoutClass('app-layout-default');
    }
  }, [location.pathname]); // 경로가 변경될 때만 이 효과를 다시 실행

  return (

    // 이 div가 #root 바로 아래의 최상위 wrapper가 되어 레이아웃을 결정합니다.
    <div className={layoutClass}>
      <Routes>
        <Route path='/users/login' element={<Login/>}/>
        <Route path='/users/signup' element={<Signup/>}/>
        <Route path='/users/reset-password' element={<Resetpw/>}/> {/* 비밀번호 재설정 라우트 */}
        <Route path='/job_search' element={<JobSearch/>}/> {/* 채용 검색 페이지 라우트 추가 */}
        <Route path='/' element={<MainPage/>}/>
        <Route path='/news' element={<News/>}/>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* AppLayout 컴포넌트를 여기서 사용해야 합니다. */}
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;

import { useState, useEffect } from 'react'; // useEffect 추가
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css'; // 수정된 App.css를 import
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/Login';
import MainPage from './pages/MainPage/MainPage';

// 라우트에 따라 다른 레이아웃 클래스를 적용하기 위한 내부 컴포넌트
function AppLayout() {
  const location = useLocation();
  const [layoutClass, setLayoutClass] = useState('app-layout-default'); // 기본 레이아웃

  // location.pathname이 변경될 때마다 적절한 레이아웃 클래스 설정
  useEffect(() => {
    if (location.pathname === '/') { // MainPage 경로
      setLayoutClass('app-layout-main');
    } else {
      setLayoutClass('app-layout-default');
    }
  }, [location.pathname]); // 경로가 변경될 때만 이 효과를 다시 실행

  return (
    // 이 div가 #root 바로 아래의 최상위 wrapper가 되어 레이아웃을 결정합니다.
    <div className={layoutClass}>
      <Routes>
        <Route path='/users/login' element={<Login/>}/>
        <Route path='/users/signup' element={<Signup/>}/>
        <Route path='/' element={<MainPage/>}/>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;

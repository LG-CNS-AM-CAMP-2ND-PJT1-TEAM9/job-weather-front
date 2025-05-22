import { useNavigate } from 'react-router-dom';

function Tabs({ activeTab }) {
  const navigate = useNavigate();

  return (
    <div className="tabs">
      <button
        className={`tab ${activeTab === 'news' ? 'active' : ''}`}
        onClick={() => navigate('/mypage')}
      >
        내 소식
      </button>
      <button
        className={`tab ${activeTab === 'keywords' ? 'active' : ''}`}
        onClick={() => navigate('/keywords')}
      >
        관심 키워드
      </button>
    </div>
  );
}

export default Tabs;
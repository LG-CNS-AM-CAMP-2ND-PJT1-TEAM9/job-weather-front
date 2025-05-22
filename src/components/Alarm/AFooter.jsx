// 모두 삭제. 페이지 이동
import { useNavigate } from 'react-router-dom';

function AFooter({ page, setPage }) {
  const handleDeleteAll = () => {
    setPage(0);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="A-footer">
      <button className="A-delete-all-btn" onClick={handleDeleteAll}>모두 삭제</button>
      <div className="A-page-buttons">
        <button className="A-prev-page-btn" onClick={handlePrevPage}>◀</button>
        <button className="A-next-page-btn" onClick={handleNextPage}>▶</button>
      </div>
    </div>
  );
}

export default AFooter;
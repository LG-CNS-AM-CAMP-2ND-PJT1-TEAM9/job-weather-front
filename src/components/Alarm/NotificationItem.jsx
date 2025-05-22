// 알림 읽음 여부 및 개별 삭제

import { Link } from 'react-router-dom';

function NotificationItem({ id, icon, title, time, isRead, type, onDelete, onRead }) {
  const linkPath = type === 'job'
    ? `/job-detail/${id}`
    : `/news-detail/${id}`;

  const handleClick = () => {
    onRead(id); // 읽음 처리 (근데 일단 임시로 데이터 값을 넣어버려서 수정을 해야함)
  };

  return (
    <li className="notification">
      <button onClick={() => onDelete(id)}>❌</button>
      <span className="icon">{icon}</span>
      <div className="content">
        <Link to={linkPath} className="title-link" onClick={handleClick}>
          {title}
        </Link>
        <p>{time}</p>
        <span className="status">{isRead ? '읽음' : '안 읽음'}</span>
      </div>
    </li>
  );
}

export default NotificationItem;
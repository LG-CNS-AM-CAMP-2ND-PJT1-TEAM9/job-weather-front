// 알림 읽음 여부 및 개별 삭제
import { API_BASE_URL } from "../../api/api";
import { Link } from "react-router-dom";

function NotificationItem({
  id,
  icon,
  title,
  time,
  isRead,
  link,
  type,
  onDelete,
  onRead,
}) {
  const linkPath = type === "job" ? `/job-detail/${id}` : `/news-detail/${id}`;

  const handleClick = () => {
    onRead(id); // 읽음 처리 (근데 일단 임시로 데이터 값을 넣어버려서 수정을 해야함)
    // http://localhost:8080/api/notifications/update
    useEffect(() => {
      axios
        .post(
          `${API_BASE_URL}/api/notifications/update`,
          { notificationId: 7 },
          { withCredentials: true }
        )
        //유저 매칭을 부르는데 어떤 사용자를 가져올지...
        .then((res) => {
          // 받은 데이터를 최신순 정렬 (옵션)
          const sorted = res.data.sort((a, b) => b.id - a.id);
          setNotifications(sorted);
          setPagedNotifications(
            sorted.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
          );
        })
        .catch((err) => {
          console.error("알림 불러오기 실패:", err);
        });
    }, []);
  };

  return (
    <li key={id} className="notification">
      <button onClick={() => onDelete(id)}>❌</button>
      <span className="icon">{icon}</span>
      <div className="content">
        <Link to={link} className="title-link" onClick={handleClick}>
          {title}
        </Link>
        <p>{time}</p>
        const
        <span className="status">{isRead ? "읽음" : "안 읽음"}</span>
      </div>
    </li>
  );
}

export default NotificationItem;

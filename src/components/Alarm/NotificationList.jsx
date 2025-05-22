import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationItem from './NotificationItem';

function NotificationList({ page, setPage }) {
  const itemsPerPage = 4;

  // 알림 데이터 state로 관리
  const [notifications, setNotifications] = useState([]);
  const [pagedNotifications, setPagedNotifications] = useState([]);

  //  백엔드에서 사용자 맞춤 알림 불러오기
  useEffect(() => {
    // axios.post('http://localhost:8080/api/notifications/user-matching', {userSn:7}, { withCredentials: true })
    axios.post('https://port-0-job-weather-back-maz0osy29beb3cb3.sel4.cloudtype.app/api/notifications/user-matching', {userSn:7}, { withCredentials: true })
    //유저 매칭을 부르는데 어떤 사용자를 가져올지...
      .then((res) => {
        // 받은 데이터를 최신순 정렬 (옵션)
        const sorted = res.data.sort((a, b) => b.id - a.id);
        setNotifications(sorted);
        setPagedNotifications(sorted.slice(
          page * itemsPerPage,
          (page + 1) * itemsPerPage
        ))
      })
      .catch((err) => {
        console.error('알림 불러오기 실패:', err);
      });
  }, []);

  // 페이지 유효성 체크: 삭제 후 현재 페이지가 유효하지 않으면 이전 페이지로 이동
  useEffect(() => {
    const maxPage = Math.floor((notifications.length - 1) / itemsPerPage);
    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [notifications, page, setPage]);

  // 개별 삭제
  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <ul className="notifications-list">
      {pagedNotifications.map((n) => (
        <NotificationItem
          key={n.id}
          id={n.id}
          icon={n.type === 'job' ? '💬' : '📰'}
          title={n.title}
          time={n.time || '방금 전'}
          isRead={n.isRead}
          type={n.type}
          onDelete={() => handleDelete(n.id)}
        />
      ))}
    </ul>
  );
}

export default NotificationList;
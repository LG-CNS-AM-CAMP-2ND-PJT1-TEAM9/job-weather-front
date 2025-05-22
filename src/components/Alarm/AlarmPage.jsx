import { useState } from 'react';
import AHeader from './AHeader';
import AFooter from './AFooter';
import Tabs from './Tabs';
import NewNotice from './NewNotice';
import NotificationList from './NotificationList';
import './Alarm.css'; 

function AlarmPage() {
  const [page, setPage] = useState(0);

  return (
    <div className="notification-panel">
      <AHeader />
      <Tabs />
      <NewNotice />
      <hr />
      <NotificationList page={page} setPage={setPage} />
      <AFooter page={page} setPage={setPage} />
    </div>
  );
}

export default AlarmPage;
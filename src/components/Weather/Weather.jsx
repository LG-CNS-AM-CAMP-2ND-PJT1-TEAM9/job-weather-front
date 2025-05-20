import React from 'react';
import styles from './Weather.module.css';

function Weather() {
  // TODO: 이 데이터는 API로부터 받아와야 합니다.
  const weatherData = {
    conditionText: "맑음",
    temperature: 25, // 실제 온도가 아닌 채용 지수
    comment1: "어제보다 4°C 높아요.",
    comment2: "신입 개발자 채용이 00건 추가됐어요.",
    comment3: "앞으로 화창한 날씨가 계속되길 기대해요.",
    lastUpdated: "2025. 05. 16. 06:00" // 이미지의 업데이트 시간
  };

  return (
    <section className={styles.weatherSection}>
      <div className={styles.weatherVisual}>
        {/* TODO: 실제 해 아이콘 (예: react-icons의 WiDaySunny) */}
        <div className={styles.sunIcon}>☀️</div>
        <div className={styles.temperatureBox}>
          {weatherData.temperature}°C
        </div>
      </div>
      <div className={styles.weatherInfo}>
        <h2 className={styles.title}>
          오늘의 채용 날씨는 '<span className={styles.condition}>{weatherData.conditionText}</span>' !
        </h2>
        <ul className={styles.comments}>
          <li>{weatherData.comment1}</li>
          <li>{weatherData.comment2}</li>
          <li>{weatherData.comment3}</li>
        </ul>
        <p className={styles.lastUpdated}>
          업데이트 : {weatherData.lastUpdated}
        </p>
      </div>
    </section>
  );
}

export default Weather;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Weather.module.css'; // CSS 모듈 경로

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      console.log("[Weather.jsx] fetchWeatherData 호출됨");
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:8080/api/weather/latest'); // 백엔드 날씨 API
        console.log("[Weather.jsx] API 응답:", response.data);
        if (response.data && typeof response.data.score !== 'undefined') { // score 필드가 있는지로 데이터 유효성 판단 (예시)
          setWeatherData(response.data);
        } else {
          console.warn("[Weather.jsx] API 응답에 유효한 날씨 데이터가 없습니다:", response.data);
          setError("날씨 정보를 가져왔으나, 내용이 올바르지 않습니다.");
          setWeatherData(null); // 유효하지 않은 데이터면 null로 설정
        }
      } catch (err) {
        console.error("[Weather.jsx] 날씨 정보 로딩 실패:", err);
        setError("날씨 정보를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.");
        setWeatherData(null); // 에러 발생 시 null로 설정
      } finally {
        setLoading(false);
        console.log("[Weather.jsx] fetchWeatherData 완료. 로딩 상태:", false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <section className={`${styles.weatherSection} ${styles.loading}`}>
        <p>오늘의 채용 날씨를 불러오는 중... 🌦️</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`${styles.weatherSection} ${styles.error}`}>
        <p>{error}</p>
      </section>
    );
  }

  // weatherData가 null이거나, 필수 필드가 없는 경우 "정보 없음" 처리
  if (!weatherData || typeof weatherData.score === 'undefined') {
    return (
      <section className={`${styles.weatherSection} ${styles.error}`}>
        <p>표시할 날씨 정보가 없습니다.</p>
      </section>
    );
  }

  const getWeatherIcon = (weatherText) => {
    if (typeof weatherText !== 'string') return "❓";
    if (weatherText.includes("매우 맑음")) return "☀️"; // "매우 맑음" 먼저 체크
    if (weatherText.includes("맑음")) return "☀️";
    if (weatherText.includes("구름") || weatherText.includes("흐림")) return "🌥️";
    if (weatherText.includes("비")) return "🌧️";
    return "❓"; // 기본 아이콘
  };

  // 백엔드 WeatherResponseDto 필드: date, score, weather, commentary
  const displayCondition = weatherData.weather || "정보 없음";
  const displayScore = weatherData.score; // score는 숫자 그대로 사용
  const displayComment = weatherData.commentary || "코멘트 정보가 없습니다.";
  // 백엔드에서 LocalDate로 오므로, 시간 정보는 없음.
  // DB 저장 시각을 별도 필드로 받거나, 프론트에서 "기준일" 정도로만 표시
  const displayDate = weatherData.date ? new Date(weatherData.date).toLocaleDateString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit'
  }) : "날짜 정보 없음";

  return (
    <section className={styles.weatherSection}>
      <div className={styles.weatherVisual}>
        <div className={styles.sunIcon}>{getWeatherIcon(displayCondition)}</div>
        <div className={styles.temperatureBox}>
          {displayScore}점
        </div>
      </div>
      <div className={styles.weatherInfo}>
        <h2 className={styles.title}>
          오늘의 채용 날씨는 '<span className={styles.condition}>{displayCondition}</span>' !
        </h2>
        <p className={styles.gptComment}>{displayComment}</p>
        <p className={styles.lastUpdated}>
          기준일 : {displayDate}
        </p>
      </div>
    </section>
  );
}

export default Weather;

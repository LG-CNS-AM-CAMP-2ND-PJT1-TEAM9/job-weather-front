import React from 'react';
import Header from '../../components/Header/Header';
import Weather from '../../components/Weather/Weather';
import RecommendationSection from '../../components/RecommendationSection/RecommendationSection';
import Footer from '../../components/Footer/Footer';
import styles from './MainPage.module.css';

function MainPage() {
  return (
    <div className={styles.mainPageContainer}>
      <main className={styles.mainContent}>
        <Weather />
        <RecommendationSection />
      </main>
    </div>
  );
}

export default MainPage;

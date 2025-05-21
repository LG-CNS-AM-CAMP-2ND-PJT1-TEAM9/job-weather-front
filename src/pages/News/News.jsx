import React, { useState, useEffect } from "react";
import styles from './News.module.css';
import { fetchNews } from '../../api/news_api';
// import Header from '../../components/Header/Header'; // App.jsx에서 렌더링하므로 여기서 제거
// import Footer from '../../components/Footer/Footer'; // App.jsx 또는 PageRoutesWithLayout에서 렌더링 고려

const News = () => {
  // ... (기존 state 및 useEffect 로직은 동일) ...
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);
  const [displayedNews, setDisplayedNews] = useState([]);
  const itemsPerPage = 20;
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('likedNews');
    return new Set(savedLikes ? JSON.parse(savedLikes) : []);
  });

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNews(searchTerm);
        setNews(data.items || []);
        setDisplayedNews(data.items?.slice(0, itemsPerPage) || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, [searchTerm]);

  const handleSearchInput = (e) => setSearchTerm(e.target.value);

  const highlightText = (text) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? 
        <mark key={index}>{part}</mark> : 
        part
    );
  };

  const handleLikeClick = (id) => {
    setLikes(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(id)) newLikes.delete(id);
      else newLikes.add(id);
      return newLikes;
    });
  };

  useEffect(() => {
    localStorage.setItem('likedNews', JSON.stringify([...likes]));
  }, [likes]);

  const hasMore = displayedNews.length < news.length;

  const handleLoadMore = () => {
    const startIndex = displayedNews.length;
    const endIndex = startIndex + itemsPerPage;
    const newItems = news.slice(startIndex, endIndex);
    setDisplayedNews(prev => [...prev, ...newItems]);
  };
  
  return (
    // News.jsx의 최상위 div는 App.jsx의 layoutClass를 받음
    // Header와 Footer는 App.jsx 또는 PageRoutesWithLayout에서 관리되므로 여기서 제거
    <div className={styles['news-container']}>
      {/* <Header /> */} {/* App.jsx에서 렌더링 */}
      
      <div className={styles['content-wrapper']}> {/* 내부 콘텐츠를 감싸는 래퍼 */}
        <div className={styles['search-container']}>
          <input
            type="text"
            placeholder="뉴스 검색"
            value={searchTerm}
            onChange={handleSearchInput}
            className={styles['search-input']}
          />
          {news.length > 0 && (
            <div className={styles['search-results']}>
              검색 결과: {news.length}건
            </div>
          )}
        </div>

        <div className={styles['news-list']}>
          {loading ?
            <div className={styles['loading']}>뉴스를 불러오는 중...</div>
          : error ?
            <div className={styles['error']}>{error}</div>
          : displayedNews.length === 0 ?
            <div className={styles['no-results']}>검색 결과가 없습니다.</div>
          : 
            <>
              {displayedNews.map(item => (
                <div key={item.id} className={styles['news-item']}>
                  <a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles['news-content']}
                  >
                    <h2>{highlightText(item.title)}</h2>
                    <p>{highlightText(item.description)}</p>
                  </a>
                  <div className={styles['news-meta']}>
                    <span className={styles['date']}>
                      {new Date(item.pubDate).toLocaleDateString('ko-KR', {
                        year: 'numeric', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                    <button 
                      className={`${styles['like-button']} ${likes.has(item.id) ? styles['liked'] : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLikeClick(item.id);
                      }}
                    >
                      {likes.has(item.id) ? '★' : '☆'}
                    </button>
                  </div>
                </div>
              ))}
              {hasMore && (
                <button 
                  className={styles['load-more-button']}
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {loading ? '로딩 중...' : '더보기'}
                </button>
              )}
            </>
          }
        </div>
      </div>
      {/* <Footer /> */} {/* App.jsx 또는 PageRoutesWithLayout에서 렌더링 고려 */}
    </div>
  );
};

export default News;

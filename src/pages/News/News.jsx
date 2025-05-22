import React, { useState, useEffect } from "react";
import styles from './News.module.css';
import { fetchNews, getLikedNews, toggleLikeNews } from '../../api/news_api';

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);
  const [displayedNews, setDisplayedNews] = useState([]);
  const itemsPerPage = 20;
  const [likes, setLikes] = useState(new Set());

  // 뉴스 로드
  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNews(searchTerm);
        
        // newsSn을 문자열로 변환
        const mappedItems = data.items.map(item => ({
          ...item,
          newsSn: String(item.newsSn)
        }));
        
        setNews(mappedItems || []);
        setDisplayedNews(mappedItems?.slice(0, itemsPerPage) || []);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, [searchTerm]);

  // 검색
  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  // HTML 엔티티 디코딩 함수
  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  const highlightText = (text) => {
    if (!searchTerm) return decodeHtmlEntities(text);
    const decodedText = decodeHtmlEntities(text);
    const parts = decodedText.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? 
        <mark key={index}>{part}</mark> : 
        part
    );
  };

  // 뉴스 찜기능
  useEffect(() => {
    const loadLikedNews = async () => {
      try {
        const likedNewsIds = await getLikedNews();
        setLikes(new Set(likedNewsIds));
      } catch (err) {
        if (err.message === '401') {
          setLikes(new Set());
        } else {
          console.error('Failed to load liked news:', err);
        }
      }
    };

    loadLikedNews();
  }, []);
  
  const handleLikeClick = async (newsSn) => {
    try {
      await toggleLikeNews(newsSn);
      setLikes(prev => {
        const newLikes = new Set(prev);
        if (newLikes.has(newsSn)) {
          newLikes.delete(newsSn);
        } else {
          newLikes.add(newsSn);
        }
        return newLikes;
      });
    } catch (err) {
      if (err.message === '401') {
        alert('찜버튼은 로그인이 필요한 서비스입니다.');
      } else {
        console.error('Failed to toggle like:', err);
        alert('찜하기 처리 중 오류가 발생했습니다.');
      }
    }
  };

  // 더보기
  const hasMore = displayedNews.length < news.length;

  const handleLoadMore = () => {
    const startIndex = displayedNews.length;
    const endIndex = startIndex + itemsPerPage;
    const newItems = news.slice(startIndex, endIndex);
    setDisplayedNews(prev => [...prev, ...newItems]);
  };

  return (
    <div className={styles['news-container']}>
      
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
              <div key={item.newsSn} className={styles['news-item']}>
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
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <button 
                    className={`${styles['like-button']} ${likes.has(item.newsSn) ? styles['liked'] : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLikeClick(item.newsSn);
                    }}
                  >
                    {likes.has(item.newsSn) ? '★' : '☆'}
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
  );
};

export default News;

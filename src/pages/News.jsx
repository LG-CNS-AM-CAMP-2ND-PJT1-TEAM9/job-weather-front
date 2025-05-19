import { useState, useEffect } from 'react';
import './News.css';
import { fetchNews } from '../api/news_api';

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('likedNews');
    return new Set(savedLikes ? JSON.parse(savedLikes) : []);
  });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // 뉴스 로드
  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNews(page, searchQuery);
        
        setNews(prev => page === 1 ? data.items || [] : [...prev, ...(data.items || [])]);
        setTotal(data.total || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [page, searchQuery]);

  // 좋아요 저장
  useEffect(() => {
    localStorage.setItem('likedNews', JSON.stringify([...likes]));
  }, [likes]);

  // 검색
  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(searchTerm);
    setPage(1);
  };

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 좋아요
  const handleLikeClick = (id) => {
    setLikes(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(id)) {
        newLikes.delete(id);
      } else {
        newLikes.add(id);
      }
      return newLikes;
    });
  };

  // 더보기
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const hasMore = (page * 20) < total;

  // 검색어 하이라이트
  const highlightText = (text) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? 
        <mark key={index}>{part}</mark> : 
        part
    );
  };

  return (
    <div className="news-container">
      <header>
        <h1>채용 뉴스</h1>
      </header>
      
      <div className="search-container">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="뉴스 검색"
            value={searchTerm}
            onChange={handleSearchInput}
            onKeyDown={handleSearchEnter}
            className="search-input"
          />
          <button 
            onClick={handleSearch}
            className="search-button"
            disabled={loading}
          >
            검색
          </button>
        </div>
        {total > 0 && (
          <div className="search-results">
            검색 결과: {total}건
          </div>
        )}
      </div>

      <div className="news-list">
        {loading ?
          <div className="loading">뉴스를 불러오는 중...</div>
        : error ?
          <div className="error">{error}</div>
        : news.length === 0 ?
          <div className="no-results">검색 결과가 없습니다.</div>
        : 
          <>
            {news.map(item => (
              <div key={item.id} className="news-item">
                <a 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-content"
                >
                  <h2>{highlightText(item.title)}</h2>
                  <p>{highlightText(item.description)}</p>
                </a>
                <div className="news-meta">
                  <span className="date">{new Date(item.pubDate).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                  <button 
                    className={`like-button ${likes.has(item.id) ? 'liked' : ''}`}
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
                className="load-more-button"
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
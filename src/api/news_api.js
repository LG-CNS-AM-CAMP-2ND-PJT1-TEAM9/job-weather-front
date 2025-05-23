import { API_BASE_URL } from './api';

const NEWS_URL = `${API_BASE_URL}/news`;

// 뉴스 검색
export const fetchNews = async (searchTerm = '') => {
  try {
    const url = searchTerm 
      ? `${NEWS_URL}?search=${encodeURIComponent(searchTerm)}`
      : NEWS_URL;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('뉴스를 불러오는데 실패했습니다.');
    }

    const data = await response.json();
    
    const mappedItems = data.items.map(item => ({
      newsSn: item.newsSn,
      title: item.newsTitle,
      description: item.newsDescription,
      link: item.newsLink,
      pubDate: item.newsDateTime
    }));

    return {
      items: mappedItems,
      total: data.total || 0
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('뉴스를 불러오는데 실패했습니다.');
  }
};

// 좋아요한 뉴스 목록 조회
export const getLikedNews = async () => {
  try {
    const response = await fetch(`${NEWS_URL}/liked`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    return data.map(String);
  } catch (error) {
    console.error('Error fetching liked news:', error);
    throw error;
  }
};

// 뉴스 좋아요 토글
export const toggleLikeNews = async (newsSn) => {
  try {
    const response = await fetch(`${NEWS_URL}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ newsSn: String(newsSn) })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('401');
      }
      throw new Error('찜하기에 실패했습니다.');
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
}; 

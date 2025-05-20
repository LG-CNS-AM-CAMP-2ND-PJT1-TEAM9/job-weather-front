const API_BASE_URL = "http://localhost:8080/news";

// 뉴스 검색
export const fetchNews = async (searchTerm = '') => {
  try {
    const url = searchTerm 
      ? `${API_BASE_URL}?search=${encodeURIComponent(searchTerm)}`
      : API_BASE_URL;

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
      id: item.newsSn,
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

const API_BASE_URL = "http://localhost:8080/news";

// 임시 더미 데이터
const dummyNews = [
  {
    id: "1",
    title: "삼성전자, 반도체 신입사원 채용 시작",
    description: "삼성전자가 반도체 사업부 신입사원 채용을 시작했다. 이번 채용은 반도체 설계, 공정, 장비 등 다양한 분야에서 진행된다.",
    link: "https://news.example.com/1",
    pubDate: "2024-03-20T09:00:00"
  },
  {
    id: "2",
    title: "네이버, AI 연구원 대규모 채용",
    description: "네이버가 AI 연구원을 대규모로 채용한다고 발표했다. 머신러닝, 자연어처리 등 다양한 AI 분야의 전문가를 모집한다.",
    link: "https://news.example.com/2",
    pubDate: "2024-03-19T14:30:00"
  },
  {
    id: "3",
    title: "카카오, 클라우드 엔지니어 채용 확대",
    description: "카카오가 클라우드 인프라 엔지니어 채용을 확대한다고 밝혔다. 클라우드 아키텍처 설계 및 운영 경험이 있는 인재를 우대한다.",
    link: "https://news.example.com/3",
    pubDate: "2024-03-18T11:15:00"
  },
  {
    id: "4",
    title: "LG전자, 모바일 개발자 채용",
    description: "LG전자가 모바일 앱 개발자를 채용한다. Android, iOS 개발 경험이 있는 개발자를 모집한다.",
    link: "https://news.example.com/4",
    pubDate: "2024-03-17T16:45:00"
  },
  {
    id: "5",
    title: "현대자동차, 자율주행 소프트웨어 개발자 채용",
    description: "현대자동차가 자율주행 소프트웨어 개발자를 채용한다. C++ 개발 경험이 있는 인재를 우대한다.",
    link: "https://news.example.com/5",
    pubDate: "2024-03-16T10:20:00"
  },
  {
    id: "6",
    title: "SK하이닉스, 반도체 공정 엔지니어 채용",
    description: "SK하이닉스가 반도체 공정 엔지니어를 채용한다. 반도체 공정 관련 경험이 있는 인재를 모집한다.",
    link: "https://news.example.com/6",
    pubDate: "2024-03-15T13:40:00"
  },
  {
    id: "7",
    title: "쿠팡, 백엔드 개발자 채용",
    description: "쿠팡이 백엔드 개발자를 채용한다. Java, Spring Framework 경험이 있는 개발자를 우대한다.",
    link: "https://news.example.com/7",
    pubDate: "2024-03-14T15:30:00"
  },
  {
    id: "8",
    title: "배달의민족, 프론트엔드 개발자 채용",
    description: "배달의민족이 프론트엔드 개발자를 채용한다. React, TypeScript 경험이 있는 개발자를 모집한다.",
    link: "https://news.example.com/8",
    pubDate: "2024-03-13T09:50:00"
  },
  {
    id: "9",
    title: "토스, 보안 엔지니어 채용",
    description: "토스가 보안 엔지니어를 채용한다. 보안 관련 자격증 보유자를 우대한다.",
    link: "https://news.example.com/9",
    pubDate: "2024-03-12T14:20:00"
  },
  {
    id: "10",
    title: "당근마켓, 데이터 사이언티스트 채용",
    description: "당근마켓이 데이터 사이언티스트를 채용한다. Python, R 등 데이터 분석 도구 사용 경험이 있는 인재를 모집한다.",
    link: "https://news.example.com/10",
    pubDate: "2024-03-11T11:30:00"
  },
  {
    id: "11",
    title: "라인, 게임 서버 개발자 채용",
    description: "라인이 게임 서버 개발자를 채용한다. C++, 게임 서버 개발 경험이 있는 개발자를 우대한다.",
    link: "https://news.example.com/11",
    pubDate: "2024-03-10T16:40:00"
  },
  {
    id: "12",
    title: "우아한형제들, DevOps 엔지니어 채용",
    description: "우아한형제들이 DevOps 엔지니어를 채용한다. AWS, Kubernetes 경험이 있는 인재를 모집한다.",
    link: "https://news.example.com/12",
    pubDate: "2024-03-09T10:15:00"
  },
  {
    id: "13",
    title: "스타트업 A, 풀스택 개발자 채용",
    description: "스타트업 A가 풀스택 개발자를 채용한다. Node.js, React 경험이 있는 개발자를 우대한다.",
    link: "https://news.example.com/13",
    pubDate: "2024-03-08T13:25:00"
  },
  {
    id: "14",
    title: "스타트업 B, AI 연구원 채용",
    description: "스타트업 B가 AI 연구원을 채용한다. 딥러닝, 컴퓨터 비전 경험이 있는 인재를 모집한다.",
    link: "https://news.example.com/14",
    pubDate: "2024-03-07T15:35:00"
  },
  {
    id: "15",
    title: "스타트업 C, 모바일 개발자 채용",
    description: "스타트업 C가 모바일 개발자를 채용한다. Flutter, React Native 경험이 있는 개발자를 우대한다.",
    link: "https://news.example.com/15",
    pubDate: "2024-03-06T09:45:00"
  },
  {
    id: "16",
    title: "스타트업 D, 백엔드 개발자 채용",
    description: "스타트업 D가 백엔드 개발자를 채용한다. Go, Python 경험이 있는 개발자를 모집한다.",
    link: "https://news.example.com/16",
    pubDate: "2024-03-05T14:55:00"
  },
  {
    id: "17",
    title: "스타트업 E, 프론트엔드 개발자 채용",
    description: "스타트업 E가 프론트엔드 개발자를 채용한다. Vue.js, TypeScript 경험이 있는 개발자를 우대한다.",
    link: "https://news.example.com/17",
    pubDate: "2024-03-04T11:05:00"
  },
  {
    id: "18",
    title: "스타트업 F, 데이터 엔지니어 채용",
    description: "스타트업 F가 데이터 엔지니어를 채용한다. Spark, Hadoop 경험이 있는 인재를 모집한다.",
    link: "https://news.example.com/18",
    pubDate: "2024-03-03T16:15:00"
  },
  {
    id: "19",
    title: "스타트업 G, 보안 엔지니어 채용",
    description: "스타트업 G가 보안 엔지니어를 채용한다. 침투 테스트, 보안 감사 경험이 있는 인재를 우대한다.",
    link: "https://news.example.com/19",
    pubDate: "2024-03-02T10:25:00"
  },
  {
    id: "20",
    title: "스타트업 H, 클라우드 엔지니어 채용",
    description: "스타트업 H가 클라우드 엔지니어를 채용한다. AWS, Azure 경험이 있는 인재를 모집한다.",
    link: "https://news.example.com/20",
    pubDate: "2024-03-01T13:35:00"
  },
  {
    id: "21",
    title: "스타트업 I, QA 엔지니어 채용",
    description: "스타트업 I가 QA 엔지니어를 채용한다. 자동화 테스트, 성능 테스트 경험이 있는 인재를 우대한다.",
    link: "https://news.example.com/21",
    pubDate: "2024-02-29T15:45:00"
  }
];

// 네이버 뉴스 검색 API 호출
export const fetchNews = async (page = 1, searchTerm = '') => {
  // 실제 API 호출 대신 더미 데이터 반환
  const itemsPerPage = 20;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // 검색어가 있는 경우 필터링
  const filteredNews = searchTerm
    ? dummyNews.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : dummyNews;

  return {
    items: filteredNews.slice(startIndex, endIndex),
    total: filteredNews.length
  };
}; 

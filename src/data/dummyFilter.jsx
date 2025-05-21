export const dummyLocations = [
    { id: 'loc-all', name: '전체', apiCode: '' },
    { id: 'loc-seoul', name: '서울', apiCode: '101000' },
    { id: 'loc-gyeongi', name: '경기', apiCode: '102000' },
    { id: 'loc-incheon', name: '인천', apiCode: '103000' },
    { id: 'loc-busan', name: '부산', apiCode: '105000' },
    { id: 'loc-daegu', name: '대구', apiCode: '106000' },
    { id: 'loc-daejeon', name: '대전', apiCode: '108000' },
    { id: 'loc-gwangju', name: '광주', apiCode: '109000' },
    { id: 'loc-ulsan', name: '울산', apiCode: '110000' },
    { id: 'loc-jeju', name: '제주', apiCode: '104000' },

    // 시/군/구 단위 예시
    { id: 'loc-gangnam', name: '서울 >\n 강남구', apiCode: '101010' },
    { id: 'loc-haeundae', name: '부산 >\n 해운대구', apiCode: '105010' },
    // 필요시 다른 지역 코드를 찾아서 추가
    // 코드표 링크: http://oapi.saramin.co.kr/guide/code-table2
];

export const dummyExperiences = [
     { id: 'exp-all', name: '전체', apiCode: '' },
    { id: 'exp-new', name: '신입', apiCode: '1' },
    { id: 'exp-career', name: '경력', apiCode: '2' },
    { id: 'exp-none', name: '경력무관', apiCode: '0' },
];

export const dummyEmploymentTypes = [
    { id: 'type-all', name: '전체', apiCode: '' },
    { id: 'type-fulltime', name: '정규직', apiCode: '1' },
    { id: 'type-contract', name: '계약직', apiCode: '2' },
    { id: 'type-intern', name: '인턴', apiCode: '4' },
];
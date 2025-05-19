import React, { useState, useEffect } from "react"; // useEffect 추가 import
import styles from './job_search.module.css';

const JobSearch = () => {
    // 지역 데이터 및 상태
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isLocationFilterOpen, setIsLocationFilterOpen] = useState(false);

    // 경력 데이터 및 상태 추가
    const [experiences, setExperiences] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [isExperienceFilterOpen, setIsExperienceFilterOpen] = useState(false);

    // 근무형태 데이터 및 상태 추가
    const [employmentTypes, setEmploymentTypes] = useState([]);
    const [selectedEmploymentType, setSelectedEmploymentType] = useState(null);
    const [isEmploymentTypeOpen, setIsEmploymentTypeOpen] = useState(false);

    useEffect(() => {

        //여기에 실제 API 호출 로직을 작성
        // 예: fetch('/api/locations').then(res => res.json()).then(data => setLocations(data));

        // 지역 임시 데이터
        const dummyLocations = [
            { id: 'loc-seoul', name: '서울' },
            { id: 'loc-gyeongi', name: '경기' },
            { id: 'loc-incheon', name: '인천' },
            { id: 'loc-jeju', name: '제주' },
        ];
        setLocations(dummyLocations);

        // 경력 임시 데이터
        const dummyExperiences = [
            { id: 'exp-new', name: '신입' },
            { id: 'exp-career', name: '경력' },
            { id: 'exp-none', name: '경력무관' },
        ];
        setExperiences(dummyExperiences);

        // 근무형태 임시 데이터
        const dummyEmploymentTypes = [
            { id: 'type-fulltime', name: '정규직' },
            { id: 'type-contract', name: '계약직' },
            { id: 'type-intern', name: '인턴' },
        ];
        setEmploymentTypes(dummyEmploymentTypes);
    }, []);

    // 필터 클릭 핸들러 함수들
    const handleLocationFilterClick = () => {
        setIsLocationFilterOpen(!isLocationFilterOpen);
        setIsExperienceFilterOpen(false);
        setIsEmploymentTypeOpen(false);
    };

    const handleExperienceFilterClick = () => {
        setIsExperienceFilterOpen(!isExperienceFilterOpen);
        setIsLocationFilterOpen(false);
        setIsEmploymentTypeOpen(false);
    };

    const handleEmploymentTypeClick = () => {
        setIsEmploymentTypeOpen(!isEmploymentTypeOpen);
        setIsLocationFilterOpen(false);
        setIsExperienceFilterOpen(false);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleExperienceChange = (event) => {
        setSelectedExperience(event.target.value);
    };

    const handleEmploymentTypeChange = (event) => {
        setSelectedEmploymentType(event.target.value);
    };

    return (
        <>
            <div className={styles['job-search-bar']}>
                <input type="text" placeholder="검색어를 입력해주세요." />
            </div>

            <div className={styles['job-filters']}>
                <div className={`${styles['job-filter-box']} ${isLocationFilterOpen ? styles.open : ''}`}>
                    <div
                        onClick={handleLocationFilterClick}
                        style={{ cursor: 'pointer', width: '100%', textAlign: 'center' }}
                    >
                        지역별
                    </div>
                    {isLocationFilterOpen && (
                        <div className={styles['location-options']}>
                            {locations.map(location => (
                                <div key={location.id} className={styles['filter-option-item']}>
                                    <input
                                        type="radio"
                                        id={location.id}
                                        name="location"
                                        value={location.name}
                                        checked={selectedLocation === location.name}
                                        onChange={handleLocationChange}
                                    />
                                    <label htmlFor={location.id} className={styles['filter-option-label']}>
                                        {location.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={`${styles['job-filter-box']} ${isExperienceFilterOpen ? styles.open : ''}`}>
                     <div
                        onClick={handleExperienceFilterClick}
                        style={{ cursor: 'pointer', width: '100%', textAlign: 'center' }}
                    >
                        경력별
                    </div>
                    {isExperienceFilterOpen && (
                        <div className={styles['experience-options']}>
                             {experiences.map(experience => (
                                <div key={experience.id} className={styles['filter-option-item']}>
                                    <input
                                        type="radio"
                                        id={experience.id}
                                        name="experience"
                                        value={experience.name}
                                        checked={selectedExperience === experience.name}
                                        onChange={handleExperienceChange}
                                    />
                                    <label htmlFor={experience.id} className={styles['filter-option-label']}>
                                        {experience.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={`${styles['job-filter-box']} ${isEmploymentTypeOpen ? styles.open : ''}`}>
                    <div
                        onClick={handleEmploymentTypeClick}
                        style={{ cursor: 'pointer', width: '100%', textAlign: 'center' }}
                    >
                        근무형태
                    </div>
                     {isEmploymentTypeOpen && (
                        <div className={styles['employment-type-options']}>
                             {employmentTypes.map(type => (
                                <div key={type.id} className={styles['filter-option-item']}>
                                    <input
                                        type="radio"
                                        id={type.id}
                                        name="employmentType"
                                        value={type.name}
                                        checked={selectedEmploymentType === type.name}
                                        onChange={handleEmploymentTypeChange}
                                    />
                                    <label htmlFor={type.id} className={styles['filter-option-label']}>
                                        {type.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles['job-listing']}>
                <div className={styles['job-title']}>앱/웹 서비스기획 PM [신입~3년/제주]</div>
                <div>(주)아이치비엠피</div>
                <div className={styles['job-meta']}>
                    <span className={styles['job-location']}>📍제주전체</span>
                    <span className={styles.separator}>&nbsp;|&nbsp;</span>
                    <span className={styles['job-experience']}>신입/경력</span>
                    <span className={styles.separator}>&nbsp;|&nbsp;</span>
                    <span className={styles['job-education']}>고졸 ↑</span>
                </div>
                <div className={styles.bookmark}>☆</div>
            </div>
        </>
    );
};

export default JobSearch;

/* 

import React, { useState, useEffect } from "react";
import styles from './job_search.module.css';

const JobSearch = () => {
    // ... (기존 상태 및 핸들러들)

    // 채용 공고 목록 상태 추가
    const [jobList, setJobList] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 관리 (선택 사항)
    const [error, setError] = useState(null); // 오류 상태 관리 (선택 사항)


    // 데이터 가져오기 (useEffect 안에서 API 호출 및 파싱)
    useEffect(() => {
        const fetchJobData = async () => {
            try {
                // TODO: 여기에 실제 사람인 API 엔드포인트 URL을 사용합니다.
                // API 키 등 필요한 파라미터를 URL에 포함시키거나 헤더에 설정해야 합니다.
                const response = await fetch('YOUR_SARAMIN_API_ENDPOINT');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const xmlText = await response.text(); // 응답을 텍스트로 받습니다.

                // XML 파싱 (브라우저 내장 DOMParser 사용 예시)
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, "application/xml");

                // 파싱된 XML에서 <job> 요소 목록을 가져옵니다.
                const jobsXml = xmlDoc.querySelectorAll('job');

                // 각 <job> 요소에서 필요한 정보를 추출하여 JavaScript 객체 배열로 만듭니다.
                const parsedJobs = Array.from(jobsXml).map(jobElement => {
                    // XML 구조에 따라 각 요소의 텍스트 내용을 추출합니다.
                    // querySelector 사용 시 요소가 없을 수 있으므로 안전하게 접근합니다.
                    const titleElement = jobElement.querySelector('position > title');
                    const companyNameElement = jobElement.querySelector('company > name');
                    const locationElement = jobElement.querySelector('position > location');
                    const experienceElement = jobElement.querySelector('position > experience-level');
                    const educationElement = jobElement.querySelector('position > required-education-level');
                    const urlElement = jobElement.querySelector('url');

                    return {
                        id: jobElement.querySelector('id')?.textContent || 'N/A',
                        title: titleElement?.textContent.trim() || '제목 정보 없음',
                        companyName: companyNameElement?.textContent.trim() || '회사 정보 없음',
                        location: locationElement?.textContent.trim() || '지역 정보 없음',
                        experience: experienceElement?.textContent.trim() || '경력 정보 없음',
                        education: educationElement?.textContent.trim() || '학력 정보 없음',
                        url: urlElement?.textContent.trim() || '#',
                        // 필요한 다른 정보들도 추출 가능
                    };
                });

                setJobList(parsedJobs); // 파싱된 데이터로 상태 업데이트
                setLoading(false); // 로딩 완료
            } catch (error) {
                console.error("채용 정보를 가져오는 중 오류 발생:", error);
                setError(error); // 오류 상태 업데이트
                setLoading(false); // 로딩 완료 (오류 발생 시)
            }
        };

        fetchJobData(); // useEffect 실행 시 데이터 가져오는 함수 호출

    }, []); // 빈 의존성 배열: 컴포넌트 마운트 시 한 번만 실행

    // ... (필터 상태 및 핸들러들)

    return (
        <>
             <div className={styles['job-search-bar']}>
                <input type="text" placeholder="2025년 상반기 공채 시작!" />
            </div>

            <div className={styles['job-filters']}>
                <div className={`${styles['job-filter-box']} ${isLocationFilterOpen ? styles.open : ''}`}>
                    <div
                        onClick={handleLocationFilterClick}
                        style={{ cursor: 'pointer', width: '100%', textAlign: 'center' }}
                    >
                        지역별
                    </div>
                    {isLocationFilterOpen && (
                        <div className={styles['location-options']}>
                            {locations.map(location => (
                                <div key={location.id} className={styles['filter-option-item']}>
                                    <input
                                        type="radio"
                                        id={location.id}
                                        name="location"
                                        value={location.name}
                                        checked={selectedLocation === location.name}
                                        onChange={handleLocationChange}
                                    />
                                    <label htmlFor={location.id} className={styles['filter-option-label']}>
                                        {location.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className={`${styles['job-filter-box']} ${isExperienceFilterOpen ? styles.open : ''}`}>
                     <div
                        onClick={handleExperienceFilterClick}
                        style={{ cursor: 'pointer', width: '100%', textAlign: 'center' }}
                    >
                        경력별
                    </div>
                    {isExperienceFilterOpen && (
                        <div className={styles['experience-options']}>
                             {experiences.map(experience => (
                                <div key={experience.id} className={styles['filter-option-item']}>
                                    <input
                                        type="radio"
                                        id={experience.id}
                                        name="experience"
                                        value={experience.name}
                                        checked={selectedExperience === experience.name}
                                        onChange={handleExperienceChange}
                                    />
                                    <label htmlFor={experience.id} className={styles['filter-option-label']}>
                                        {experience.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className={`${styles['job-filter-box']} ${isEmploymentTypeOpen ? styles.open : ''}`}>
                    <div
                        onClick={handleEmploymentTypeClick}
                        style={{ cursor: 'pointer', width: '100%', textAlign: 'center' }}
                    >
                        근무형태
                    </div>
                     {isEmploymentTypeOpen && (
                        <div className={styles['employment-type-options']}>
                             {employmentTypes.map(type => (
                                <div key={type.id} className={styles['filter-option-item']}>
                                    <input
                                        type="radio"
                                        id={type.id}
                                        name="employmentType"
                                        value={type.name}
                                        checked={selectedEmploymentType === type.name}
                                        onChange={handleEmploymentTypeChange}
                                    />
                                    <label htmlFor={type.id} className={styles['filter-option-label']}>
                                        {type.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {loading && <p>채용 정보를 불러오는 중...</p>}
            {error && <p>채용 정보를 불러오는데 실패했습니다: {error.message}</p>}
            {!loading && !error && jobList.length === 0 && <p>검색 결과가 없습니다.</p>}

            
            {!loading && !error && jobList.map(job => (
                 <div key={job.id} className={styles['job-listing']}>
                    <div className={styles['job-title']}>{job.title}</div>
                    <div>{job.companyName}</div>
                    <div className={styles['job-meta']}>
                        <span className={styles['job-location']}>📍{job.location}</span>
                        <span className={styles.separator}>&nbsp;|&nbsp;</span>
                        <span className={styles['job-experience']}>{job.experience}</span>
                        <span className={styles.separator}>&nbsp;|&nbsp;</span>
                        <span className={styles['job-education']}>{job.education}</span>
                    </div>
                    <div className={styles.bookmark}>☆</div>
                </div>
            ))}

        </>
    );
};

export default JobSearch;


*/
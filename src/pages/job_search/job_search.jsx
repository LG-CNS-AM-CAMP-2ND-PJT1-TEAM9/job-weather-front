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

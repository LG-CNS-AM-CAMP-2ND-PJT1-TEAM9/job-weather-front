import React, { useState, useEffect } from "react";
import styles from './job_search.module.css';
import dummyJobs from '../../data/dummyJobs.jsx';
import { dummyLocations, dummyExperiences, dummyEmploymentTypes } from '../../data/dummyFilter.jsx';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    useEffect(() => {
        console.log("임시 useAuth: 초기 인증 상태 확인 로직 필요");

        //test용 userSn값을 받아오면 그 값을 설정하기
        setTimeout(() => {
            console.log("임시 useAuth: 테스트 사용자 설정");
            setUser({ userSn: 1, userNickname: "TestUser" });
            setIsLoadingAuth(false);
        }, 500);
    }, []);

    return {
        user,
        isLoadingAuth,
    };
};


const JobSearch = () => {
    const { user, isLoadingAuth } = useAuth();

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isLocationFilterOpen, setIsLocationFilterOpen] = useState(false);

    const [experiences, setExperiences] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [isExperienceFilterOpen, setIsExperienceFilterOpen] = useState(false);

    const [employmentTypes, setEmploymentTypes] = useState([]);
    const [selectedEmploymentType, setSelectedEmploymentType] = useState(null);
    const [isEmploymentTypeOpen, setIsEmploymentTypeOpen] = useState(false);

    const [jobList, setJobList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        console.log("필터 데이터 가져오는 중...");
        setLocations(dummyLocations);
        setSelectedLocation('전체');

        setExperiences(dummyExperiences);
        setSelectedExperience('전체');

        setEmploymentTypes(dummyEmploymentTypes);
        setSelectedEmploymentType('전체');
        console.log("필터 데이터 적용 완료.");
    }, []);


    const applyDummyFilters = (jobs, term, location, experience, employmentType) => {
        console.log(`더미필터 적용됨: term=${term}, loc=${location}, exp=${experience}, type=${employmentType}`);
        return jobs.filter(job => {
            const termMatch = !term ||
                (job.title && job.title.toLowerCase().includes(term.toLowerCase())) ||
                (job.companyName && job.companyName.toLowerCase().includes(term.toLowerCase()));

            const locationMatch = location === '전체' || (job.location && job.location.includes(location));
            const experienceMatch = experience === '전체' || (job.experience && job.experience.includes(experience));
            const employmentTypeMatch = employmentType === '전체' || (job.title && job.title.includes(employmentType));

            return termMatch && locationMatch && experienceMatch && employmentTypeMatch;
        });
    };


    useEffect(() => {
        if (isLoadingAuth) {
            console.log("사용자 인증 정보 로딩 중... API 호출 대기.");
            setLoading(true);
            setJobList([]);
            setError(null);
            return;
        }

        const fetchJobAndBookmarkData = async () => {
            setLoading(true);
            setError(null);
            setJobList([]);


            const currentUserSn = user?.userSn;

            let bookmarkedIds = [];

            if (currentUserSn) {
                try {
                    const bookmarkListApiUrl = `/api/bookmarks/user/${currentUserSn}`;

                    console.log(`현재 사용자 ${currentUserSn} 의 북마크를 가져오는 중:`, bookmarkListApiUrl);

                    const bookmarkResponse = await fetch(bookmarkListApiUrl, { credentials: 'include' });

                    if (!bookmarkResponse.ok) {
                        console.error(`북마크 http오류 발생 : ${bookmarkResponse.status}`);
                        bookmarkedIds = [];
                    } else {
                        const bookmarkData = await bookmarkResponse.json();
                        bookmarkedIds = Array.isArray(bookmarkData) ? bookmarkData.map(String) : [];
                        console.log(`${bookmarkedIds.length}개 북마크 작업 ID 호출 완료.`);
                    }

                } catch (bookmarkError) {
                    console.error("북마크 로딩 실패 : ", bookmarkError);
                    bookmarkedIds = [];
                }
            } else {
                console.log("사용자가 로그인하지 않았습니다. 즐겨찾기 목록을 가져오지 않습니다.");
            }


            try {
                const locationApiCode = locations.find(loc => loc.name === selectedLocation)?.apiCode || '';
                const experienceApiCode = experiences.find(exp => exp.name === selectedExperience)?.apiCode || '';
                const employmentTypeApiCode = employmentTypes.find(type => type.name === selectedEmploymentType)?.apiCode || '';

                const baseSaraminApiUrl = '여기에 실제 사람인 API 기본 URL';

                const apiUrl = baseSaraminApiUrl +
                    `?keywords=${encodeURIComponent(searchTerm || '')}` + //검색어
                    (locationApiCode ? `&loc_cd=${encodeURIComponent(locationApiCode)}` : '') + //지역
                    (experienceApiCode ? `&exp_cd=${encodeURIComponent(experienceApiCode)}` : '') + //경력
                    (employmentTypeApiCode ? `&job_type=${encodeURIComponent(employmentTypeApiCode)}` : ''); //근무형태

                console.log("작업 데이터 가져오는 곳 : ", apiUrl);

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`작업 중 http 오류 발생: ${apiUrl} 에서 ${response.status} 발생 `);
                }

                const xmlText = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, "application/xml");
                const jobsXml = xmlDoc.querySelectorAll('job');

                const parsedJobs = Array.from(jobsXml).map(jobElement => {
                    const idElement = jobElement.querySelector('id');
                    const titleElement = jobElement.querySelector('position > title');
                    const companyNameElement = jobElement.querySelector('company > name');
                    const locationElement = jobElement.querySelector('position > location');
                    const experienceElement = jobElement.querySelector('position > experience-level');
                    const educationElement = jobElement.querySelector('position > required-education-level');
                    const urlElement = jobElement.querySelector('url');

                    const id = idElement?.textContent?.trim() || `job-${Math.random().toString(36).substring(7)}`;
                    const title = titleElement?.textContent?.trim() || '제목 정보 없음';
                    const companyName = companyNameElement?.textContent?.trim() || '회사 정보 없음';
                    const location = locationElement?.textContent?.trim() || '지역 정보 없음';
                    const experience = experienceElement?.textContent?.trim() || '경력 정보 없음';
                    const education = educationElement?.textContent?.trim() || '학력 정보 없음';
                    const url = urlElement?.textContent?.trim() || '#';


                    const isBookmarked = bookmarkedIds.includes(id);

                    return {
                        id,
                        title,
                        companyName,
                        location,
                        experience,
                        education,
                        url,
                        isBookmarked,
                    };
                });

                console.log("API직업 파싱 완료. 파싱된 직업 수 :", parsedJobs.length);

                if (parsedJobs.length === 0) {
                    console.log("API에서 작업 0개를 반환했으므로 더미 데이터에서 필터를 적용합니다.");
                    const filteredDummyJobs = applyDummyFilters(dummyJobs, searchTerm, selectedLocation, selectedExperience, selectedEmploymentType);
                    const filteredAndBookmarkedDummyJobs = filteredDummyJobs.map(job => ({
                        ...job,
                        isBookmarked: bookmarkedIds.includes(String(job.id)),
                    }));

                    setJobList(filteredAndBookmarkedDummyJobs);
                    setError(null);
                } else {
                    setJobList(parsedJobs);
                    setError(null);
                }


            } catch (jobError) {
                console.error("기본 직업 가져오기 파싱 실패:", jobError);
                console.log("API 작업 데이터를 사용할 수 없으므로 더미 데이터 필터를 적용");

                const filteredDummyJobs = applyDummyFilters(dummyJobs, searchTerm, selectedLocation, selectedExperience, selectedEmploymentType);
                const filteredAndBookmarkedDummyJobs = filteredDummyJobs.map(job => ({
                    ...job,
                    isBookmarked: bookmarkedIds.includes(String(job.id)),
                }));

                setJobList(filteredAndBookmarkedDummyJobs);
                // setError(null);
                setError(jobError);
            } finally {
                setLoading(false);
                console.log("가져오기 성공. 로딩 false 설정");
            }
        };

        fetchJobAndBookmarkData();


    }, [
        user,
        searchTerm,
        selectedLocation,
        selectedExperience,
        selectedEmploymentType,
        locations,
        experiences,
        employmentTypes
    ]);


    const toggleFilter = (filterName) => {
        setIsLocationFilterOpen(filterName === 'location' ? !isLocationFilterOpen : false);
        setIsExperienceFilterOpen(filterName === 'experience' ? !isExperienceFilterOpen : false);
        setIsEmploymentTypeOpen(filterName === 'employmentType' ? !isEmploymentTypeOpen : false);
    };

    const handleLocationFilterClick = () => toggleFilter('location');
    const handleExperienceFilterClick = () => toggleFilter('experience');
    const handleEmploymentTypeClick = () => toggleFilter('employmentType');



    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
        //setIsLocationFilterOpen(false);
    };

    const handleExperienceChange = (event) => {
        setSelectedExperience(event.target.value);
        //setIsExperienceFilterOpen(false);
    };

    const handleEmploymentTypeChange = (event) => {
        setSelectedEmploymentType(event.target.value);
        //setIsEmploymentTypeOpen(false);
    };


    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const handleBookmarkClick = async (jobId, isCurrentlyBookmarked) => {
        const currentUserSn = user?.userSn;
        if (!currentUserSn) {
            alert("로그인이 필요한 기능입니다.");
            return;
        }

        if (isCurrentlyBookmarked) {
            console.log(`북마크 작업이 건너뛰어졌습니다. ${jobId}은 이미 북마크되었습니다.`);
            return;
        }


        const isValidSaraminId = /^\d+$/.test(jobId);

        if (!isValidSaraminId) {
            console.warn(`북마크 작업이 건너뛰어졌습니다. 백엔드에 대한 작업 ID 형식이 잘못되었습니다 :  ${jobId}`);
            alert("유효하지 않거나 임시 데이터는 즐겨찾기할 수 없습니다.");
            return;
        }



        setJobList(prevJobList =>
            prevJobList.map(job =>
                job.id === jobId
                    ? { ...job, isBookmarked: true }
                    : job
            )
        );

        const bookmarkApiBaseUrl = '/api/bookmarks';


        try {
            console.log(`Attempting to add bookmark for job ${jobId} by user ${currentUserSn}`);
            const apiEndpoint = bookmarkApiBaseUrl;
            const requestBody = JSON.stringify({
                saraminJobId: jobId,
            });


            const fetchOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
                credentials: 'include',
            };

            const response = await fetch(apiEndpoint, fetchOptions);


            if (!response.ok) {
                const errorDetail = await response.text();
                console.error(`북마크 추가 API 호출 실패: ${response.status}`, errorDetail);

                setJobList(prevJobList =>
                    prevJobList.map(job =>
                        job.id === jobId
                            ? { ...job, isBookmarked: false }
                            : job
                    )
                );
                alert(`북마크 추가 실패: ${response.status} ${errorDetail || response.statusText}`);

            } else {
                console.log(`북마크 추가 API 호출 성공: JobId=${jobId}`);
            }

        } catch (bookmarkApiError) {
            console.error("북마크 API 호출 중 예외 발생:", bookmarkApiError);
            setJobList(prevJobList =>
                prevJobList.map(job =>
                    job.id === jobId
                        ? { ...job, isBookmarked: false }
                        : job
                )
            );
            alert(`북마크 업데이트 중 오류 발생: ${bookmarkApiError.message}`);
        }
    };


    return (
        <>
            <div className={styles['job-search-bar']}>
                <input
                    type="text"
                    placeholder="검색어를 입력해주세요."
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                // onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }} // Enter 키 검색
                />
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


            {(isLoadingAuth || loading) && <p>정보를 불러오는 중...</p>}
            {!isLoadingAuth && !loading && error && jobList.length === 0 && <p>데이터를 불러오는데 실패했습니다: {error.message}</p>}
            {!isLoadingAuth && !loading && !error && jobList.length === 0 && <p>검색 결과가 없습니다.</p>}



            {!isLoadingAuth && !loading && jobList.length > 0 && jobList.map(job => (
                <div key={job.id} className={styles['job-listing']}>
                    <div className={styles['job-title']}>{job.title}</div>
                    <div>{job.companyName}</div>
                    <div className={styles['job-meta']}>
                        {job.location && <span className={styles['job-location']}>📍{job.location}</span>}
                        {job.location && (job.experience || job.education) && <span className={styles.separator}>&nbsp;|&nbsp;</span>}
                        {job.experience && <span className={styles['job-experience']}>{job.experience}</span>}
                        {job.experience && job.education && <span className={styles.separator}>&nbsp;|&nbsp;</span>}
                        {job.education && <span className={styles['job-education']}>학력: {job.education}</span>}
                    </div>
                    <div
                        className={styles.bookmark}
                        onClick={() => handleBookmarkClick(job.id, job.isBookmarked)}
                        style={{ cursor: 'pointer' }}
                    >
                        {job.isBookmarked ? '★' : '☆'}
                    </div>
                    {job.url && job.url !== '#' && (
                        <a href={job.url} target="_blank" rel="noopener noreferrer" className={styles['job-link']}>자세히 보기</a>
                    )}
                </div>
            ))}
        </>
    );
};
export default JobSearch;

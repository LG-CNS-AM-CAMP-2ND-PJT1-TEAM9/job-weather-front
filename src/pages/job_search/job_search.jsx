import React, { useState, useEffect } from "react";
import styles from "./job_search.module.css";
import dummyJobs from "../../data/dummyJobs.jsx";
import {
  dummyLocations,
  dummyExperiences,
  dummyEmploymentTypes,
} from "../../data/dummyFilter.jsx";

const JobSearch = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLocationFilterOpen, setIsLocationFilterOpen] = useState(false);

  const [experiences, setExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isExperienceFilterOpen, setIsExperienceFilterOpen] = useState(false);

  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState(null);
  const [isEmploymentTypeOpen, setIsEmploymentTypeOpen] = useState(false);

  // 채용 공고 목록 상태 추가
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //검색
  const [searchTerm, setSearchTerm] = useState("");

  // 더미 필터 데이터 가져오기
  useEffect(() => {
    setLocations(dummyLocations);
    setSelectedLocation("전체");

    setExperiences(dummyExperiences);
    setSelectedExperience("전체");

    setEmploymentTypes(dummyEmploymentTypes);
    setSelectedEmploymentType("전체");
  }, []);

  useEffect(() => {
    const fetchJobData = async () => {
      setLoading(true);
      setError(null);
      setJobList([]);

      try {
        const locationApiCode =
          locations.find((loc) => loc.name === selectedLocation)?.apiCode || "";
        const experienceApiCode =
          experiences.find((exp) => exp.name === selectedExperience)?.apiCode ||
          "";
        const employmentTypeApiCode =
          employmentTypes.find((type) => type.name === selectedEmploymentType)
            ?.apiCode || "";

        const baseApiUrl = "여기에 실제 사람인 API";

        const apiUrl =
          baseApiUrl +
          `?keywords=${encodeURIComponent(searchTerm || "")}` +
          (locationApiCode
            ? `&loc_cd=${encodeURIComponent(locationApiCode)}`
            : "") +
          (experienceApiCode
            ? `&exp_cd=${encodeURIComponent(experienceApiCode)}`
            : "") +
          (employmentTypeApiCode
            ? `&job_type=${encodeURIComponent(employmentTypeApiCode)}`
            : "");

        console.log("다음에서 데이터를 가져오는 중 :", apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} from ${apiUrl}`
          );
        }

        const xmlText = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");

        //const errorNode = xmlDoc.querySelector('parsererror');
        // if (errorNode) {
        //     console.error('XML 파싱 오류:', errorNode.textContent);
        //     setError(new Error('XML 데이터 파싱 중 오류 발생'));
        //     setLoading(false);
        //     return;
        // }

        const jobsXml = xmlDoc.querySelectorAll("job");

        const parsedJobs = Array.from(jobsXml).map((jobElement) => {
          const titleElement = jobElement.querySelector("position > title");
          const companyNameElement = jobElement.querySelector("company > name");
          const locationElement = jobElement.querySelector(
            "position > location"
          );
          const experienceElement = jobElement.querySelector(
            "position > experience-level"
          );
          const educationElement = jobElement.querySelector(
            "position > required-education-level"
          );
          const urlElement = jobElement.querySelector("url");

          const id = idElement?.textContent?.trim() || `job-${Math.random()}`; // API ID가 없으면 임의의 ID 생성
          const title = titleElement?.textContent?.trim() || "제목 정보 없음";
          const companyName =
            companyNameElement?.textContent?.trim() || "회사 정보 없음";
          const location =
            locationElement?.textContent?.trim() || "지역 정보 없음";
          const experience =
            experienceElement?.textContent?.trim() || "경력 정보 없음";
          const education =
            educationElement?.textContent?.trim() || "학력 정보 없음";
          const url = urlElement?.textContent?.trim() || "#";

          return {
            id: id,
            title: title,
            companyName: companyName,
            location: location,
            experience: experience,
            education: education,
            url: url,

            // 필요하면 salary, industry 등 다른 정보들도 추출 가능
          };
        });
        console.log(
          "API데이터를 성공적으로 가져왔습니다. 작업 수 : ",
          parsedJobs.length
        );
        if (parsedJobs.length === 0) {
          console.log(
            "API에서 불러오는 직업 정보가 0개이므로 더미데이터를 불러옵니다.."
          );
          setJobList(dummyJobs);
          setError(new Error("API 결과가 없습니다. 임시 데이터를 표시합니다."));
          setError(null);
        } else {
          setJobList(parsedJobs);
          setError(null);
        }
      } catch (error) {
        console.error("채용 정보를 가져오는 중 오류 발생:", error);
        console.log("더미데이터로 정보 채우는 중");
        setJobList(dummyJobs);
        setError(error);
        //setError(null);
      } finally {
        setLoading(false);
        console.log("가져오기 완료. 로딩 false로 변경.");
      }
    };

    fetchJobData();
  }, [
    searchTerm,
    selectedLocation,
    selectedExperience,
    selectedEmploymentType,
  ]);

  const toggleFilter = (filterName) => {
    setIsLocationFilterOpen(
      filterName === "location" ? !isLocationFilterOpen : false
    );
    setIsExperienceFilterOpen(
      filterName === "experience" ? !isExperienceFilterOpen : false
    );
    setIsEmploymentTypeOpen(
      filterName === "employmentType" ? !isEmploymentTypeOpen : false
    );
  };

  const handleLocationFilterClick = () => toggleFilter("location");
  const handleExperienceFilterClick = () => toggleFilter("experience");
  const handleEmploymentTypeClick = () => toggleFilter("employmentType");

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

  //검색
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className={styles["job-container"]}>
        <div className={styles["job-search-bar"]}>
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchTerm}
            onChange={handleSearchInputChange}
            // onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }} // Enter 키 검색
          />
        </div>

        <div className={styles["job-filters"]}>
          <div
            className={`${styles["job-filter-box"]} ${
              isLocationFilterOpen ? styles.open : ""
            }`}
          >
            <div
              onClick={handleLocationFilterClick}
              style={{ cursor: "pointer", width: "100%", textAlign: "center" }}
            >
              지역별
            </div>
            {isLocationFilterOpen && (
              <div className={styles["location-options"]}>
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className={styles["filter-option-item"]}
                  >
                    <input
                      type="radio"
                      id={location.id}
                      name="location"
                      value={location.name}
                      checked={selectedLocation === location.name}
                      onChange={handleLocationChange}
                    />
                    <label
                      htmlFor={location.id}
                      className={styles["filter-option-label"]}
                    >
                      {location.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className={`${styles["job-filter-box"]} ${
              isExperienceFilterOpen ? styles.open : ""
            }`}
          >
            <div
              onClick={handleExperienceFilterClick}
              style={{ cursor: "pointer", width: "100%", textAlign: "center" }}
            >
              경력별
            </div>
            {isExperienceFilterOpen && (
              <div className={styles["experience-options"]}>
                {experiences.map((experience) => (
                  <div
                    key={experience.id}
                    className={styles["filter-option-item"]}
                  >
                    <input
                      type="radio"
                      id={experience.id}
                      name="experience"
                      value={experience.name}
                      checked={selectedExperience === experience.name}
                      onChange={handleExperienceChange}
                    />
                    <label
                      htmlFor={experience.id}
                      className={styles["filter-option-label"]}
                    >
                      {experience.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className={`${styles["job-filter-box"]} ${
              isEmploymentTypeOpen ? styles.open : ""
            }`}
          >
            <div
              onClick={handleEmploymentTypeClick}
              style={{ cursor: "pointer", width: "100%", textAlign: "center" }}
            >
              근무형태
            </div>
            {isEmploymentTypeOpen && (
              <div className={styles["employment-type-options"]}>
                {employmentTypes.map((type) => (
                  <div key={type.id} className={styles["filter-option-item"]}>
                    <input
                      type="radio"
                      id={type.id}
                      name="employmentType"
                      value={type.name}
                      checked={selectedEmploymentType === type.name}
                      onChange={handleEmploymentTypeChange}
                    />
                    <label
                      htmlFor={type.id}
                      className={styles["filter-option-label"]}
                    >
                      {type.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles["job-list"]}>
          {loading && (
            <div className={styles["loading"]}>
              <p>채용 정보를 불러오는 중...</p>
            </div>
          )}
          {!loading && error && jobList.length > 0 && (
            <div className={styles["error"]}>
              <p>주의: API 오류로 인해 최신 정보가 아닐 수 있습니다.</p>
            </div>
          )}
          {!loading && !error && jobList.length === 0 && (
            <div className={styles["no-results"]}>
              <p>검색 결과가 없습니다.</p>
            </div>
          )}
          <>
            {!loading &&
              jobList.length > 0 &&
              jobList.map((job) => (
                <div key={job.id} className={styles["job-item"]}>
                  <div className={styles["job-company"]}>{job.companyName}</div>
                  <div className={styles["job-title"]}>{job.title}</div>
                  <div className={styles["job-meta"]}>
                    <div className={styles["job-content"]}>
                      {job.location && (
                        <span className={styles["job-location"]}>
                          📍{job.location}
                        </span>
                      )}
                      {job.location && (job.experience || job.education) && (
                        <span className={styles.separator}>&nbsp;|&nbsp;</span>
                      )}
                      {job.experience && (
                        <span className={styles["job-experience"]}>
                          {job.experience}
                        </span>
                      )}
                      {job.experience && job.education && (
                        <span className={styles["job-separator"]}>
                          &nbsp;|&nbsp;
                        </span>
                      )}
                      {job.education && (
                        <span className={styles["job-education"]}>
                          {job.education}
                        </span>
                      )}
                    </div>
                    <div className={styles["job-bookmark"]}>☆</div>
                  </div>
                  {job.url && job.url !== "#" && (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles["job-link"]}
                    >
                      자세히 보기
                    </a>
                  )}
                </div>
              ))}
          </>
        </div>
      </div>
    </>
  );
};
export default JobSearch;

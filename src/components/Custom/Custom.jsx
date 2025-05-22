import { useEffect, useState } from "react";
import { fetchItems, printCategory, saveCustom } from "../../api/mypage_api";
import styles from "./Custom.module.css";

const Custom = () => {
  const [activeTab, setActiveTab] = useState("companyType");
  const [allOptions, setAllOptions] = useState([]);
  const [selectItems, setSelectItem] = useState([]);

  useEffect(() => {
    // 최초 실행 함수
    const loadFirst = async () => {
      const [customIds, companyType, positions, locations] = await Promise.all([
        fetchItems(),
        printCategory("companyType"),
        printCategory("position"),
        printCategory("location"),
      ]);

      setAllOptions({
        companyType: companyType,
        position: positions,
        location: locations,
      });

      // 선택값 없으면 각 카테고리 첫 번째 아이템 id로 초기화
      const defaultSelect = {
        companyType: getValidId(
          "companyType",
          customIds.companyType,
          companyType
        ),
        position: getValidId("position", customIds.position, positions),
        location: getValidId("location", customIds.location, locations),
      };

      setSelectItem(defaultSelect);
    };

    loadFirst();
  }, []);

  useEffect(() => {
    console.log("activeTap", activeTab);
    console.log("currentSelectOption", selectItems[activeTab]);
  }, [allOptions, activeTab]);

  useEffect(() => {
    console.log("selectedItem", selectItems);
  }, [selectItems]);

  const getValidId = (tab, idFromBackend, options) => {
    const optionIds = options.map((item) => getItemId(item, tab));
    return optionIds.includes(idFromBackend)
      ? idFromBackend
      : optionIds[0] || null;
  };

  const getItemId = (item, tab) => {
    switch (tab) {
      case "companyType":
        return item.typeId;
      case "position":
        return item.positionId;
      case "location":
        return item.locationId;
      default:
        return "";
    }
  };

  const getItemLabel = (item, tab) => {
    switch (tab) {
      case "companyType":
        return item.typeName;
      case "position":
        return item.positionName;
      case "location":
        return item.locationName;
      default:
        return "";
    }
  };

  const handleRadioChange = (tab, id) => {
    setSelectItem((prev) => ({
      ...prev,
      [tab]: id,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await saveCustom(selectItems);
      if (res.success) {
        alert("변경사항이 저장되었습니다.");

        const updated = await fetchItems();

        const newSettings = {
          companyType: getValidId(
            "companyType",
            updated.companyType,
            allOptions.companyType
          ),
          position: getValidId(
            "position",
            updated.position,
            allOptions.position
          ),
          location: getValidId(
            "location",
            updated.location,
            allOptions.location
          ),
        };

        setSelectItem(newSettings);
      } else {
        alert("변경사항 저장에 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className={styles.customContainer}>
      <div className={styles.categoryTabs}>
        <button
          className={`${styles.categoryTab} ${
            activeTab === "companyType" ? styles.categoryTabActive : ""
          }`}
          onClick={() => {
            setActiveTab("companyType");
          }}
        >
          기업분류
        </button>
        <button
          className={`${styles.categoryTab} ${
            activeTab === "position" ? styles.categoryTabActive : ""
          }`}
          onClick={() => {
            setActiveTab("position");
          }}
        >
          포지션
        </button>
        <button
          className={`${styles.categoryTab} ${
            activeTab === "location" ? styles.categoryTabActive : ""
          }`}
          onClick={() => {
            setActiveTab("location");
          }}
        >
          지역
        </button>
      </div>
      <div className={styles.optionsPanel}>
        <div className={styles.checkboxList}>
          {allOptions[activeTab]?.map((item) => {
            const itemId = getItemId(item, activeTab);
            return (
              <label key={itemId}>
                <input
                  type="radio"
                  name={activeTab}
                  value={itemId}
                  checked={selectItems[activeTab] === itemId}
                  onChange={() => handleRadioChange(activeTab, itemId)}
                />
                <span>{getItemLabel(item, activeTab)}</span>
              </label>
            );
          })}
        </div>
        <button className={styles.submitButton} onClick={handleSubmit}>
          변경하기
        </button>
      </div>
    </div>
  );
};

export default Custom;

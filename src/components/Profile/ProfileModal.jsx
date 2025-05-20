import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { printProfile } from "../../api/mypage_api";
import styles from "./Profile.module.css";

const ProfileModal = ({ onClose, onSubmit }) => {
  const [pwconfirm, setPwconfirm] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwConfirmError, setPwConfirmError] = useState("");
  const [profile, setProfile] = useState({
    userName: "",
    email: "",
    userNickname: "",
    userPhone: "",
    userPw: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await printProfile();
      setProfile(data);
    };
    fetchData();
  }, []);

  const checkPW = (pw) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    return regex.test(pw);
  };

  const checkPWConfirm = (e) => {
    const value = e.target.value;
    setPwconfirm(value);
    if (value == "") {
      setPwConfirmError("비밀번호 확인을 입력하세요");
    } else if (profile.userPw != value) {
      setPwConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setPwConfirmError("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name == "userPw") {
      if (!checkPW(value)) {
        setPwError(
          "비밀번호는 영문, 숫자, 특수기호를 포함한 8~16자여야 합니다"
        );
      } else {
        setPwError("");
      }

      if (pwconfirm !== "" && value !== pwconfirm) {
        setPwConfirmError("비밀번호가 일치하지 않습니다");
      } else {
        setPwConfirmError("");
      }
    }
  };

  return ReactDOM.createPortal(
    <div>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>회원 정보 수정</h2>
          <form className={styles.modalForm} onSubmit={onSubmit}>
            <div className={styles.formRow}>
              <label>이름</label>
              <input
                type="text"
                name="userName"
                value={profile.userName}
                readOnly
              />
            </div>
            <div className={styles.formRow}>
              <label>이메일</label>
              <input type="text" name="email" value={profile.email} readOnly />
            </div>
            <div className={styles.formRow}>
              <label>닉네임</label>
              <input
                type="text"
                name="userNickname"
                value={profile.userNickname}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formRow}>
              <label>전화번호</label>
              <input
                type="text"
                name="userPhone"
                value={profile.userPhone}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formRow}>
              <label>비밀번호</label>
              <input
                type="password"
                name="userPw"
                value={profile.userPw}
                onChange={handleChange}
              />
              <div className={styles.errorBox}>
                {pwError && <p className={styles.errorText}>{pwError}</p>}
              </div>
            </div>
            <div className={styles.formRow}>
              <label>비밀번호 확인</label>
              <div className={styles.inputConfirm}>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={checkPWConfirm}
                />
                <div className={styles.errorBox}>
                  {pwConfirmError && (
                    <p className={styles.errorText}>{pwConfirmError}</p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.modalButtons}>
              <button type="button" onClick={onClose}>
                취소
              </button>
              <button
                type="submit"
                disabled={
                  pwError !== "" ||
                  profile.userPw === "" ||
                  profile.userNickname === "" ||
                  profile.userPhone === ""
                }
              >
                변경하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProfileModal;

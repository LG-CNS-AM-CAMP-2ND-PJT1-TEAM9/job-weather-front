import { useEffect, useState } from "react";
import { checkPw, printProfile } from "../../api/mypage_api";
import styles from "./Profile.module.css";

const ProfileModal = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [pw, setPw] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [pwconfirm, setPwconfirm] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwConfirmError, setPwConfirmError] = useState("");
  const [profile, setProfile] = useState({
    userName: "",
    email: "",
    userNickname: "",
    userPhone: "",
    userPw: "",
    userSocialId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await printProfile();
      setProfile(data);

      if (data.userSocialId == null) {
        setStep(1);
        console.log("setting step to", 1); // 상태 설정하려는 값을 출력
      } else {
        setStep(2);
      }
    };
    fetchData();
  }, []);

  // 비밀번호 확인
  const handlecheckPw = async () => {
    const res = await checkPw(pw);

    if (res.success) {
      setStep(2);
    } else {
      alert("비밀번호가 일치하지 않습니다!");
    }
  };

  const checkNickname = (nickname) => {
    if (!nickname) return false;
    return nickname.trim().length >= 2;
  };
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

    if (name == "userNickname") {
      if (!checkNickname(value)) {
        setNicknameError("닉네임은 두 글자 이상이어야 합니다");
      } else {
        setNicknameError("");
      }
    } else if (name == "userPw") {
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
  return (
    <div>
      {step === 1 ? (
        <div className={styles.checkModalOverlay} onClick={onClose}>
          <div
            className={styles.checkModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.checkModal}>
              <h2>비밀번호 확인</h2>
              <p>현재 비밀번호를 입력하세요.</p>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className={styles.input}
                placeholder="비밀번호"
              />
              <div className={styles.buttonGroup}>
                <button className={styles.cancelButton} onClick={onClose}>
                  취소
                </button>
                <button
                  className={styles.confirmButton}
                  onClick={handlecheckPw}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.modalOverlay} onClick={onClose}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>회원 정보 수정</h2>
            <form className={styles.modalForm} onSubmit={onSubmit}>
              <div className={styles.errorSummary}>
                {pwError && <p>{pwError}</p>}
                {pwConfirmError && <p>{pwConfirmError}</p>}
                {nicknameError && <p>{nicknameError}</p>}
              </div>
              <div className={styles.formRow}>
                <label>이름</label>
                <input
                  type="text"
                  name="userName"
                  value={profile.userName}
                  readOnly
                  className={styles.readOnlyInput}
                />
              </div>
              <div className={styles.formRow}>
                <label>이메일</label>
                <input
                  type="text"
                  name="email"
                  value={profile.email}
                  readOnly
                  className={styles.readOnlyInput}
                />
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
              </div>
              <div className={styles.formRow}>
                <label>비밀번호 확인</label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={checkPWConfirm}
                />
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
      )}
    </div>
  );
};

export default ProfileModal;

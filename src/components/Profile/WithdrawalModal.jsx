import { useState } from "react";
import { checkPw, deleteUser } from "../../api/mypage_api";
import styles from "./WithdrawalModal.module.css";
import { useNavigate } from "react-router-dom";

const WithdrawalModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    const res = await deleteUser();

    if (res.ok) {
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/users/login");
    } else {
      alert("회원 탈퇴 중 오류가 발생했습니다.");
      console.log(await res.text());
    }
  };

  const handlecheckPw = async () => {
    console.log("checkpw start");
    console.log("pw", pw);
    const res = await checkPw(pw);
    console.log("backend res", res);

    if (res.success) {
      console.log("checkPw end");
      setStep(2);
    } else {
      alert("비밀번호가 일치하지 않습니다!");
    }
  };

  return (
    <div>
      {step === 1 ? (
        <>
          <div className={styles.modalOverlay} onClick={onClose}>
            <div
              className={styles.modalContent}
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
                  <button onClick={onClose}>취소</button>
                  <button onClick={handlecheckPw}>확인</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.modalOverlay} onClick={onClose}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.checkModal}>
                <h2>회원 탈퇴 확인</h2>
                <p>정말 회원 탈퇴를 진행하시겠습니까?</p>
                <div className={styles.buttonGroup}>
                  <button onClick={onClose}>아니오</button>
                  <button onClick={handleWithdrawal}>예</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WithdrawalModal;

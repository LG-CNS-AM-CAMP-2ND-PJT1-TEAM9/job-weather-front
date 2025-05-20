import { useState } from "react";
import { updateProfile } from "../../api/mypage_api";
import ProfileModal from "./ProfileModal";
import styles from "./Profile.module.css";
import WithdrawalModal from "./WithdrawalModal";

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const onClose = (item) => {
    if (item == "profile") setModalOpen(false);
    else if (item == "withdawal") setDeleteModal(false);
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData.entries());

    delete jsonData.confirmPassword;
    const res = await updateProfile(jsonData);

    if (res.ok) {
      alert("수정되었습니다");
      onClose();
    } else {
      alert("오류가 발생했습니다");
    }
  };

  return (
    <>
      <div className={styles.profileContainer}>
        <button
          className={styles.profileButton}
          onClick={() => setModalOpen(true)}
        >
          회원 정보 수정
        </button>
        {modalOpen && (
          <ProfileModal
            onClose={() => {
              onClose("profile");
            }}
            onSubmit={handleProfile}
          />
        )}

        <button
          className={styles.deletePrfoileButton}
          onClick={() => setDeleteModal(true)}
        >
          회원 탈퇴
        </button>
        {deleteModal && (
          <WithdrawalModal
            onClose={() => {
              onClose("withdawal");
            }}
          />
        )}
      </div>
    </>
  );
};

export default Profile;

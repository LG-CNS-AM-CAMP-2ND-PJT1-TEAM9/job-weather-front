import { API_BASE_URL } from './api';

// const MYPAGE_URL = "http://localhost:8080/mypage";
const MYPAGE_URL = `${API_BASE_URL}/mypage`;

// Mypage
export const checkLogin = async () => {
  const url = `${MYPAGE_URL}/check`;
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.text();
  return { status: res.status, data: data };
};

// Profile
export const printProfile = async () => {
  const url = `${MYPAGE_URL}/profile`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();

  return data;
};

export const updateProfile = async (data) => {
  console.log("profile send data", data);
  const url = `${MYPAGE_URL}/profile`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return res;
};

// Liked
export const getLikedItem = async (item) => {
  const url = `${MYPAGE_URL}/liked/${item}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();

  return data;
};

export const unLikedItem = async (item, itemId) => {
  const url = `${MYPAGE_URL}/unliked/${item}/${itemId}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`스크랩 취소 실패: ${error}`);
  }

  const result = await res.json();
  return result;
};

export const deleteUser = async () => {
  // const url = "http://localhost:8080/users/delete";
  const url = `${API_BASE_URL}/users/delete`;
  const res = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });

  return res;
};

export const checkPw = async (pw) => {
  const url = `${MYPAGE_URL}/profile/checkPw`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pw }),
    credentials: "include",
  });

  const result = await res.json();
  return result;
};

// Custom
// 기존에 설정된 맞춤설정 id 출력
export const fetchItems = async () => {
  const url = `${MYPAGE_URL}/custom`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();

  return data;
};

// 각 카테고리별 선택지 출력
export const printCategory = async (item) => {
  const url = `${MYPAGE_URL}/custom/${item}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

// 맞춤설정 변경하기
export const saveCustom = async (selected) => {
  const url = `${MYPAGE_URL}/custom`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(selected),
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`변경사항 저장 실패: ${error}`);
  }
  const data = await res.json();
  return data;
};

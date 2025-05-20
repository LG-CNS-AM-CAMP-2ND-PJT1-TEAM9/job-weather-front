const MYPAGE_URL = "http://localhost:8080/mypage";

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

export const deleteUser = async () => {
  const url = "http://localhost:8080/users/delete";
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

    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`스크랩 취소 실패: ${error}`);
  }

  return await res.text();

    body: JSON.stringify({ pw }),
    credentials: "include",
  });

  const result = await res.json();
  return result;

};

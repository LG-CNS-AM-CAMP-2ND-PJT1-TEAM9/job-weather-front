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

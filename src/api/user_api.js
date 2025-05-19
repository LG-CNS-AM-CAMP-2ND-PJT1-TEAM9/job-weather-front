const API_BASE_URL="http://localhost:8080/users"

//회원가입
export const createUser = async (json) => {
      console.log(json);
    const url = API_BASE_URL + "/signup";
    const res = await fetch(url,{
        method : "post",
        headers:{
            "Content-Type":"application/json"
        }, 
        body: json,
        mode: "cors",
    });
    const data = await res.json();
    return data;

};

//닉네임 중복 여부
export const nicknameUser = async (newNickname) =>{
    const url = API_BASE_URL +"/nickname?nickname="+newNickname ;
    const res = await fetch(url,{
        method : "get",
        headers:{
            "Content-Type":"application/json"
        },
        mode: "cors",
    });
    const data = await res.json();
    return data;
};
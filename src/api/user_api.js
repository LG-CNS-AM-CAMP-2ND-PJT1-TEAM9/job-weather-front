const API_BASE_URL="http://localhost:8080/users"

//회원가입
export const createUser = async (json) => {
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


//로그인
export const userLogin = async (json) =>{
    console.log(json);
    const url = API_BASE_URL +"/login";
    const res = await fetch(url,{
        method : "post",
        headers:{
            "Content-Type":"application/json"
        },
        body: json,
        credentials: "include",
        mode: "cors",
    });
    if(res.status ==200){
        const data = await res.json();
        return { success: true, data };
    }else{
        return {success:false};
    }
};

//회원가입 여부
export const emailCheck = async (newEmail) =>{
    const url = API_BASE_URL +"/email?email="+encodeURIComponent(newEmail) ;
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

//비밀번호 재설정
export const resetPassWord = async (json) => {
    console.log(json);
    const url = API_BASE_URL + "/reset-password";
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
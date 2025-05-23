import { useState } from "react";

import './Signup.css'
import { createUser ,emailCheck,nicknameUser} from "../api/user_api";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../api/api';

const Signup = () => {
    const [name, setName] = useState("");
    const [nickname, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pw, setPW] = useState("");
    const [available, setIsAvailable] = useState(null);
    const [checkemail, setCheckEmail] = useState(null);
    const navigate = useNavigate();
   //제출가능여부
    const valid = nickname.trim().length >= 2 &&
        available === true &&
        email.trim() !== "" &&
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) &&
        pw.trim() !== "" &&
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(pw) &&
        name.trim() !== ""&&checkemail === false ;
        
     const handleKakaoOauthLogin = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/users/kakaologin`,{
                method:"get",
                credentials: "include",
            });
            const kakaoLoginUrl = await res.text();
            window.location.href = kakaoLoginUrl;
        } catch (error) {
            console.error("카카오 로그인 URL 요청 실패:", error);
        }
    };
      const handleNaverOauthLogin  = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/users/naverlogin`, {
                method: "get",
                credentials: "include",
            });
            const naverLoginUrl = await res.text();
            window.location.href = naverLoginUrl;
        } catch (error) {
            console.error("네이버 로그인 URL 요청 실패:", error);
        }
    };
    return (

        <div className="signup-container">
            <div className='socialLoginBtn' style={{ textAlign: "center" }}>
                <img className="kakao" src="/img/KakaoBtn.png" alt='Kakao' onClick={handleKakaoOauthLogin} />
                <img className="naver" src="/img/NaverBtn.png" alt='Naver' onClick={handleNaverOauthLogin} />
            </div>

            <div className="signup-group">
                <label>이름</label>
                <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="signup-group">
                <label>닉네임</label>
                 {available === true && nickname.length>=2 && (
                    <div id="available" style={{ color: "green" }}>*사용 가능한 닉네임입니다.</div>
                )}
                {available === false && nickname.length>=2 && (
                    <div id="available" style={{ color: "red" }}>*이미 사용 중인 닉네임입니다.</div>
                )}
                {nickname.length<2 &&(
                <div id="available" style={{color:"red"}}> *두 글자 이상 입력하십시오.
                    </div>)}
                
                <input type="text" className="form-control" id="nickname" name="nickname" value={nickname}
                    onChange={async (e) => {
                        const newNickname = e.target.value;
                        setNickName(newNickname);

                        if (newNickname.trim() === "") {
                            setIsAvailable(null);
                            return;
                        }

                        const available = await nicknameUser(newNickname);
                        setIsAvailable(available);
                    }} />
            </div>
            <div className="signup-group">
                <label>이메일</label>
                    {!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && email.length > 0 && (
                        <div id="emailFormat_signup" style={{ color: "red" }}>
                            *이메일 형식이 올바르지 않습니다.
                        </div>
                    )}
                    {email.length > 0 && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && checkemail === true && (
                        <div id="signup_checkemail" style={{ color: "red" }}>
                            *가입한 이메일 입니다.
                        </div>
                    )}

                
                <input type="text" className="form-control" id="email" name="email" value={email}
                    onChange={async (e) => {
                        const newEmail = e.target.value;
                        setEmail(newEmail);

                        if (newEmail.trim() === "") {
                            setCheckEmail(null);
                            return;
                        }

                        const checkemail = await emailCheck(newEmail);
                        setCheckEmail(checkemail);
                    }} />
            </div>
            <div className="signup-group">
                <label>전화번호</label>
                <input type="text" className="form-control" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="signup-group">
                <label>비밀번호</label>
                    { !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(pw) && pw.length > 0 && (
                        <div id="signup-pwFormat" style={{color:"red"}}>
                            *8~16자의 영문, 숫자, 특수기호 
                        </div>
                    )}
                
                <input type="password" className="form-control" id="pw" name="pw" value={pw} onChange={(e) => setPW(e.target.value)} />
            </div>
            <div>
                <button type="submit" id="signup_bt"
                    onClick={(e) => {
                        // e.preventDefault();
                        if(!valid){
                            Swal.fire({
                                title: "입력한 정보를 다시 확인해주세요.",
                                icon:"error",
                                draggable: true
                            });
                            return;
                        }
                        const obj = { name, nickname, email, phone, pw };
                        const result = createUser(JSON.stringify(obj));
                        if (result) {
                            Swal.fire({
                                title: "회원가입 완료!",
                                icon: "success",
                                draggable: true
                            });
                             navigate("/users/login");
                        }
                      
                    }}>회원 가입</button>
            </div>
        </div>
    );
};

export default Signup;
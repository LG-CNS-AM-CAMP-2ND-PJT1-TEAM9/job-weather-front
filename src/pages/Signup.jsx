import { useState } from "react";

import './Signup.css'
import { createUser } from "../api/user_api";
import { nicknameUser } from "../api/user_api";

import Swal from 'sweetalert2';
const Signup = () => {
    const [name, setName] = useState("");
    const [nickname, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pw, setPW] = useState("");
    const [available, setIsAvailable] = useState(null);

   //제출가능여부
    const valid = nickname.trim().length >= 2 &&
        available === true &&
        email.trim() !== "" &&
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) &&
        pw.trim() !== "" &&
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(pw) &&
        name.trim() !== "";
        
    const handleKakaoOauthLogin = () => {
        // window.location.href = `${url}/oauth2/authorization/kakao`;
    }
    const handleNaverOauthLogin = () => {
        // window.location.href = `${url}/oauth2/authorization/kakao`;
    }
    return (

        <div className="signup-container">
            <div className='socialLoginBtn' style={{ textAlign: "center" }}>
                <img className="kakao" src="/img/KakaoBtn.png" alt='Kakao' onClick={handleKakaoOauthLogin} />
                <img className="naver" src="/img/NaverBtn.png" alt='Naver' onClick={handleNaverOauthLogin} />
            </div>

            <div className="form-group">
                <label>이름</label>
                <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label>닉네임
                 {available === true && nickname.length>=2 && (
                    <div id="available" style={{ color: "green" }}>*사용 가능한 닉네임입니다.</div>
                )}
                {available === false && nickname.length>=2 && (
                    <div id="available" style={{ color: "red" }}>*이미 사용 중인 닉네임입니다.</div>
                )}
                {nickname.length<2 &&(
                <div id="available" style={{color:"red"}}> *두 글자 이상 입력하십시오.
                    </div>)}
                </label>
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
            <div className="form-group">
                <label>이메일
                    {!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && email.length > 0 && (
                        <div id="emailFormat" style={{ color: "red" }}>
                            *이메일 형식이 올바르지 않습니다.
                        </div>
                    )}
                </label>
                <input type="text" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label>전화번호</label>
                <input type="text" className="form-control" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
                <label>비밀번호
                    { !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(pw) && pw.length > 0 && (
                        <div id="pwFormat" style={{color:"red"}}>
                            8~16자의 영문, 숫자, 특수기호 
                        </div>
                    )}
                </label>
                <input type="password" className="form-control" id="pw" name="pw" value={pw} onChange={(e) => setPW(e.target.value)} />
            </div>
            <div>
                <button type="submit" id="signup_bt"
                    onClick={(e) => {
                        e.preventDefault();
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
                        }
                      
                    }}>회원 가입</button>
            </div>
        </div>
    );
};

export default Signup;
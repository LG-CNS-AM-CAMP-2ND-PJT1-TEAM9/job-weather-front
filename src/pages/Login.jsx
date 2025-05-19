import { useState } from "react";

import './Login.css'
import Swal from 'sweetalert2';
import { userLogin } from "../api/user_api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pw, setPW] = useState("");


    //제출가능여부
    const valid = email.trim() !== "" &&
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) &&
        pw.trim() !== "" &&
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(pw);

    const handleKakaoOauthLogin = () => {
        // window.location.href = `${url}/oauth2/authorization/kakao`;
    }
    const handleNaverOauthLogin = () => {
        // window.location.href = `${url}/oauth2/authorization/kakao`;
    }
    return (

        <div className="login-container">
            <h1>job_Weather</h1>
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
                <label>비밀번호
                    {!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(pw) && pw.length > 0 && (
                        <div id="pwFormat" style={{ color: "red" }}>
                            8~16자의 영문, 숫자, 특수기호
                        </div>
                    )}
                </label>
                <input type="password" className="form-control" id="pw" name="pw" value={pw} onChange={(e) => setPW(e.target.value)} />
            </div>
            <div>
                <button type="submit" id="login_bt"
                    onClick={async (e) => {
                        e.preventDefault();
                        if (!valid) {
                            Swal.fire({
                                title: "입력한 정보를 다시 확인해주세요.",
                                icon: "error",
                                draggable: true
                            });
                            return;
                        }
                        const obj = { email, pw };
                        const result = await userLogin(JSON.stringify(obj));
                        if (result.success) {
                            Swal.fire({
                                title: "로그인 성공!",
                                icon: "success",
                                draggable: true
                            });
                        } else {
                            Swal.fire({
                                title: "로그인 실패",
                                text: result.message,
                                icon: "error",
                                draggable: true
                            });
                        }

                    }}>로그인</button>

                <div className='socialLoginBtn' style={{ textAlign: "center" }}>
                    <img className="loginkakao" src="/img/KakaoLogin.png" alt='Kakao' onClick={handleKakaoOauthLogin} />
                    <img className="loginnaver" src="/img/NaverLogin.png" alt='Naver' onClick={handleNaverOauthLogin} />
                </div>
                <div id="urls"><a href="/users/signup">회원가입</a>/<a href="/users/reset-password">비밀번호 재설정</a></div>
            </div>
        </div>
    );
};

export default Login;
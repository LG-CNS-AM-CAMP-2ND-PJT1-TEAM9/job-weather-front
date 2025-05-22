import './Resetpw.css'
import { useState } from "react";

import Swal from 'sweetalert2';
import { emailCheck, resetPassWord  } from "../api/user_api";
import { useNavigate } from "react-router-dom";

const Resetpw = () => {
    const [email, setEmail] = useState("");
    const [pw, setPW] = useState("");
    const [available, setIsAvailable] = useState(null);
    const navigate = useNavigate();

    //제출가능여부
    const valid = email.trim() !== "" &&
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) &&
        pw.trim() !== "" &&
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(pw) &&
        available === true && email.length > 0;

    return(
        <div className="resetpw-container">
            <h2>비밀번호 재설정</h2>
            <div className="resetpw-group">
                <label>이메일
                {available === false && email.length>0 && (
                    <div id="available" style={{ color: "red" }}>*가입하지 않은 이메일 입니다.</div>
                )}
                </label>
                <input type="text" className="form-control" id="email" name="email" value={email}

                    onChange={async (e) => {
                        const newEmail = e.target.value;
                        setEmail(newEmail);

                        if (newEmail.trim() === "") {
                            setIsAvailable(null);
                            return;
                        }

                        const available = await emailCheck(newEmail);
                        setIsAvailable(available);
                    }} />
            </div>

            <div className="resetpw-group">
                <label>비밀번호
                    {!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(pw) && pw.length > 0 && (
                        <div id="pwFormat" style={{ color: "red" }}>
                            8~16자의 영문, 숫자, 특수기호
                        </div>
                    )}
                </label>
                <input type="password" className="form-control" id="pw" name="pw" value={pw} 
                onChange={(e) => setPW(e.target.value)} />
            </div>
            <div>
                <button type="submit" id="save_bt"
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
                        const result = await resetPassWord(JSON.stringify(obj));
                        console.log(result);
                        if (result) {
                            Swal.fire({
                                title: "비밀번호 재설정 성공!",
                                icon: "success",
                                draggable: true
                            });
                            navigate("/users/login");
                        } else {
                            Swal.fire({
                                title: "비밀번호 재설정 실패",
                                text: result.message,
                                icon: "error",
                                draggable: true
                            });
                        }

                    }}>저장</button>
            </div>
        </div>

    );
};

export default Resetpw;
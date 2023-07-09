import { ReactNode } from "react";
import './login.css'
import LoginCard from "../../components/logincard/loginCard";


const Login = () => {
    return (
        <div className="mainLoginDiv">
            <form>
                <LoginCard>
                    <div className="formInputs">
                        <div className="row">
                            <div className="card-group">
                                <label>Login</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="card-group">
                                <label>Senha</label>
                                <input type="password" />
                            </div>
                        </div>
                    </div>
                </LoginCard>
            </form>
        </div>

    )
}


export default Login;
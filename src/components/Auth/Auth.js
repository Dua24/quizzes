import "./Auth.scss"
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaGithubSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../services/apiServices"
import { useState } from 'react'
import { toast } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const Auth = (props) => {
    const { registerComponent } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const handleClickBtnRegister = () => {
        setEmail("")
        setPassword("")
        navigate("/register")
    }
    const handleClickBtnLogin = () => {
        setEmail("")
        setPassword("")
        setUsername("")
        setConfirmPassword("")
        navigate("/login")
    }
    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmit = async () => {
        if (!validateEmail(email)) {
            toast.error("Invalid Email")
            return;
        }
        if (password.length < 6) {
            toast.error("Password must have length > 6")
            return;
        }
        if (registerComponent && (confirmPassword == "" || confirmPassword !== password)) {
            toast.error("Invalid Password confirmed")
            return;
        }
        let res;
        registerComponent ? res = await register(email, username, password) : res = await login(email, password)
        if (res && res.EC === 0) {
            navigate("/")
            toast.success(res.EM)
            setEmail("")
            setPassword("")

        }
        else {
            toast.error(res.EM)
            setEmail("")
            setPassword("")
        }
    }

    return (
        <div className="auth-container">
            <form onSubmit={(e) => e.preventDefault()} >
                <h2 className="title mb-4">{registerComponent ? 'Register' : 'Login'}</h2>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example1">Email address:</label>
                    <input
                        type="text"
                        id="form2Example1"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {
                    registerComponent &&
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example2">Username:</label>
                        <input
                            type="text"
                            id="form2Example2"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                }
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example2">Password:</label>
                    <div className="wrapPasswordToggle">
                        <input

                            type={showPassword ? "text" : "password"}
                            id="form2Example2"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onPaste={(e) => e.preventDefault()}
                        />
                        <span onClick={() => handleTogglePassword()}>
                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </span>
                    </div>
                </div>
                {
                    registerComponent &&

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example2">Confirm Password:</label>
                        <input
                            type="password"
                            id="form2Example2"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}


                        />
                    </div>
                }

                <button onClick={() => handleSubmit()} className="btn btn-primary btn-block mb-4 auth">{registerComponent ? "Sign up" : "Login"}</button>

                <div className="row mb-4">
                    {!registerComponent &&
                        <>
                            <div className="col-6 d-flex mb-2">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                                    <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                                </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-6">
                                <a href="#!">Forgot password?</a>
                            </div>
                        </>
                    }


                </div>


                <div className="text-center">
                    {registerComponent ?
                        <p onClick={() => handleClickBtnLogin()}>Had account? <span>Sign in</span> </p>
                        :
                        <p onClick={() => handleClickBtnRegister()}>Not a member? <span>Register</span> </p>

                    }

                    <p>{registerComponent ? 'or sign up with:' : 'or login with'}</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <FaFacebookSquare />
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <FaInstagramSquare />
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <FaTwitterSquare />
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <FaGithubSquare />
                    </button>
                </div>
            </form >

        </div >
    )
}

export default Auth
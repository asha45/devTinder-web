import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constant";


const Login = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin,setIslogin] = useState(true)
    const [error,setError]= useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSignupSubmit = async () => {
       // e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/signup`, {firstname,lastname, email, password }, { withCredentials: true })
           
            dispatch(addUser(response.data))
            navigate("/profile")
        } catch (error) {
            setError(error?.response?.data)
            console.error("Error occurred while signup:", error)
        }
    }


    const onButtonSubmit = async () => {
       // e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/login`, { email, password }, { withCredentials: true })
           
            dispatch(addUser(response.data))
            navigate("/")
        } catch (error) {
            setError(error?.response?.data)
            console.error("Error occurred while logging in:", error)
        }
    }
    return (
        <>
            <div className="card card-dash bg-base-300 w-96 flex justify-center items-center shadow-xl m-auto mt-20">
                <div className="card-bodym m-2">
                   {isLogin && <div><fieldset className="fieldset">
                        <label className="label" htmlFor="firstname">Firstname</label>
                        <input type="text" id="firstname" className="input" placeholder="firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label" htmlFor="lastname">lastname</label>
                        <input type="text" id="lastname" className="input" placeholder="Lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)} />
                    </fieldset></div>}
                    <fieldset className="fieldset">
                        <label className="label" htmlFor="email">Email</label>
                        <input type="text" id="email" className="input" placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="input" placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </fieldset>
                    {error && <p className="text-error">{error}</p>}
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary m-4" onClick={!isLogin?onButtonSubmit:onSignupSubmit}>{!isLogin?"Login":"Signup"}</button>
                    </div>
                    <p onClick={()=>setIslogin(value=>!value)}>{!isLogin?"New User? signup here" : "already signup?login"}</p>
                </div>
            </div>
        </>
    )
}
export default Login
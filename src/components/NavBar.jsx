import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../constants/constant"
import { useDispatch } from "react-redux"
import { removeUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"


const NavBar = () => {
    const userData = useSelector((store) => store.user)
    const dispach = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {

        try {
            const response = await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true })
            dispach(removeUser(response.data))
            return navigate("/login")

        } catch (err) {
            console.error("Error occurred while logging out:", err)
        }
    }

    return (
        <div className="navbar bg-base-300 shadow-md">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
            </div>
            <div className="flex gap-2">
                {userData && <div>Welcome ,{userData?.firstname}</div>}
                <div className="dropdown dropdown-end mx-5 flex">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {userData && <img alt="user-photo" src={userData.photourl} />}
                        </div>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to="/connections">Connections</Link></li>
                        <li><Link to="/requests">Requests</Link></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
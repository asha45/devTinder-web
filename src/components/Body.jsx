import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import axios from "axios"
import { BASE_URL } from "../constants/constant"
import { useNavigate } from "react-router-dom"
import {useEffect} from "react"
import { useSelector } from "react-redux"

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((store) => store.user)

    const fetchData = async () => {
        try {
            if (userData) return;
            const response = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true })
            dispatch(addUser(response.data))
        } catch (err) {
            if (err.status == 401) {
                navigate("/login")
            }
            console.log("Error occurred while fetching user data:", err)
        }
    }

    useEffect(() => {
     fetchData()
    }, [])

    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )

}
export default Body
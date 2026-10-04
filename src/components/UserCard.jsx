
import { useDispatch } from "react-redux";
import axios from 'axios'
import { BASE_URL } from "../constants/constant";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ feedData }) => {
    const dispatch = useDispatch();
    if (!feedData) return null;

    const {_id,firstname,lastname,photourl,about} = feedData

    const sendConnectionRequest = async(status,userId) =>{
        try{
      const res=await axios.post(`${BASE_URL}/sendConnectionRequest/request/${status}/${userId}`,{},{withCredentials:"true"})
      dispatch(removeFeed(userId))
        }catch(err){
            console.error("error" , err)
        }
    }
    return (

        <div className="card bg-base-300 w-96 shadow-sm flex justify-center items-center m-auto mt-10">
            <figure>
                <img
                    className="w-96 h-68 object-cover"
                    src={photourl}
                    alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstname} {lastname}</h2>
                <p>{about}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick ={()=>sendConnectionRequest("ignored",_id)}>ignore</button>
                    <button className="btn btn-secondary" onClick ={()=>sendConnectionRequest("interested",_id)}>interest</button>
                </div>
            </div>
        </div>

    )
}
export default UserCard
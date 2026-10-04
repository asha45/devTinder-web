import {useDispatch} from "react-redux"
import { addFeed } from "../utils/feedSlice"
import axios from "axios"
import { BASE_URL } from "../constants/constant"
import UserCard from "./UserCard"
import { useEffect } from "react"
import { useSelector } from "react-redux"
const Feed= ()=>{
    const feedData = useSelector((store)=> store.feed)
    const dispatch = useDispatch()
    
    const fetchFeed = async ()=>{
        if(feedData) return;
        try{
            
       const response =await axios.get(`${BASE_URL}/feed`, { withCredentials: true })
       dispatch(addFeed(response?.data?.data))
        }catch(err){
            //handle error
        }
    }
    useEffect(()=>{
        fetchFeed()
    },[])
    
 return (
    <div>
     {feedData && <UserCard feedData = {feedData[0]}/>}
    </div>
 )
}
export default Feed
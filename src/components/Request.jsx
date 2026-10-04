import { useEffect } from "react";
import { BASE_URL } from "../constants/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest , removeRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/request/recieved`, { withCredentials: true });
    
      dispatch(addRequest(res.data.requests));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const requestStatus = async (status,id) => {
    try{      
        const res=await axios.post(`${BASE_URL}/sendConnectionRequest/review/${status}/${id}`,{},{withCredentials:"true"})
        dispatch(removeRequest(id))
    }catch(err)  {
        console.log("err",err)
    }
 }

 if(requests.length<=0) return <h1>no requests Found</h1>

  return (
    <div className="max-w-xl mx-auto p-5">
      {/* Fixed conflicting text-white and text-gray-800 classes */}
      <h1 className="text-2xl font-bold text-center capitalize mb-6 text-gray-800">
        Requests
      </h1>
      
      <div className="flex flex-col gap-4">
        {requests &&
          requests.map((request) => {
            const { _id, firstname, lastname, photourl, about } = request.senderId;
            return (
              <div 
                key={_id} 
                className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Left Side: Photo */}
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={photourl || "https://placeholder.com"}
                    alt={`${firstname}'s profile`}
                    className="w-16 h-16 rounded-full object-cover border border-gray-100 bg-gray-200"
                  />
                </div>

                {/* Right Side: Details */}
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-lg font-semibold text-gray-900 truncate">
                    {firstname} {lastname}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{about}</p> 
                </div>

                {/* Extreme Right Side: Two Action Buttons */}
                <div className="flex gap-2 flex-shrink-0">
                  <button 
                    onClick={() => requestStatus("rejected", request._id)}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => requestStatus("accepted", request._id)}
                    className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Request;

import { useEffect } from "react";
import { BASE_URL } from "../constants/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
     
      dispatch(addConnection(res.data.mappedData));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
 if(connections.length<=0) return <h1>no conections Found</h1>
  
  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-center text-white capitalize mb-6 text-gray-800">
        Connections
      </h1>
      
      <div className="flex flex-col gap-4">
        {connections &&
          connections.map((connection) => {
            return (
              <div 
                key={connection._id || connection.firstname} 
                className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Left Side: Photo */}
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={connection.photourl || "https://placeholder.com"}
                    alt={`${connection.firstname}'s profile`}
                    className="w-16 h-16 rounded-full object-cover border border-gray-100 bg-gray-200"
                  />
                </div>

                {/* Right Side: Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-gray-900 truncate">
                    {connection.firstname} {connection.lastname}
                  </p>
                  {/* You can easily add extra details here later, like an email or headline */}
                  <p className="text-sm text-gray-500 truncate"> {connection.about}</p> 
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Connections;

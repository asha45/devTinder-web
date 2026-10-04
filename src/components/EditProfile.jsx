import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constant";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [photourl, setPhotourl] = useState(user.photourl);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();
    const onEditButton = async () => {
        setError("");
        try {
            const response = await axios.patch(`${BASE_URL}/profile/edit`,
                { firstname, lastname, photourl, about }, { withCredentials: true })
            dispatch(addUser(response.data))
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            },3000
            )}
        catch (err) {
            setError(err?.response?.data)
        }
    };

    return (
        <div className="flex flex-row justify-center items-start gap-10 w-full pt-20 px-4">
            {showToast && (
                <div className="toast toast-top toast-center mt-20">
                    <div className="alert alert-success">
                        <span>Data Saved successfully.</span>
                    </div>
                </div>
            )}

            <div className="card card-dash bg-base-300 w-96 shadow-xl mt-10">
                <div className="card-body m-2">
                    <fieldset className="fieldset">
                        <label className="label" htmlFor="firstname">First Name</label>
                        <input type="text" id="firstname" className="input w-full" placeholder="First Name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label" htmlFor="lastname">Last Name</label>
                        <input type="text" id="lastname" className="input w-full" placeholder="Last Name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label" htmlFor="photourl">Profile Picture URL</label>
                        <input type="text" id="photourl" className="input w-full" placeholder="Profile Picture URL"
                            value={photourl}
                            onChange={(e) => setPhotourl(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label" htmlFor="about">About</label>
                        <textarea id="about" className="textarea w-full" placeholder="About"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)} />
                    </fieldset>
                    {error && <p className="text-error">{error}</p>}
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary m-4" onClick={onEditButton}>Save Data</button>
                    </div>
                </div>
            </div>
            <div className="">

                <UserCard feedData={{ firstname, lastname, photourl, about }} />
            </div>

        </div>
    );
};

export default EditProfile;

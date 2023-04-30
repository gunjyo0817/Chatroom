import React, { useState, useEffect } from 'react';
import {ref, onValue, set } from 'firebase/database';
// import { useHistory } from 'react-router-dom';
import useAuth from "@/hooks/useAuth";
import {db} from "../../firebase";
import Nav from "@/components/Nav";
import {updateProfile} from "firebase/auth";
export default function Profile() {
    const user = useAuth();
    // useHistory();
    const [userData, setUserData] = useState({
        name: '',
        photo: '',
        bio: '',
    });

    useEffect(() => {
        if (user) {
            const userRef = ref(db, `users/${user.uid}`);
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setUserData({
                        name: data.name || '',
                        photo: data.photo || '',
                        bio: data.bio || '',
                    });
                    if(data.photo){
                        updateProfile(user, {
                           photoURL: data.photo,
                        })
                    }
                    if(data.name){
                        updateProfile(user, {
                            displayName: data.name,
                        })
                    }
                }

            });
        }
    }, [user, db]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,

        }));
    };

    // const handleChangePhoto = (e) => {
    //     const { name, value } = e.target;
    //     setUserData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    //     updateProfile(user, {
    //         photoURL: value,
    //     })
    // };

    const handleUpdateProfile = () => {
        set(ref(db, `users/${user.uid}`), {
            ...userData,
            email: user.email,
            uid: user.uid,
        }).then(() => {
            alert('Profile updated successfully');
        });
    };

    return (
        <>
            <Nav/>
            <div className="container mx-auto py-10 px-4 bg-[#bde0fe]">
                <h1 className="text-xl mb-4">Update Profile</h1>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={userData.name}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="photo" className="block mb-2">
                        Photo URL
                    </label>
                    <input
                        type="text"
                        name="photo"
                        id="photo"
                        value={userData.photo}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="bio" className="block mb-2">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        id="bio"
                        value={userData.bio}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3"
                        rows="4"
                    ></textarea>
                </div>
                <button
                    onClick={handleUpdateProfile}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Update Profile
                </button>
            </div>
        </>

    );
}

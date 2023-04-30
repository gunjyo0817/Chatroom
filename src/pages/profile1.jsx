import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import {db} from "../../firebase";
import useAuth from "@/hooks/useAuth";
import {onValue, push, ref, set} from "firebase/database";
import Nav from "@/components/Nav";

export default function UserProfile() {
    const user = useAuth();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    console.log(user?.email)
    useEffect(() => {
        // onValue(ref(db, ('messages/' + roomId)), (snapshot) => {
        const userRef = onValue(ref(db,(`users/${user?.uid}`)), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUserData(data);
            }
            setLoading(false);
        });
        return () => {

        };
    }, []);

    const handleUpdateProfile = () => {
        // db.ref(`users/${user.uid}`).update(userData);
        push(ref(db, `users/${user.uid}`), {
            // email: user.email,
            name: user.displayName,
            photo: user.photoURL,
            // uid: user.uid,
            // id: user.uid
        })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value || '',
        }));
    };
    return loading ? (
        <div>Loading...</div>
    ) : (
        <>
            <Nav/>
            <div className="container mx-auto p-4">

            <h1 className="text-2xl mb-4">Profile</h1>
            <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                    <label htmlFor="name" className="w-32 font-bold">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <label htmlFor="name" className="w-32 font-bold">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={user.email||''}
                        readOnly
                        className="border p-2 rounded w-full mb-4 bg-gray-200"
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <label htmlFor="avatar" className="w-32 font-bold">
                        Avatar URL:
                    </label>
                    <input
                        type="text"
                        id="avatar"
                        name="avatar"
                        value={user.photoURL}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleUpdateProfile}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
        </>

    );
}

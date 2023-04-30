import {auth} from "../../firebase";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";


export default function useAuth() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
                console.log(user)
            } else {
                setUser(null)
                router.push('/')
            }
        })
    })
    return user
}

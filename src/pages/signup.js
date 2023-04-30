import {auth, db} from '../../firebase';
import {GoogleAuthProvider, signInWithPopup, updateProfile} from "firebase/auth";
import {useState} from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useRouter} from "next/router";
import {ref, set} from "firebase/database";
const provider = new GoogleAuthProvider();

const signInWithGoogle = async (router) => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Signed in with Google:", user);
        set(ref(db, `users/${user.uid}`), {
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
            uid: user.uid,
            id: user.uid
        })
        set(ref(db, `rooms/publicroom/users/${user.uid}`), true).then( ()=>{
            router.push('/home')
        })
    } catch (error) {
        console.error("Error signing in with Google:", error);
    }
};

export default function Example() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const router = useRouter();
    function SignUp(){
        console.log(email,password)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(db, `users/${user.uid}`), {
                    email: user.email,
                    name: username,
                    photo: user.photoURL,
                    uid: user.uid,
                    id: user.uid
                })
                set(ref(db, `rooms/publicroom/users/${user.uid}`), true).then( ()=>{
                    router.push('/home')
                })
                updateProfile(user, {
                    displayName: username,
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }

    return (
        <>
            <div className="flex min-h-full flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign up
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Already have an account?{' '}
                                <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Sign in
                                </a>
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                            Username
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="username"
                                                name="username"
                                                type="text"
                                                required
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={()=>SignUp(email, password)}
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Sign up
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center text-sm font-medium leading-6">
                                        <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols gap-4">
                                    <a
                                        onClick={()=>signInWithGoogle(router)}
                                        href="#"
                                        className="flex w-full items-center justify-center gap-3 rounded-md bg-[#4285F4] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                                    >
                                        <span className="text-sm font-semibold leading-6">Google</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="../bgimg.png"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}


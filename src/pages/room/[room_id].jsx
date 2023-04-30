import useAuth from "@/hooks/useAuth";
import {db} from "../../../firebase";
import {useEffect, useState} from "react";
import {ref, onValue} from "firebase/database";
import {useRouter} from "next/router";
import Chats from "@/components/Chats";
import ChatInput from "@/components/ChatInput";
import ChatRoomList from "@/components/ChatRoomList";
import Nav from "@/components/Nav";
import {PlusIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import {addMember} from "@/utils/member";

export default function Room_id() {
    const [room, setRoom] = useState(null)
    const user = useAuth()
    const router = useRouter()

    useEffect(() => {
        const { room_id } = router.query;
        if (!room_id) return;

        // const userRoomRef = ref(db, `rooms/${room_id}/users/${user?.uid}`);
        // onValue(userRoomRef, (snapshot) => {
        //     if (!snapshot.exists() || snapshot.val() !== true) {
        //         alert("You are not a member of this room" + snapshot.val());
        //         router.push("/home");
        //     }
        // });

        onValue(ref(db, `rooms/${room_id}`), (snapshot) => {
            const room = snapshot.val();
            setRoom(room);
        });
    }, [router, user]);


    return (
        <>
            <div className="flex min-h-screen flex-col">
                <Nav/>
                <div className="mx-0 w-full grow lg:flex items-stretch h-full">
                    <div
                        className="flex-1 flex flex-col shrink-0 border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
                        <div
                            className="flex justify-between h-1/6 bg-[#a2d2ff] text-3xl font-bold text-center items-center justify-center">
                            <span className={"w-full text-center"}> {room?.name}</span>
                            {room?.id!="publicroom" && <UserPlusIcon
                                onClick={()=>addMember(room?.id)}
                                className={"h-6 w-6 mr-8 cursor-pointer"}/>}
                        </div>

                        <div className="flex flex-col h-full bg-[#bde0fe]">
                            <Chats roomId={room?.id}/>
                        </div>
                        <div className="flex flex-col h-1/6 bg-[#bde0fe] align-bottom">
                            <ChatInput roomId={room?.id}/>
                        </div>
                        {/*<div className="flex flex-col h-full bg-[#bde0fe]">*/}
                        {/*    {JSON.stringify(room)}*/}
                        {/*</div>*/}
                    </div>
                    <ChatRoomList/>
                </div>
            </div>
        </>
    )
}

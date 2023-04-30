import {createRoom} from "@/utils/room";
import {ChatBubbleLeftIcon, PlusIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import useAuth from "@/hooks/useAuth";
import {useRouter} from "next/router";
import {onValue, ref} from "firebase/database";
import {db} from "../../firebase";

export default function ChatRoomList() {
    const [rooms, setRooms] = useState(null)
    const user = useAuth()
    const router = useRouter()

    useEffect(() => {
        onValue(ref(db, `rooms`), (snapshot) => {
            const rooms = snapshot.val()
            setRooms(rooms)
        })
    }, [router.isReady, router.query])

    return (
        <div
            className="md:align-bottom bg-[#d6eadf] shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
            <div
                className={"inline-flex items-center border rounded-xl  p-2 text-gray-700 bg-white shadow-xl cursor-pointer"}
                onClick={() => createRoom(user)}>
                <PlusIcon className={"h-6 w-6"}/>Add Chatroom
            </div>
            <div className={"mt-6 flex flex-col my-2"}>
                {rooms !== null && Object.entries(rooms)
                    ?.filter(([roomId, room]) => room.users[user?.uid] === true)
                    .map(([roomId, room]) => (
                    <Link key={roomId}
                          href={`/room/${roomId}`}
                          className="mb-2 inline-flex items-center border rounded-xl  p-2 text-gray-700 bg-white shadow-xl cursor-pointer">
                        <ChatBubbleLeftIcon className={"h-6 w-6"}/>
                        <span className="ml-2">{room.name}</span>
                    </Link>
                ))}
            </div>
            {/*<div>*/}
            {/*    {JSON.stringify(rooms)}*/}
            {/*    {router.query?.room_id}*/}
            {/*</div>*/}
        </div>
    )
}
import ChatInput from "@/components/ChatInput";
import Chats from "@/components/Chats";
import ChatRoomList from "@/components/ChatRoomList";
import Nav from "@/components/Nav";
import {useEffect} from "react";

export default function Home() {
    const publicRoomId = "publicroom"

    return (
        <>
            <div className="flex min-h-screen flex-col">
                <Nav/>
                <div className="mx-0 w-full grow lg:flex items-stretch h-full">
                    <div
                        className="flex-1 flex flex-col shrink-0 border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0 lg:h-auto sm:h-1/2">
                        <div
                            className="flex flex-col h-1/6 bg-[#a2d2ff] text-3xl font-bold text-center items-center justify-center">
                            <span> Public room</span>
                        </div>
                        <div className="flex flex-col lg:h-full bg-[#bde0fe]">
                            <Chats roomId={publicRoomId}/>
                        </div>
                        <div className="flex flex-col h-1/6 bg-[#bde0fe] align-bottom">
                            <ChatInput roomId={publicRoomId}/>
                        </div>
                    </div>
                    <ChatRoomList/>
                </div>
            </div>
        </>
    )
}

import { useState } from 'react';
import { db } from '../../firebase';
import {PaperAirplaneIcon} from "@heroicons/react/20/solid";
import {push, ref, set} from "firebase/database";
import useAuth from "@/hooks/useAuth";

export default function ChatInput({ roomId }) {
    const [message, setMessage] = useState('');
    const user = useAuth();
    console.log('roomId '+typeof(roomId))
    console.log('room ' + roomId)
    const handleSendMessage = async () => {
        if (message.trim()) {
            const send_message = push(ref(db, `messages/${roomId}`), {
                content: message,
                time: new Date().getTime(),
                user: user.uid,
            }).key
            // set(ref(db, `messages/${roomId}/${send_message}/user`), user.uid)
            setMessage('');
        }

    };

    return (
        <div className="flex mt-3 px-2">
            <input
                type="text"
                placeholder="Type a message..."
                className="flex-grow border-[#0b2545] rounded-l-lg px-4 py-2 mr-2 focus:outline-none focus:ring focus:border-[#0b2545]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
                className="bg-[#5c6b73] hover:bg-[#0b2545] text-white font-bold py-2 px-4 rounded-r-lg"
                onClick={handleSendMessage}
            >
                <PaperAirplaneIcon className="w-6 h-6" />
            </button>
        </div>
    );
}

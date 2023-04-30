import {useState, useEffect} from 'react';
import {db} from '../../firebase';
import {remove ,onValue, ref, onChildAdded , onChildRemoved} from "firebase/database";
import useAuth from "@/hooks/useAuth";
import {TrashIcon} from "@heroicons/react/20/solid";

export default function Chatroom({roomId}) {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState({});

    const user = useAuth()
    console.log(user?.uid)
    console.log('room',roomId)
    useEffect(() => {
        setMessages([])
        onValue(ref(db, ('messages/' + roomId)), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messageList = Object.entries(data).map(([id, message]) => ({
                    id,
                    ...message,
                }));
                console.log('message '+messageList)
                setMessages(messageList);
            }
        })
        return
    }, [roomId]);

    useEffect(() => {
        const usersRef = ref(db, 'users');
        onValue(usersRef, (snapshot) => {
            setUsers(snapshot.val());
        });
    }, []);

    useEffect(() => {
        console.log('test')
        const messagesRef = ref(db, `messages/${roomId}`);

        function notify(message) {
            if (Notification.permission === 'granted') {
                const notification = new Notification('New message from ' + message.user, {
                    body: message.content,
                });
                setTimeout(() => {
                    notification.close();
                }, 5000);
            }
        }

        const handleNewMessage = (snapshot) => {
            const message = snapshot.val();

            if (user && message?.user !== user?.uid) {
                notify(message);
            }
        };

        onChildAdded(messagesRef, handleNewMessage);

        return () => {
            onChildRemoved(messagesRef, handleNewMessage);
        };
    }, [roomId]);

    const [selectedMessageId, setSelectedMessageId] = useState(null);

    const handleUnsendMessage = (messageId) => {
        if (selectedMessageId === messageId) {
            const messageRef = ref(db, `messages/${roomId}/${messageId}`);
            remove(messageRef)
                .then(() => {
                    setSelectedMessageId(null);
                })
        } else {
            setSelectedMessageId(messageId);
        }
    };

    return (
        <div>
            <ul>
                {messages?.map((message) => (
                    <li key={message.id} className={`flex  ${message.user === user?.uid ? 'flex-row-reverse justify-start mr-2' : ''}  py-4`}>
                        <div className="relative ml-2">
                            <div className="mt-3 h-10 w-10 rounded-full overflow-hidden">
                                {
                                    users[message.user]?.photo ? (
                                        <img
                                            className="w-full h-full object-cover"
                                            src={users[message.user].photo}
                                            alt={message.user}
                                        />
                                    ) : (
                                        <div className="bg-gray-500 h-full w-full flex items-center justify-center"></div>
                                    )
                                }
                            </div>
                        </div>
                        <div
                            className={`flex flex-col ${
                                message.user === user?.uid ? "items-end" : "items-start"
                            } justify-end ml-4 w-4/5`}
                        >
                            <div
                                className={`flex items-center ${
                                    message.user === user?.uid ? "flex-row-reverse" : "flex-row"
                                }`}
                            >
                                <h3 className="text-sm font-medium">
                                    {users[message.user]?.name || "Unknown"}
                                </h3>
                                <p className="text-xs text-gray-500 ml-2 mr-2">
                                    {new Date(message.time).toLocaleString()}
                                </p>
                                {message.user === user?.uid && (
                                    <TrashIcon
                                        className={`cursor-pointer ml-2 h-5 w-5 ${
                                            selectedMessageId === message.id ? "text-red-500" : "text-gray-500"
                                        }`}
                                        onClick={() => handleUnsendMessage(message.id)}
                                    />
                                )}
                            </div>
                            <div className="bg-blue-500 rounded-lg p-2 mt-1">
                                <p className="text-white">{message.content}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}


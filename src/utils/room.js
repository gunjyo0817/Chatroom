import Swal from "sweetalert2";
import {set, push, ref} from "firebase/database";
import {db} from "../../firebase";

export const createRoom = (user) => {
    Swal.fire({
        title: 'Enter name for chat room',
        input: 'text',
    }).then(({value: name}) => {
        if(!name) return

        const id = push(ref(db, `rooms`), {
            name,
            users: {
                [user.uid]: true
            }
        }).key;
        set(ref(db, `rooms/${id}/id`), id)

    })
}
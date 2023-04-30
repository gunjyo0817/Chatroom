import Swal from "sweetalert2";
import {set, push, ref, onValue} from "firebase/database";
import {db} from "../../firebase";

export const addMember = (roomId) => {
    Swal.fire({
        title: 'Enter new member\'s email',
        input: 'text',
    }).then(async ({value: name}) => {
        if (!name) return

        console.log('now room is'+roomId)
        const data = await new Promise((resolve, reject) => {
            onValue(ref(db, `users`), (snapshot) => {
                const data = snapshot.val()
                if (!data) return reject('No users')
                resolve(data)
            }, reject, {
                onlyOnce: true
            })
        })
        console.log(data)
        const id = Object.entries(data).filter(([_, user]) => {
            if (user.email === name)
                return true
            return false
        })?.[0]?.[1]?.uid;
        if (!id) return

        console.log('id=' + id)
        console.log(`rooms/${roomId}/users`, id)
        set(ref(db, `rooms/${roomId}/users/${id}`), true)
        alert('Successfully added member!')
    })
}

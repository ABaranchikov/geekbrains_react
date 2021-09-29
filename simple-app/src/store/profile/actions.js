import { ref, onValue, set } from "firebase/database";
import { db } from "../../services/firebase";

export const SET_NAME = 'PROFILE::SET_NAME';
export const SET_AUTHED = 'PROFILE::SET_AUTHED';

export const setUserName = (name) => ({
    type: SET_NAME,
    payload: name,
});

export const setAuthed = (authed) => ({
    type: SET_AUTHED,
    payload: authed
});


export const initUserName = () => (dispatch) => {
    const userDbRef = ref(db, "user");
    onValue(userDbRef, (snapshot) => {
        const data = snapshot.val();
        dispatch(setUserName(data?.username || ''));
    })
}

export const setUserNameFb = (value) => () => {
    set(ref(db, "user"), {
        username: value,
    });
}

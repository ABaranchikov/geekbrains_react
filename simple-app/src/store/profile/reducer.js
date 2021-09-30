import { SET_AUTHED, SET_NAME } from "./actions"

const initialState = {
    name: "",
    authed: false,
}

export const profileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_NAME: {
            return {
                ...state,
                name: payload,
            }
        }
        case SET_AUTHED: {
            return {
                ...state,
                authed: payload,
            }
        }
        default:
            return state;
    }
}


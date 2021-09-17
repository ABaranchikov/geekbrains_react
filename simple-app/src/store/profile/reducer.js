import { TOGGLE_CHECKBOX, TOGGLE_SHOW_NAME } from "./actions"

const initialState = {
    showName: false,
    checked: false,
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SHOW_NAME: {
            return {
                ...state,
                showName: !state.showName,
            }
        }
        case TOGGLE_CHECKBOX: {
            return {
                ...state,
                checked: !state.checked,
            }
        }
        default:
            return state;
    }
}
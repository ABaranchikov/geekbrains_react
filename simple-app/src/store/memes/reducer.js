import { REQUEST_STATUS } from '../../utils/constants';
import { GET_MEMES_FAIL, GET_MEMES_LOADING, GET_MEMES_SUCCESS } from './actions'

const initialState = {
    memes: [],
    request: {
        error: null,
        status: REQUEST_STATUS.IDLE
    }
}

export const memesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_MEMES_LOADING: {
            return {
                ...state,
                request: {
                    error: null,
                    status: REQUEST_STATUS.LOADING
                }
            }
        }
        case GET_MEMES_SUCCESS: {
            return {
                ...state,
                request: {
                    ...state.request,
                    status: REQUEST_STATUS.SUCCESS
                },
                memes: payload
            }
        }
        case GET_MEMES_FAIL: {
            return {
                ...state,
                request: {
                    error: payload,
                    status: REQUEST_STATUS.FAIL
                }
            }
        }
        default:
            return state;
    }
}
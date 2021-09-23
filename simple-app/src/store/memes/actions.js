export const GET_MEMES = "MEMES::GET_MEMES";
export const GET_MEMES_LOADING = "MEMES::GET_MEMES_LOADING";
export const GET_MEMES_SUCCESS = "MEMES::GET_MEMES_SUCCESS";
export const GET_MEMES_FAIL = "MEMES::GET_MEMES_FAIL";

export const getMemes = (page) => ({
    type: GET_MEMES,
    payload: {
        page
    }
})

export const getMemesLoading = () => ({
    type: GET_MEMES_LOADING
})

export const getMemesSuccess = (memes) => ({
    type: GET_MEMES_SUCCESS,
    payload: memes
})

export const getMemesFail = (error) => ({
    type: GET_MEMES_FAIL,
    payload: error
})
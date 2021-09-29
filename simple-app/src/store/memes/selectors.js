import { REQUEST_STATUS } from "../../utils/constants";

export const selectMemesLoading = (state) => state.memes.request.status === REQUEST_STATUS.LOADING;
export const selectMemes = (state) => state.memes.memes;

export const selectMemesError = (state) => state.memes.request.error;

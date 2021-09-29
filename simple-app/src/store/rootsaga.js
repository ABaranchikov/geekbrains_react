import { all } from "redux-saga/effects";
import watchAddMessage from './messages/saga'
import watchGetMemes from "./memes/saga";

export default function* rootSaga() {
    yield all([
        watchAddMessage(),
        watchGetMemes()]
    )

}
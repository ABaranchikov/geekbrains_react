export const AUTHORS = {
    HUMAN: 'human',
    BOT: 'bot'
}

export const API_MEMES = (skip, limit) => `https://api.doge-meme.lol/v1/memes/?skip=${skip}&limit=${limit}`;

export const REQUEST_STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    FAIL: 'fail'
}

export const LIMIT = 5;

export const PAGINATION_SIZE = 10;
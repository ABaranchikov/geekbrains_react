export const selectChats = (state) => state.chat.chats;
export const selectChatsLength = (state) => state.chat.chats.length;
export const selectIfChatExists = (id) => (state) => state.chat.chats.find((chat) => id === chat.id);
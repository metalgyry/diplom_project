import {makeAutoObservable} from "mobx"

export default class Chat {
    constructor(){
        this._chat = [];
        this._updatingMessage = {};
        this._isLoadingChat = false;
        makeAutoObservable(this);
    }

    addMessage(newMessage){
        this._chat = [...this._chat, newMessage];
    }

    updateMessage(updatedMessage){
        this._chat = this._chat.map((message) => {
            if (message.id_message == updatedMessage.id_message) {
                return updatedMessage;
            } else {
                return message;
            }
          });
    }

    deleteMessage(idDeletedMessage){
        this._chat = this._chat.filter(message => message.id_message != idDeletedMessage)
    }

    set chat(chat){
        this._chat = chat;
    }

    get chat(){
        return this._chat;
    }

    set updatingMessage(updatingMessage){
        this._updatingMessage = updatingMessage;
    }

    get updatingMessage(){
        return this._updatingMessage;
    }

    set isLoadingChat(isLoadingChat){
        this._isLoadingChat = isLoadingChat;
    }

    get isLoadingChat(){
        return this._isLoadingChat;
    }

}
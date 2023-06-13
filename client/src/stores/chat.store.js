import {makeAutoObservable} from "mobx"

export default class Chat {
    constructor(){
        this._chat = {};
        makeAutoObservable(this);
    }

    set chat(chat){
        this._chat = chat;
    }

    get chat(){
        return this._chat;
    }

}
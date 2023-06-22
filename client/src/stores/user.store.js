import {makeAutoObservable} from "mobx"

export default class User {
    constructor(){
        this._user = {};
        this._isAuth = false;
        makeAutoObservable(this);
    }

    set isAuth(auth){
        this._isAuth = auth;
    }
   
    set user(user){
        this._user = user;
    }

    get isAuth(){
        return this._isAuth;
    }

    get user(){
        return this._user;
    }

}
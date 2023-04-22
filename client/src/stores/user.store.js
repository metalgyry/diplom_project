import {makeAutoObservable} from "mobx"

export default class User {
    constructor(){
        this._user = {};
        this._isAuth = false;
        // this._isLoading = false;
        makeAutoObservable(this);
    }

    set isAuth(auth){
        this._isAuth = auth;
    }
    
    // set isLoading(loading){
    //     this.isLoading = loading;
    // }

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
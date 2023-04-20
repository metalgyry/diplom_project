import {makeAutoObservable} from "mobx"

export default class User {
    user = {};
    isAuth = false;

    constructor(){
        makeAutoObservable(this);
    }

    setAuth(auth){
        this.isAuth = auth;
    }

    setUser(user){
        this.user = user;
    }

    getAuth(){
        return this.isAuth;
    }

    getUser(){
        return this.user;
    }

}
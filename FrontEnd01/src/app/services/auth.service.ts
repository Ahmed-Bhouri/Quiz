import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _api = environment.api + 'api/'
  _LogUserRoute = this._api + 'auth/login/'
  constructor(private _http: HttpClient) { }


  LogUser(code){
    return this._http.post(this._LogUserRoute,{code:code})
  }

  getUserToken(){
    return localStorage.getItem('token')
  }

  loggedIn(){
    if(localStorage.getItem('token')){
      return true
    } else {
      return false
    }
    
  }

  logOut(){
    localStorage.clear()
    
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {userDate} from './currentUser'
import { logging } from 'protractor';
import { clear } from 'console';
import { Router, RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
mainUrl="https://routeegypt.herokuapp.com/"

currentUser:any= new BehaviorSubject(null) ;

  constructor(private _HttpClient:HttpClient,private _Router:Router) {


    if(localStorage.getItem('userData') != null){
        this.currentUser.next( JSON.parse(localStorage.getItem('userData')))
    }


    }




    SignUp(data):Observable<any>
    {
     return this._HttpClient.post(this.mainUrl+'signup',data)
    }
    SignIn(data):Observable<any>
    {
      return this._HttpClient.post(this.mainUrl+'Signin',data)
    }
    SignOut(data):Observable<any>
    {
      return  this._HttpClient.post(this.mainUrl+'SignOut',data)
    }

saveCurrentUser( first_name, last_name,  email ,  token){
  let users = new userDate (first_name, last_name,  email ,  token)
  localStorage.setItem('userData',JSON.stringify(users))
  this.currentUser.next(users)
}
LogInData(){
 return localStorage.getItem('userData')
}
logoutAuth(){
  this.currentUser.next(null)
  localStorage.setItem('userData',null)
  this._Router.navigate(['./signIn'])

}
}

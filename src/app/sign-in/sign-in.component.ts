import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var $:any
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private _AuthService:AuthService ,private _Router:Router) { }

    signIn= new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required])

  })
  formData(){
    if(this.signIn.valid){
      this._AuthService.SignIn(this.signIn.value).subscribe((respone)=>{
          if(respone.message=='success'){
            this._AuthService.saveCurrentUser(respone.user.first_name,respone.user.last_name,respone.user.email,respone.token)
          this._Router.navigate(['/profile'])

        }
      })
    }
  }



  ngOnInit(): void {

    $('#signIn').particleground();

  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
declare var $:any
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  messageTrue = false;
 responeMessage= false
 responeError=false
 responeErrorMessage=''
  constructor(private _AuthService:AuthService) { }

  signUp= new FormGroup({
    first_name : new FormControl('',[Validators.required,Validators.minLength(6)]),
    last_name : new FormControl('',[Validators.required,Validators.minLength(6)]),
    email : new FormControl('',[Validators.required,Validators.email]),
    age : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])

  })
  formData(){
this.messageTrue =true;

    if(this.signUp.valid){
      this._AuthService.SignUp(this.signUp.value).subscribe((respone)=>{
        if(respone.message=='success'){
          this.messageTrue =false
          this.signUp.reset()
          this.responeMessage=true
          this.responeError=false

        }
        else{
          this.responeMessage=false
          this.responeError=true
          this.responeErrorMessage=respone.errors.email.message

        }
      })
    }

  }

  ngOnInit(): void {

    $('#signUp').particleground();


  }

}

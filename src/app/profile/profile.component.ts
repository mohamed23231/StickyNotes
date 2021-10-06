import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from '../notes.service';
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $:any
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
allNotes;
token
decoded:any
  constructor(private _Router:Router , private _NotesService:NotesService) {
    this.getAllNotes()
    try {
      var userToken = JSON.parse(localStorage.getItem('userData'));

      this.token = userToken.token
      this.decoded = jwt_decode(this.token);
  
    } catch (error) {
      localStorage.clear()
      this._Router.navigate(['/signin'])
    }
    
   }

   ///////////////Getting All Note in this User ///////////
   getAllNotes(){
    var userToken = JSON.parse(localStorage.getItem('userData'));

    this.token = userToken.token
    this.decoded = jwt_decode(this.token);
 
let data ={
  token:this.token,
  userID:this.decoded._id
}

    // Another way to protect routing //
    // if(!localStorage.getItem("TOKEN")){
    //   this._Router.navigate(['/signIn'])
    // }
    this._NotesService.getAllNotes(data).subscribe(respone=>{
      if(respone.message=="success"){
      this.allNotes=respone.Notes
      console.log(respone)}
      else{
        // localStorage.clear()
        this._Router.navigate(['/signin'])
  
      }
    })

   }


   
   addNote= new FormGroup({
     title:new FormControl('',Validators.required),
     desc:new FormControl('',Validators.required),

   })


      ///////////////Add new Note  ///////////

   addData(){
     let data={
      title:this.addNote.value.title ,
      desc:this.addNote.value.desc,
      token:this.token,
      citizenID:this.decoded._id
    }
 
    this._NotesService.addNote(data).subscribe(respone=>{
    if(respone.message=='success'){
      $('#addNote').modal('hide')
      this.getAllNotes()
      this.addNote.reset()
    };
      
    })

   }


      ///////////////Delete Note  ///////////

   note_Id 
   getID(id){

    this.note_Id = id
    console.log(id)
    }

   deleteNotes(){


    let data={
      NoteID :this.note_Id,
      token:this.token

    }

     this._NotesService.deleteNote(data).subscribe(respone=>{
      console.log(respone)
      if(respone.message=='deleted'){
        $('#deleteNote').modal('hide')
        this.getAllNotes()
   
      }

    })

   }

  ngOnInit(): void {
  }

}

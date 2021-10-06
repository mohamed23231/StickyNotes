import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  mainUrl="https://routeegypt.herokuapp.com/"

  constructor(private _HttpClient:HttpClient) { }

  getAllNotes(data):Observable<any>
  {
    return this._HttpClient.post(this.mainUrl+'getUserNotes',data)
  }

  addNote(data):Observable<any>
  {
    return this._HttpClient.post(this.mainUrl+'addNote',data)
  }

  deleteNote(data):Observable<any>
  {
    let option = {
      headers : new HttpHeaders({

      }),
      body:{
        NoteID : data.NoteID,
        token:data.token
      }
    }
    return this._HttpClient.delete(this.mainUrl+'deleteNote',option)
  }


}

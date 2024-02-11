import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Associate } from '../Store/Model/Associate.model';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {
  baseURL = "http://localhost:3000/associate"
  constructor(private http:HttpClient) { }

  GetAll(){
    return this.http.get<Associate[]>(this.baseURL);
  }
  Getbycode(code:number){
    return this.http.get<Associate>(this.baseURL+'/'+code);
  }
  Delete(code:number){
    return this.http.delete<Associate>(this.baseURL+'/'+code);
  }
  Update(data:Associate){
    return this.http.put(this.baseURL+'/'+data.id,data);
  }
  Create(data:Associate){
    return this.http.post(this.baseURL,data);
  }
}

import { Injectable } from '@angular/core';
import { BASE_URL } from './api_base';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Lideres } from '../models/lideres.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http:Http
  ) { }

  getData():Observable<Lideres[]>{
    return this.http.get(`${BASE_URL}/lideres`).pipe(map( rs => rs.json()))
  }

  deleteData(lideres:Lideres){
    return this.http.delete(`${BASE_URL}/lideres/${lideres.id}`)
  }

  editData(lideres:Lideres){
    return this.http.put(`${BASE_URL}/lideres/${lideres.id}`, lideres)
  }

  createData(lideres:Lideres){
    return this.http.post(`${BASE_URL}/lideres`, lideres)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})




export class ConectionsService {
readonly APIUrl = "http://127.0.0.1:8000";
readonly PhotoUrl = 'http://127.0.0.1:8000/media/';
url='/api';


  constructor(private http:HttpClient) { }

getDepList():Observable<any[]>{
return this.http.get<any[]>(this.APIUrl + '/department/');
}

addDepartment(val:any){
  return this.http.post<any[]>(this.APIUrl + '/department/',val);
}

updateDepartment(val:any){
  return this.http.put<any[]>(this.APIUrl + '/department/',val);
}
deleteDepartment(val:any){
  return this.http.delete<any[]>(this.APIUrl + '/department/',val);
}



getEmpList():Observable<any[]>{
  return this.http.get<any[]>(this.APIUrl + '/employee/');
  }
  
addEmployee(val:any){
    return this.http.post<any[]>(this.APIUrl + '/employee/',val);
}

addEmployeeCSV(val:any){
  return this.http.post<any[]>(this.APIUrl + '/employee/',val);
}
  
updateEmployee(val:any){
    return this.http.put<any[]>(this.APIUrl + '/employee/',val);
}
  
deleteEmployee(val:any){
    return this.http.delete<any[]>(this.APIUrl + '/employee/',val);
}

UploadPhoto(val1:any):Observable<any[]>{
  return this.http.post<any>(this.PhotoUrl,val1);
}

//NODEJS//
sendPost(body:FormData):Observable<any>{
  return this.http.post(`http://localhost:3000/upload`, body)
}

addEquipo(equipo:Equipo)
{
  return this.http.post(this.url, equipo);
}

getimg():Observable<any[]>{
  return this.http.get<any[]>(`http://localhost:3000/upload`);
  }

}

export interface Equipo{
  id_equipo?:string;
  nombre?:string;
  logo?:string;
}

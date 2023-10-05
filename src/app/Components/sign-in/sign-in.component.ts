import { Component, OnInit,Input } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  formsignin:FormGroup;
  formteam:FormGroup;
  name:string;
  email:string;
  result:any;
  password:string;
  correoDuplicado: boolean=false;
  

  constructor(private service:ConectionsService,private fb: FormBuilder,private http: HttpClient) {
    this.formsignin = this.fb.group({
      name:[''],
      email:[''],
      password:[''],
      })
   }

   
addUser(){
  const valuser ={ 
    name:this.formsignin.value.name,
    email:this.formsignin.value.email,
    password:this.formsignin.value.password
  
  };
this.service.register(valuser).subscribe((response:any)=>{
  if (response.correoDuplicado) {
    // El correo ya existe, muestra el mensaje de error
    this.correoDuplicado = true;
  } else {
    // El correo no existe, procede con el registro
    this.correoDuplicado = false;
    // Realiza el registro del usuario
    // ...
  }
});
       
  
}



  ngOnInit(): void {
  }

}

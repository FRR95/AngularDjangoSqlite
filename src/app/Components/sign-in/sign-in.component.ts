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
  name:string;
  email:string;
  password:string;
  correoDuplicado: boolean = false;
  

  constructor(private service:ConectionsService,private fb: FormBuilder,private http: HttpClient) {
    this.formsignin = this.fb.group({
      name: ['df'],
      email: ['df'],
      password: ['df']
      })
   }

   
addUser(){
  const valuser ={ 
    name:this.formsignin.value.name,
    email:this.formsignin.value.email,
    password:this.formsignin.value.password
  
  };


   
    const email=this.formsignin.value.email
   
  


  
    
  
    this.service.verify_password(email).subscribe((response: any)=>{
    if (response.correoDuplicado) {
      // El correo ya existe, muestra el mensaje de error
      this.correoDuplicado = true;
      console.log('el email ya existe');
    }
    else{
     /* this.service.register(valuser).subscribe(res=>{
        this.correoDuplicado = false;
        window.location.reload();
       
        });*/
          
    }
   
    });


}

  ngOnInit(): void {
  }

}

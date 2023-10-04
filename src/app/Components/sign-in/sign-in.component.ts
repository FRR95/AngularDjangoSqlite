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
    this.formteam = this.fb.group({
      
      email:['']

      })
   }

   
/*addUser(){
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
       });
        console.log('el email no existe');  }
   });
}*/

registrarUsuario() {
  // Verificar si el correo ya está registrado antes de enviar el formulario
  this.service.verify_password(this.email).subscribe((response: any) => {
    if (response.correoDuplicado) {
      // El correo ya existe, muestra el mensaje de error
      this.correoDuplicado = true;
      console.log('este correo esta duplicado');
    } else {
      // El correo no existe, procede con el registro
      this.correoDuplicado = false;
      console.log('este correo no esta duplicado');

      // Realiza el registro del usuario
      // ...
    }
  });
}

  ngOnInit(): void {
  }

}

import { Component, OnInit,Input } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule  } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  formsignin:FormGroup;
  formteam:FormGroup;
  name:string;
  name_length:number;
  password_length1:boolean;
  email:string;
  result:any;
  password:string;
  correoDuplicado: boolean=false;
  nameform=true;
  

  constructor(private service:ConectionsService,private fb: FormBuilder,private http: HttpClient,private router:Router) {
    this.formsignin = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(5)
      ]],
      email:['', [Validators.required,Validators.pattern(/.+@.+\..+/)
      ]],
      password:['', [Validators.required,Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)
    ]],
      });
   }

 
addUser(){
  const valuser ={ 
    name:this.formsignin.value.name,
    email:this.formsignin.value.email,
    password:this.formsignin.value.password
  
  };
this.service.register(valuser).subscribe((response:any)=>{
  if (response.correoDuplicado) {
    this.correoDuplicado = true;
  } else {
    this.router.navigate(['/login']);
  }
});
       
  
}

password_length(){
this.name_length=this.formsignin.value.password.length;
if(this.name_length>0) {
this.password_length1=true;
}
else{
  this.password_length1=false;
}
}

modelChangeFn(e) {
  this.name_length=this.formsignin.value.password.length;
}
  ngOnInit() {
    
  }


}

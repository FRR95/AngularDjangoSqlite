import { Component, OnInit,Input } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Router, RouterModule  } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formlogin:FormGroup;
  username: string;
  tokenusername: string;
  tokenuserid: string;
  tokenusernamepost: string;
  tokenuseridpost: string;
  tokenexpirationtime: string;
  password: string;
  invalid_password:boolean;
  valid_password:boolean;
  token_validator:boolean=false;
  token_invalid:boolean;
  token_valid:boolean;
  constructor(private service:ConectionsService,private fb: FormBuilder,private http: HttpClient,private router:Router) {

    this.formlogin = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(1)
      ]],
      password: ['', [Validators.required,Validators.minLength(1)
      ]],
      })
   }

   loginUser(){
    const loginUser ={ 
      username:this.formlogin.value.username,
      password:this.formlogin.value.password
    
    };
   

   
    this.service.login(loginUser).subscribe(
       (response:any) =>{
       const token = response.token;

       
      
        if(response.noresult){
          this.token_invalid=true;
        }
       if (token) {
        localStorage.setItem('token',token);
        localStorage.getItem('token');
        
        //  console.log(decodedToken);
       
   
        const decodedToken = jwt_decode(token);
        
       
             
            this.tokenusername=decodedToken['username'];
            this.tokenuserid=decodedToken['userId'];
            this.token_invalid=false;
            this.token_valid=true;
            this.token_validator=true;
            window.location.reload();
           // this.router.navigate(['/']);
           
          
        
         // this.token=true;
          
          
        } else {
          console.log('Token not found.');  
          this.token_valid=false;
        }
      
    });

   }

logout(){
localStorage.removeItem('token');
this.token_validator=false;
window.location.reload();
//this.router.navigate(['/']);

}
TokenStorage = localStorage.getItem('token');
local_storage(){
  if(this.TokenStorage){
  const decodedToken = jwt_decode(this.TokenStorage);
  this.tokenusername=decodedToken['username'];
  this.tokenuserid=decodedToken['userId'];
  if(this.token_validator=true){
    this.token_valid=true;
  }
  else{
    this.token_valid=false;
  
  }
}
}  

ngOnInit() {
   
this.local_storage();

}
    
   
  
}

import { Component, OnInit,Input } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';



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
  password: string;
  invalid_password:boolean;
  valid_password:boolean;
  token:boolean;
  token_invalid:boolean;
  constructor(private service:ConectionsService,private fb: FormBuilder,private http: FormBuilder) {

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
        localStorage.setItem('token',token);
        localStorage.getItem('token');
       
      
        if(response.noresult){
          this.token_invalid=true;
        }
       if (token) {
          const decodedToken = jwt_decode(token);
        
          const username = decodedToken['username'];
          const userid = decodedToken['userId'];
          this.tokenusername=username;
          this.tokenuserid=userid;
          this.token_invalid=false;
          
        } else {
          console.log('Token not found.');  
        }
      
    });
   }

  ngOnInit(): void {
  }

}

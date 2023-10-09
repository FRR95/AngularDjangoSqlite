import { Component, OnInit,Input } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formlogin:FormGroup;
  username: string;
  password: string;
  constructor(private service:ConectionsService,private fb: FormBuilder) {

    this.formlogin = this.fb.group({
      username: [''],
      userpass: [''],
      })
   }

   loginUser(){
    const valuser ={ 
      username:this.formlogin.value.username,
      password:this.formlogin.value.userpass
    
    };
   

   
    this.service.login(this.username).subscribe(
      (response:any) => {
        // Successful login; handle response (e.g., store token and navigate to a protected route)
        const token = response.token;
        // Store the token securely (e.g., in local storage or a cookie)
        localStorage.setItem('token', token);
        // Navigate to a protected route

        
        window.location.reload();
      },
      (error) => {
        // Handle login error (e.g., display an error message)
        console.error('Login error:', error);
      }
    );
   }

  ngOnInit(): void {
  }

}

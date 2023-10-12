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
  password: string;
  constructor(private service:ConectionsService,private fb: FormBuilder,private http: FormBuilder) {

    this.formlogin = this.fb.group({
      username: [''],
      password: [''],
      })
   }

   loginUser(){
    const loginUser ={ 
      username:this.formlogin.value.username,
      password:this.formlogin.value.password
    
    };
   

   
    this.service.login(loginUser).subscribe(
      (response:any) => {
        // Successful login; handle response (e.g., store token and navigate to a protected route)
        const token = response.token;
        console.log(token);
        // Store the token securely (e.g., in local storage or a cookie)
        localStorage.setItem('token', token);
        // Navigate to a protected route

        
       if (token) {
          // Decode the token to access its payload
          const decodedToken = jwt_decode(token);
        
          // Now, you can access the username or other information from the token payload
          const username = decodedToken['username'];
          console.log('Username:', username);
        } else {
          console.log('Token not found.');
        }
      },
    
    );
   }

  ngOnInit(): void {
  }

}

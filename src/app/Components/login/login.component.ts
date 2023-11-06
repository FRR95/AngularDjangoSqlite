import { Component, OnInit,Input } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Router, RouterModule  } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('foobar', [
      state('show', style({opacity: 1,transform: "translateX(0)"})),
      state('hide', style({opacity: 0,transform: "translateX(-100%)"})),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
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
  token_valid:boolean;
  token_invalid:boolean;
  state= 'hide';

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
        
       
       
   
        const decodedToken = jwt_decode(token);
        
       
             
            this.tokenusername=decodedToken['username'];
            this.tokenuserid=decodedToken['userId'];
            
         
        
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
           
          
        
      
          
          
        } else {
          console.log('Token not found.');  
         
        }
      
    });

   }


TokenStorage = localStorage.getItem('token');
 
ngAfterViewInit() {
 
 
 }
ngOnInit() {
   

  this.service.getusertasks1().subscribe(data=>{
    
    this.state = 'show';
   
    })   
   
}  
}

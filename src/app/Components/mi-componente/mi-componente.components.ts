import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/Components/login/login.component';
import jwt_decode from 'jwt-decode';

@Component({
selector:'mi-NavMenu',
templateUrl: './navmenu.component.html',
styleUrls: ['./navmenu.component.css'],

})
export class NavMenu implements OnInit{
    token_valid:boolean;
    user: string;
    user_url:string;
    user_biography:string;
    user_email:string;
    user_id:number;

public Link1 : string;
public Link2 : string;
public Link3 : string;




constructor(){
this.Link1="Inicio";
this.Link2="LogIn";
this.Link3="SignIn";

}

TokenStorage = localStorage.getItem('token');
local_storage(){
    if(this.TokenStorage){
    const decodedToken = jwt_decode(this.TokenStorage);
    this.user=decodedToken['username'];
    this.user_url=decodedToken['user_url'];
    this.user_biography=decodedToken['user_biography'];
    this.user_email=decodedToken['user_email'];
    this.user_id=decodedToken['userId'];


    
    
    
      this.token_valid=true;
      console.log('Token: '+this.TokenStorage);

    }
    else{
      this.token_valid=false;
      console.log('Token: '+this.TokenStorage);
    }
  
  } 
  logout(){
    localStorage.removeItem('token');
    window.location.reload();
  }
ngOnInit() {
  this.local_storage();
}
}
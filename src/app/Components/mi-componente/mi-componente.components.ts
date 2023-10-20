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
    tokenusername: string;

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
    this.tokenusername=decodedToken['username'];
    
    
      this.token_valid=true;
      console.log('Token: '+this.TokenStorage);

    }
    else{
      this.token_valid=false;
      console.log('Token: '+this.TokenStorage);
    }
  
  } 
ngOnInit() {
  this.local_storage();
}
}
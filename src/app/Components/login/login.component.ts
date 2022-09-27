import { Component, OnInit,Input } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formlogin:FormGroup;
  constructor(private service:ConectionsService,private fb: FormBuilder) {

    this.formlogin = this.fb.group({
      useremail: [''],
      userpass: [''],
      })
   }

   loginUser(){
  
   }

  ngOnInit(): void {
  }

}

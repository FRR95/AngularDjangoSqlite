import { Component, OnInit,Input } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  formsignin:FormGroup;

  constructor(private service:ConectionsService,private fb: FormBuilder) {
    this.formsignin = this.fb.group({
      username: [''],
      useremail: [''],
      userpass: [''],
      userpassconfirm: ['']
      })
   }
   addUser(){

    
    }
  ngOnInit(): void {
  }

}

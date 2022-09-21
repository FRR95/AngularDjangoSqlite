import { Component, OnInit } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  formValue:any;
  constructor(private service:ConectionsService,private fb: FormBuilder) {

   }

  EmployeeList:any=[];


  ngOnInit(): void {
    this.EmpList();
    
  }

  EmpList(){
    this.service.getEmpList().subscribe(data=>{
    this.EmployeeList=data;
    })
    }
}

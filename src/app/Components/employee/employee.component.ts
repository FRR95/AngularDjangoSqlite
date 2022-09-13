import { Component, OnInit } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service:ConectionsService,) { }

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

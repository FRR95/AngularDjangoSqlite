import { Component, OnInit } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  formValue:any;
  constructor(private service:ConectionsService) {
    
   }
  favoritepost= this.service.obtenermisfavoritos();
  


  ngOnInit(): void {
   
    
  }


}

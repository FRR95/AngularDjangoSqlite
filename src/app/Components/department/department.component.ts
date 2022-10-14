import { Component, OnInit } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(private service:ConectionsService,private toastr:ToastrService) { }

  DepartmentList:any=[];
  ImageList:any=[];

  ngOnInit():void {
  this.DepList()
  this.ImgList()
  }

  DepList(){
  this.service.getDepList().subscribe(data=>{
  this.DepartmentList=data;
  })
  }

  
  ImgList(){
    this.service.getimg().subscribe(data=>{
    this.ImageList=data;
    })
    }
  DepListSuccess(){
    this.toastr.success('Departamento añadido correctamente');
    }
}

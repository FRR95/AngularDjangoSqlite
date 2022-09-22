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
  
  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentListWithoutFilter:any=[];


  ngOnInit():void {
  this.DepList()
  }

  DepList(){
  this.service.getDepList().subscribe(data=>{
  this.DepartmentList=data;
  this.DepartmentListWithoutFilter=data;
  })
  }
  DepListSuccess(){
    this.toastr.success('Departamento añadido correctamente');
    }
    FilterFnId(){
      var DepartmentIdFilter = this.DepartmentIdFilter;
      var DepartmentNameFilter = this.DepartmentNameFilter;
  
      this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el:any){
          return el.DepartmentId.toString().toLowerCase().includes(
            DepartmentIdFilter.toString().trim().toLowerCase()
          )&&
          el.DepartmentName.toString().toLowerCase().includes(
            DepartmentNameFilter.toString().trim().toLowerCase()
          )
      });
    }

    FilterFnName(){
      var DepartmentIdFilter = this.DepartmentIdFilter;
      var DepartmentNameFilter = this.DepartmentNameFilter;
  
      this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el:any){
          return el.DepartmentName.toString().toLowerCase().includes(
            DepartmentNameFilter.toString().trim().toLowerCase()
          )&&
          el.DepartmentId.toString().toLowerCase().includes(
            DepartmentIdFilter.toString().trim().toLowerCase()
          )
      });
    }

    sortResult(prop:any,asc:any){
      this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a:any,b:any){
        if(asc){
            return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
        }else{
          return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
        }
      })
    }
}

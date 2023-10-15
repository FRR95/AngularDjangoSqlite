import { Component, OnInit } from '@angular/core';
import { ConectionsService,Equipo } from 'src/app/services/conections.service';
import { ToastrService } from 'ngx-toastr';
import { Router} from '@angular/router';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  equipo: Equipo={
    id_equipo:'',
    nombre:'',
    logo:''
  };

 


  constructor(private service:ConectionsService,private toastr:ToastrService,private router:Router) { }

  DepartmentList:any=[];
  ListarEquipo:any=[];

  ngOnInit():void {
  this.DepList()
  this.TeamList()
 
  }

  DepList(){
  this.service.getDepList().subscribe(data=>{
  this.DepartmentList=data;
  })
  }

  TeamList(){
    this.service.getEquipos().subscribe(data=>{
    this.ListarEquipo=data;
    })
    }


    eliminar(id:string)
    {
      this.service.deleteEquipo(id).subscribe(
        res=>{
          console.log('equipo eliminado');
          this.TeamList();
          console.log(res)
        });
    }

    modificar(id:string){
      this.router.navigate(['/edit/'+id]);
    }

  

  DepListSuccess(){
    this.toastr.success('Departamento añadido correctamente');
    }


}

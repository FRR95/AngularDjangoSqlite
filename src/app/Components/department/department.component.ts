import { Component, OnInit } from '@angular/core';
import { ConectionsService,Equipo } from 'src/app/services/conections.service';
import { ToastrService } from 'ngx-toastr';
import { Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
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
  UserTasks:any=[];
  ListarEquipo:any=[];
  user:any=[];
  user_id:string;
  token_valid:boolean;

  TokenStorage = localStorage.getItem('token');
  

  get_user_tasks(){
    const decodedToken = jwt_decode(this.TokenStorage);
    this.user_id=decodedToken['userId'];

    }
  local_storage(){
    if(this.TokenStorage){
    const decodedToken = jwt_decode(this.TokenStorage);

    this.user=decodedToken['user'];
    this.user_id=decodedToken['userId'];

    this.service.getusertasks(this.user_id).subscribe(data=>{
      this.UserTasks=data;
      console.log(this.UserTasks);
      })
    
    
    
      this.token_valid=true;
     
      
    }
    else{
      this.token_valid=false;
     
    }
  
  } 




  ngOnInit():void {
  this.DepList()
  this.TeamList()
  this.local_storage()

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

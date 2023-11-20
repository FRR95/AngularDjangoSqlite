import { Component, OnInit } from '@angular/core';
import { ConectionsService,Equipo } from 'src/app/services/conections.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  formtask:FormGroup;
  descripcion:string;
  task_length:number;
  task:string;
  equipo: Equipo={
    id_equipo:'',
    nombre:'',
    logo:''
  };

 


  constructor(private fb: FormBuilder,private service:ConectionsService,private toastr:ToastrService,private router:Router) {

    this.formtask = this.fb.group({
      descripcion: ['', [Validators.required,Validators.minLength(1)
      ]],
      }) 
   }

  DepartmentList:any=[];
  UserTasks:any=[];
  UserTasks1:any=[];
  ListarEquipo:any=[];
  user:any=[];
  user_id:string;
  token_valid:boolean;
  error:boolean;

  TokenStorage = localStorage.getItem('token');
  



    add_user_tasks(){
      const valpost ={ 
        descripcion:this.formtask.value.descripcion,
       
      
      };
      const decodedToken = jwt_decode(this.TokenStorage);
      this.user_id=decodedToken['userId'];
      this.service.addusertasks(this.user_id,valpost).subscribe((response:any)=>{
        if (response.error) {
          this.error = true;
        } else {
          window.location.reload();
        }
      });
  
      }

      modelChangeFn(e) {
        this.task_length=this.formtask.value.descripcion.length;
        this.task=this.formtask.value.descripcion;
      }
  local_storage(){
    if(this.TokenStorage){
    const decodedToken = jwt_decode(this.TokenStorage);

    this.user=decodedToken['user'];
    this.user_id=decodedToken['userId'];

 
      
      this.service.getusertasks1().subscribe(data=>{
        this.UserTasks1=data;
        
       
        })
    
    
    
      this.token_valid=true;
     
      
    }
    else{
      this.token_valid=false;
     
    }
  
  } 
  addtofavorites(favorites:any[]){
    this.service.addtofavorites(favorites);
   

    }




  ngOnInit():void {
  //this.DepList()
  //this.TeamList()
  this.local_storage();
 

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

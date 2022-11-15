import { Component, OnInit } from '@angular/core';
import { ConectionsService,Equipo } from 'src/app/services/conections.service';
import {Router, ActivatedRoute} from '@angular/router'; 

@Component({
  selector: 'app-edades',
  templateUrl: './edades.component.html',
  styleUrls: ['./edades.component.css']
})
export class EdadesComponent implements OnInit {
edad:number;
id:any;


equipo: Equipo={
  id_equipo:'',
  nombre:'',
  logo:'',
  img:'',
};
private fileTmp:any;

  constructor(private conexion:ConectionsService,
    private router:Router,
    private activeRoute:ActivatedRoute) {
  this.edad = 18;
   }

  ngOnInit(): void {
 
    const id_entrada = <string>this.activeRoute.snapshot.params['id'];
    console.log('id de entrada: '+id_entrada);

    if(id_entrada){
      this.conexion.getUnEquipo(id_entrada).subscribe(
        data=>{
          this.equipo = data;
          console.log(data);
        },
      );
    }
    this.id = this.activeRoute.snapshot.paramMap.get('id');
  }

aumentarEdad(){
this.edad = this.edad + 1;
}
disminuirEdad(){
  this.edad--;
  }
  getFile($event: any): void {
    //TODO esto captura el archivo!
    const [ file ] = $event.target.files;
    this.fileTmp = {
      fileRaw:file,
      fileName:file.name
    }
  }
  modificar()
  {
    const id_entrada = <string>this.activeRoute.snapshot.params['id'];
    const body = new FormData();
    body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName);
    body.append('email','test@test.com')

    this.conexion.editEquipo(id_entrada,body).subscribe(
    
    );

    this.router.navigate(['/']);
  }

}

import { Component, OnInit,Input } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.css']
})
export class AddEditDepartmentComponent implements OnInit {
form:FormGroup;
formteam:FormGroup;
formValue:any;
DepartmentName:string;
nombre?:string;
logo?:string;
LoadingGif=false;
private fileTmp:any;




constructor(private service:ConectionsService,private fb: FormBuilder,private toastr:ToastrService) {


  this.form = this.fb.group({
    namedep: ['']
    })

    this.formteam = this.fb.group({
      nameteam: [''],
      namelogo:['']

      })

      
 }





addDepartment(){
var val ={ DepartmentName:this.form.value.namedep};
this.LoadingGif=true;
this.service.addDepartment(val).subscribe(res=>{
window.location.reload();
this.LoadingGif=false;
});

}

addTeam(){
  var valteam ={ nombre:this.formteam.value.nameteam,
  logo:this.formteam.value.namelogo};
  this.LoadingGif=true;
  this.service.addEquipo(valteam).subscribe(res=>{
  window.location.reload();
  this.LoadingGif=false;
  });
  
  }





getFile($event: any): void {
  //TODO esto captura el archivo!
  const [ logo ] = $event.target.files;
  this.fileTmp = {
    fileRaw:logo,
    fileName:logo.name
  }
}

sendFile():void{
  
  const body = new FormData();
  body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName);

  this.service.sendPost(body)
  .subscribe(res => console.log(res))
}

  ngOnInit(): void {
  }

}



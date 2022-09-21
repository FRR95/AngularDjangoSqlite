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
formValue:any;
DepartmentName:string;
LoadingGif=false;



constructor(private service:ConectionsService,private fb: FormBuilder,private toastr:ToastrService) {


  this.form = this.fb.group({
    namedep: ['']
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

  ngOnInit(): void {
  }

}

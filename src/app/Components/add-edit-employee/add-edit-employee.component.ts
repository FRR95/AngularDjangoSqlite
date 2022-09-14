import { Component, OnInit } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  LoadingGif=false;
  form:FormGroup;
  formValue:any;


  EmployeeName:string;
  Department:string;
  DateOfJoining:Date;
  PhotoFileName:string;


  constructor(private service:ConectionsService,private fb: FormBuilder) { 
    this.form = this.fb.group({
      nameemp: [''],
      namedep: [''],
      namedate: [''],
      fotourl: [''],

      })

  }

  addEmployee(){
    var val ={ 
    EmployeeName:this.form.value.nameemp,
    Department:this.form.value.namedep,
    DateOfJoining:this.form.value.namedate,
    PhotoFileName:this.service.PhotoUrl+this.form.value.fotourl.replace(/^.*\\/, "")
    };


    
    this.LoadingGif=true;
    this.service.addEmployee(val).subscribe(res=>{
    alert(res.toString());
    window.location.reload();
    this.LoadingGif=false;
    });
    
    }

  ngOnInit(): void {
  }

}

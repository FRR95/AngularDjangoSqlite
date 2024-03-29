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
  formcsv:FormGroup;
  formValue:any;
  


  

  EmployeeName:string;
  Department:string;
  DateOfJoining:Date;
  PhotoFileName:string;
  CsvFileName:string;


  constructor(private service:ConectionsService,private fb: FormBuilder) { 
    
    this.form = this.fb.group({
      nameemp: [''],
      namedep: [''],
      namedate: [''],
      fotourl: [''],

      })

      this.formcsv = this.fb.group({
        CsvFileUrl: ['']
   
  
        })
}

  

  addEmployee(){
 

    var val ={ 
      EmployeeName:this.form.value.nameemp,
      Department:this.form.value.namedep,
      DateOfJoining:this.form.value.namedate,
      PhotoFileName:this.service.PhotoUrl+this.form.value.fotourl.replace(/^.*\\/, "")
      };

    this.service.addEmployee(val).subscribe(res=>{
    alert(res.toString());
    window.location.reload();
    this.LoadingGif=false;
    });
    console.log(val);


 
    }

    addEmployeeViaCSV(){
      var val1 ={ 
    
        CsvFileName:this.formcsv.value.CsvFileUrl.replace(/^.*\\/, "")
        };
  
      this.service.UploadPhoto(val1).subscribe(res=>{
      alert(res.toString());

      });
   

    }


  ngOnInit(): void {
  }

}

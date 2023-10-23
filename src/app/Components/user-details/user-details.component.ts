import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConectionsService } from 'src/app/services/conections.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  formbiography:FormGroup;
  user:string;
  user_url:string;
  user_biography:string;
  user_email:string;
  user_id:string;
  userid:string;
  userbiography:string;
  error:boolean;


  constructor(private service:ConectionsService,private route: ActivatedRoute,private fb: FormBuilder) {
    this.formbiography = this.fb.group({
      userid: ['{{user_id}}', [Validators.required,Validators.minLength(1)
      ]],
      userbiography: ['', [Validators.required,Validators.minLength(1)
      ]],
      })

   }
   Modify_bio(){
    const modify_biography ={ 
      userid:this.user_id,
      userbiography:this.formbiography.value.userbiography
    
    };
    this.service. modify_biography(modify_biography).subscribe((response:any)=>{
      if (response.error) {
        this.error = true;
      } else {
        window.location.reload();
      }
    });
    console.log('userid:'+modify_biography.userid+' userbiography:'+modify_biography.userbiography);
   }
  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('user'); 
    this.user_url = this.route.snapshot.paramMap.get('user_url'); 
    this.user_biography = this.route.snapshot.paramMap.get('user_biography'); 
    this.user_email = this.route.snapshot.paramMap.get('user_email'); 
    this.user_id = this.route.snapshot.paramMap.get('user_id'); 
  }

}

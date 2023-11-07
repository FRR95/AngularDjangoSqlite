import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConectionsService } from 'src/app/services/conections.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  animations: [
    trigger('foobar', [
      state('show', style({opacity: 1,transform: "translateX(0)"})),
      state('hide', style({opacity: 0,transform: "translateX(-100%)"})),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ]),
    trigger('foobar2', [
      state('enter', style({opacity: 1,transform: "translateY(0)"})),
      state('leave', style({opacity: 1,transform: "translateY(100%)"})),
      transition('enter => leave', animate('4s ease-out')),
      transition('leave => enter', animate('4s ease-in'))
    ])

],
})
export class UserDetailsComponent implements OnInit {
  formbiography:FormGroup;
  user_name:string;
  user_url:string;
  UserTasks:any=[];
  CovidData:any=[];
  UserTasksDataChart:any=[];
  user_biography:string;
  user_email:string;
  user_id:string;
  userid:string;
  userbiography:string;
  error:boolean;
  task_length:number;
  state= 'hide';
 state2= 'leave';


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

   eliminar(id:string)
   {
     this.service.DeleteTarea(id).subscribe(res=>{
      window.location.reload();
       });
   }
covid_data(){
  this.user_id = this.route.snapshot.paramMap.get('user_id'); 
 this.service.getusertasks(this.user_id).subscribe((response: any) => {
 this.UserTasks=response;
 this.UserTasks.forEach((data:any,result:any) => {
  this.UserTasksDataChart.push({
    label: data.year_of_post,
    y: data.number_of_posts,
  });
});
 })
}
   ngAfterViewInit() {
    
   
}

PieChartCovidCases = {
  animationEnabled: false,
  theme: 'light2',
  backgroundColor: "#0e0e0e",
  title: {
    text: 'Estadisticas de usuario',
    fontColor: "white",
  },
  axisX: {
    title: 'Año',
    reversed: true,
  },
  axisY: {
    title: 'Numero de Posts',
    labelFormatter: function (e: any) {
      return e.value ;
    },
  },
  data: [
    {
      type: 'column',
      
      dataPoints: this.UserTasksDataChart,
    },
  ],
};
  ngOnInit() {
    this.user_name = this.route.snapshot.paramMap.get('user'); 
    this.user_url = this.route.snapshot.paramMap.get('user_url'); 
    this.user_biography = this.route.snapshot.paramMap.get('user_biography'); 
    this.user_email = this.route.snapshot.paramMap.get('user_email'); 
    this.user_id = this.route.snapshot.paramMap.get('user_id'); 

    this.service.getusertasks(this.user_id).subscribe(data=>{
      this.UserTasks=data;
      this.task_length=this.UserTasks.length;
     this.state = 'show';
    this.state2 = 'enter';
      })
    this.covid_data();     
  }

}

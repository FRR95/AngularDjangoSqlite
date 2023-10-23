import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user:string;
  user_url:string;
  user_biography:string;
  user_email:string;


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('user'); 
    this.user_url = this.route.snapshot.paramMap.get('user_url'); 
    this.user_biography = this.route.snapshot.paramMap.get('user_biography'); 
    this.user_email = this.route.snapshot.paramMap.get('user_email'); 
  }

}

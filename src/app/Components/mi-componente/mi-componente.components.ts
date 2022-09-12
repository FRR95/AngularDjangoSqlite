import { Component, OnInit } from '@angular/core';

@Component({
selector:'mi-NavMenu',
templateUrl: './navmenu.component.html',
styleUrls: ['./navmenu.component.css'],

})
export class NavMenu implements OnInit{

public Link1 : string;
public Link2 : string;



constructor(){
this.Link1="DEPARTMENT";
this.Link2="EMPLOYEE";
}
ngOnInit(): void {
}
}
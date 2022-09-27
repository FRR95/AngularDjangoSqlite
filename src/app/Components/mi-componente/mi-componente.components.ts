import { Component, OnInit } from '@angular/core';

@Component({
selector:'mi-NavMenu',
templateUrl: './navmenu.component.html',
styleUrls: ['./navmenu.component.css'],

})
export class NavMenu implements OnInit{

public Link1 : string;
public Link2 : string;
public Link3 : string;
public Link4 : string;



constructor(){
this.Link1="DEPARTMENT";
this.Link2="EMPLOYEE";
this.Link3="SIGNIN";
this.Link4="LOGIN";

}
ngOnInit(): void {
}
}
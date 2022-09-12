import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edades',
  templateUrl: './edades.component.html',
  styleUrls: ['./edades.component.css']
})
export class EdadesComponent implements OnInit {
edad:number;

  constructor() {
  this.edad = 18;
   }

  ngOnInit(): void {
  }

aumentarEdad(){
this.edad = this.edad + 1;
}
disminuirEdad(){
  this.edad--;
  }

}

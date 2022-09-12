import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule  } from '@angular/router';




import {AppComponent}   from './app.component';
import {NavMenu}   from './Components/mi-componente/mi-componente.components';
import { FooterComponent } from './Components/footer/footer.component';
import { EdadesComponent } from './Components/edades/edades.component';
import { SliderComponent } from './Components/slider/slider.component';
import { DepartmentComponent } from './Components/department/department.component';
import { EmployeeComponent } from './Components/employee/employee.component';

const rutas: Routes = [
  { path: '', component: DepartmentComponent},
  { path: 'Departments', component:DepartmentComponent },
  { path: 'Employees', component:EmployeeComponent },

 

  
  
  
  
  { path: '**',redirectTo:'/' ,pathMatch:'full'}
  ];

@NgModule({
  declarations: [
    AppComponent,
    NavMenu,
    FooterComponent,
    EdadesComponent,
    SliderComponent,
    DepartmentComponent,
    EmployeeComponent
    
  ],
  imports: [
    BrowserModule,
   
    RouterModule.forRoot(rutas),

    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule  } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





import {AppComponent}   from './app.component';
import {NavMenu}   from './Components/mi-componente/mi-componente.components';
import { FooterComponent } from './Components/footer/footer.component';
import { EdadesComponent } from './Components/edades/edades.component';
import { SliderComponent } from './Components/slider/slider.component';
import { DepartmentComponent } from './Components/department/department.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { ConectionsService } from 'src/app/services/conections.service';
import { AddEditDepartmentComponent } from './Components/add-edit-department/add-edit-department.component';
import { AddEditEmployeeComponent } from './Components/add-edit-employee/add-edit-employee.component';


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
    EmployeeComponent,
    AddEditDepartmentComponent,
    AddEditEmployeeComponent,

    
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(rutas),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
   
    


    
  
  ],
  providers: [ConectionsService],
  bootstrap: [AppComponent]
})
export class AppModule { } 


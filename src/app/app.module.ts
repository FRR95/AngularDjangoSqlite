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
import { LoginComponent } from './Components/login/login.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { UserDetailsComponent } from './Components/user-details/user-details.component';


const rutas: Routes = [
  { path: '', component: DepartmentComponent},
  { path: 'Departments', component:DepartmentComponent },
  { path: 'Employees', component:EmployeeComponent },
  { path: 'signin', component:SignInComponent },
  { path: 'login', component:LoginComponent },
  { path: 'edit', component:EdadesComponent },
  { path: 'addedit', component:AddEditDepartmentComponent },
  { path: 'userdetails', component:UserDetailsComponent },
  {path:'edit/:id/:name/:logo/:img', component:EdadesComponent},
  { path: 'userdetails/:user/:user_url/:user_biography/:user_email/:user_id', component:UserDetailsComponent },

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
    LoginComponent,
    SignInComponent,
    UserDetailsComponent,

    
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


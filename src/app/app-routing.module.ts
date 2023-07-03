import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { WorksListComponent } from './componentes/works-list/works-list.component';
import { CanActivate } from '@angular/router';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { getRedirectResult } from '@angular/fire/auth';
const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'/main'},
  {path:'main',component: HomeComponent,
  ...canActivate(()=>redirectUnauthorizedTo(['/login']))},
  {path:'login', component: LoginComponent,...canActivate(()=>redirectLoggedInTo(['main']))},
  {path:'item/:id',component:WorksListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

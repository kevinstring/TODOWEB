import { HttpClientModule } from '@angular/common/http';
import { NgModule,ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { WorksListComponent } from './componentes/works-list/works-list.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './componentes/login/login.component';
import { FirebaseApp, FirebaseAppModule, provideFirebaseApp } from '@angular/fire/app';
import {provideAuth,getAuth} from '@angular/fire/auth'
import { initializeApp } from 'firebase/app';
import { PipesPipe } from './pipes.pipe';
import { FechaPipe } from './pipes/fecha.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorksListComponent,
    LoginComponent,
    PipesPipe,
    FechaPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FirebaseAppModule,
    provideFirebaseApp(()=>initializeApp(environment.firebase)),
    provideAuth(()=>getAuth()),
    CommonModule
    
  ],
  providers: [FormsModule,FormData],
  bootstrap: [AppComponent]
})
export class AppModule { }

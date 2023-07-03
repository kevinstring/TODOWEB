import { Component, OnInit, Pipe } from '@angular/core';
import { FirebaseApp, firebaseApp$, getApp } from '@angular/fire/app';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { getDatabase,ref,onValue} from 'firebase/database';
import { async, map, pipe } from 'rxjs';
import { DataService } from 'src/app/servicios/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private servicio:DataService){}
 app=initializeApp(environment.firebase)
  formLog:any;
  error='';
  creado='';
ngOnInit(): void {
  console.log(this.app)
  this.formLog= new FormGroup({
    usuario:new FormControl('',Validators.required),
    contrasena: new FormControl ('',Validators.required)
  })    
  

}

 ingresar(){
  console.log(this.formLog.value.usuario)

  this.servicio.crearLogin(this.formLog.value.usuario,this.formLog.value.contrasena,this.creado)
}

logout(){
    this.servicio.logout().then((response)=>console.log(response));
 
}

}

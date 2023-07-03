import { ChangeDetectorRef, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { TareaRealizada, Tareas } from '../interfaces/tareas';
import { environment } from 'src/environments/environment.development';
import { Database } from '@angular/fire/database';
import { FirebaseApp, FirebaseAppModule, initializeApp } from '@angular/fire/app';
import { BehaviorSubject, map } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private datos= new BehaviorSubject<any>(null);
  private datos2 = new BehaviorSubject<any>(null);
private algo= new BehaviorSubject(null);
 app = initializeApp(environment.firebase)
 auth=getAuth();
 uid:any;
  constructor(private url:HttpClient) {
 
   }
   
 post(tarea:any){
    return this.url.post<{[id:string]:Tareas}>(`https://tareas-9b22b-default-rtdb.firebaseio.com/tareas/.json`,tarea);
  }

  realizada(tareaRealizada:TareaRealizada){
    return this.url.post<{[id:string]:TareaRealizada}>(`https://tareas-9b22b-default-rtdb.firebaseio.com/tareasRealizadas/.json`,tareaRealizada)
  }

  realizadoVer(id:string){
    return this.url.get(`https://tareas-9b22b-default-rtdb.firebaseio.com/tareas/${id}.json`)
    .pipe(map((a)=>{
     
      const datos:TareaRealizada[]=[];
      const fecha:Date = new Date();
      for(let i in a){
        datos.push({...a[i],id})
      } 

      return a;
   
    }))
  }


  verTareasHechas(){
    return this.url.get(`https://tareas-9b22b-default-rtdb.firebaseio.com/tareasRealizadas/.json`)
    .pipe(map((a)=>{
     
      let datos:TareaRealizada[]=[];
      const fecha:Date = new Date();
      for(let i in a){
        datos.push({...a[i]})
      } 
      this.datos2.next(datos);
      return datos;
   
    }))

  }

ver(){
    return this.url.get(`https://tareas-9b22b-default-rtdb.firebaseio.com/tareas/.json`)
    .pipe(map((post)=>{
      let datos:Tareas[]=[];
      for(let id in post){
        datos.push({...post[id],id})
     
      }
      this.datos.next(datos);
      return datos;
    
    }))
  }

  eliminar(a:any){
    return this.url.delete<any>(`https://tareas-9b22b-default-rtdb.firebaseio.com/tareas/${a}.json`)
  
   
  }

  eliminarHecha(a:string){
    return this.url.delete<any>(`https://tareas-9b22b-default-rtdb.firebaseio.com/tareasRealizadas/${a}.json`)
  }

  update(form:any,id:string){
    const headers = new HttpHeaders({'content-type': 'aplication/json'})
    return this.url.put(`https://tareas-9b22b-default-rtdb.firebaseio.com/tareas/${id}.json`,form,{headers:headers});
     
  }

getdatos(){
  return this.datos.asObservable();
}
getdatos2(){
  return this.datos2.asObservable();
}

crearLogin(formusuario,formcontra,creado){

console.log(this.auth)
signInWithEmailAndPassword(this.auth,formusuario,formcontra)
.then((userCredential) =>{
  console.log(userCredential)
  const user=userCredential.user;
  creado='UsuarioCreado';
})
.catch((error)=>{
  const errormessaje=error.code;
  const errorCode=error.message;
  const err=error.message;
  console.log(errorCode)
})

}


datosUsario(){
   return this.auth.currentUser.email
}
logout(){
  const auth=getAuth();

  return signOut(this.auth);
}

}

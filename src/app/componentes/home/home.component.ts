import { AfterContentInit, ChangeDetectorRef, Component, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Tareas } from 'src/app/interfaces/tareas';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  datos:Tareas[]=[];
  objeto:any;
  nombre:string='';
  formulario:any;
  correcto=false;
 boton=false;
  nombreusuario:any;
      constructor(public servicio:DataService,private router:Router){}
  ngOnInit(): void {

    this.nombreusuario=this.servicio.datosUsario();
    this.formulario = new FormGroup({
      titulo:new FormControl('',Validators.required),
      descripcion: new FormControl('',Validators.required)
     
    })

  }

   
  submit(){
   
      this.objeto=this.formulario.value;
      console.log(this.objeto)
      this.servicio.post(this.objeto).subscribe((a:any)=>{
        console.log(a.name); this.nombre=a.name;;this.servicio.ver().subscribe(()=> {this.boton=false;console.log(this.boton)})})
       

      }
      logout(){
        this.servicio.logout().then((response)=>this.router.navigate(['login']));
        
    }  
}



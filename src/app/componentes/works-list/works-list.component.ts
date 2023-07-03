import { ChangeDetectorRef, OnChanges, SimpleChanges, ViewChildren } from '@angular/core';
import { AfterContentInit,  AfterViewInit,  Component, ElementRef, EventEmitter, Input, OnInit,Output,Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { async, asyncScheduler } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Tareas } from 'src/app/interfaces/tareas';
import { DataService } from 'src/app/servicios/data.service';
import { TareaRealizada } from '../../interfaces/tareas';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-works-list',
  templateUrl: './works-list.component.html',
  styleUrls: ['./works-list.component.css']
})

export class WorksListComponent implements OnInit{

 
@ViewChild('delete') delete:ElementRef;
hola:any;
del:any;
check=false;
borrado:string='background-color:red';
objeto?:{titulo:'a',descripcion:'a'};
disable:""
id:any;
numero=0;
tareas: Tareas[];
disableB=false;
formularie:any;
tareasRealizadass: TareaRealizada[];
tareasRealizadas:TareaRealizada[]=[];
  constructor(private servicio:DataService, private cambios:ChangeDetectorRef){
   
      this.servicio.ver().subscribe((a:any)=>
      {(this.datos=a);});
      console.log('si')
    
  
  }

@Input() boton:any;
formulario:any;
@Input() datos:Tareas[]=[];
  ngOnInit(): void {
    this.servicio.getdatos().subscribe((data: Tareas[]) => {
      this.tareas = data});
      this.servicio.verTareasHechas().subscribe((data: TareaRealizada[]) => {
        this.tareasRealizadas = data;
      });
    this.servicio.getdatos().subscribe(datos=>{this.datos=datos;console.log(datos)})

this.formulario = new FormGroup({
  titulo:new FormControl('',Validators.required),
  descripcion: new FormControl('',Validators.required)

})

  }
 

 @Input() correcto:any;
  salir='';
  cerrarEditar:String='none';
  si=false;
  eliminar(a:any){
this.servicio.eliminar(a).subscribe((aa)=>{this.servicio.ver().subscribe((a:any)=>
{(this.datos=a);});
;this.del= setInterval(()=>{this.salir='none';}, 2000) });;  this.correcto=true;   
   
      console.log() 
   this.salir=''

  }
  edit(a,e,i){
    // this.objeto={titulo:a,descripcion:e}  
 console.log('sin datos')
    console.log(e)
    console.log(a)
    this.id=i;
    this.cerrarEditar='';
    this.si=true;
    this.formulario.setValue({
      titulo: a,
      descripcion:e
    })
    console.log(this.formulario.value);
  }
  editar(){
    this.objeto=this.formulario.value;
    let s:any;
    this.servicio.update(this.objeto,this.id).subscribe((a)=>{this.servicio.ver().subscribe(a=>console.log(a))})
    this.cerrarEditar='none'
 
}
cerrar(){
  this.cerrarEditar='none'
}

siguiente(){
  this.numero+=5;
console.log("A")
}
atras(){
  if(this.numero>0){  this.numero-=5;
console.log("A")}

}

realizada(id: string) {
  const tarea = this.tareas.find(t => t.id === id);
  const tareaRealizada: TareaRealizada = {
    fecha: new Date(),
    id: tarea.id,
    titulo: tarea.titulo,
    descripcion: tarea.descripcion
  };
  this.servicio.realizada(tareaRealizada).subscribe(() => {
    this.tareasRealizadas.push(tareaRealizada);
    this.tareas = this.tareas.filter(t => t.id !== id);
    this.cambios.detectChanges();
this.eliminar(id);
  });
}
}

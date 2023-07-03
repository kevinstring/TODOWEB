import { Pipe, PipeTransform } from '@angular/core';
import { Tareas } from './interfaces/tareas';

@Pipe({
  name: 'pipes'
})
export class PipesPipe implements PipeTransform {

  transform(tarea: Tareas[], index:number=0 ):Tareas[] {
    return tarea.slice(index,index+5);
  }


}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: Date): string {
    const month = value.getMonth() + 1; // los meses empiezan desde 0, por lo que sumamos 1
    const day = value.getDate();
    const hours = value.getHours();
    const minutes = value.getMinutes();
    
    return `${month}/${day}/${hours}:${minutes}`;
  }

}

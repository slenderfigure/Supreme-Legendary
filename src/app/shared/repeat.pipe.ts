import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repeat'
})
export class RepeatPipe implements PipeTransform {
  transform(times?: number): any[] {
    return new Array(times || 0);
  }
}
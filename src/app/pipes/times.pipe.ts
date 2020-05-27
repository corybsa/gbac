import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'times'
})
export class TimesPipe implements PipeTransform {

  transform(value: number): Iterable<any> {
    return Array(value).fill(0);
  }

}

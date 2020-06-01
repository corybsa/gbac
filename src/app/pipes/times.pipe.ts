import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'times'
})
export class TimesPipe implements PipeTransform {

  /**
   * Returns an iterable of n length.
   * @param value The length of the iterable
   */
  transform(value: number): Iterable<any> {
    return Array(value).fill(0);
  }

}

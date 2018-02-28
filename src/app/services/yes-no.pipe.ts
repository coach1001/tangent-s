import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'YesNo'
})
export class YesNoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value) {
      return 'Yes';
    } else {
      return 'No';
    }
  }

}

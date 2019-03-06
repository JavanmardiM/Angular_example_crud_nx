import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-jalaali';

@Pipe({
  name: 'persianDate'
})
export class PersianDatePipe implements PipeTransform {

  transform(date: any, args?: any): any {
    return moment(date).format('jYYYY/jMM/jDD');
  }

}

import {Pipe} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'dateFormat'
})
export class DateUtils {
  isRequestIntervalValid(startDate: Date, endDate: Date): boolean {
    const timeDiff = endDate.getTime() - startDate.getTime();
    return timeDiff > 0;
  }

}


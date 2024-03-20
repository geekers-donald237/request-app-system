import {Pipe} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'dateFormat'
})
export class DateUtils {
[x: string]: any;
private _pipe1(arg0: string) {
throw new Error('Method not implemented.');
}
  isRequestIntervalValid(startDate: Date, endDate: Date): boolean {
    const timeDiff = endDate.getTime() - startDate.getTime();
    return timeDiff > 0;
  }

}


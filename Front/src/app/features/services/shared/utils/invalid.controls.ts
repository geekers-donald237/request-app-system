import { AbstractControl } from '@angular/forms';

export const CustomValidators = {
  dateRange: (control: AbstractControl) => {
    const date1 = control?.parent?.get('publicationDateS1')?.value;
    const date2 = control?.value;

    if (date1 && date2 && date2 <= date1) {
      return { invalidDateRange: true };
    }

    return null;
  },
};


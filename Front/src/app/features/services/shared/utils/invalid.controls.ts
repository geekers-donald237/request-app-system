// class InvalidControls {
//   private addDeadlineForm;
//
//   public submitForm() {
//     console.log('État du formulaire avant la soumission :', this.addDeadlineForm.value);
//     if (this.addDeadlineForm.valid) {
//       console.log('Formulaire valide, soumission en cours...');
//       // Logique de soumission
//     } else {
//       console.log('Formulaire invalide');
//       // Affichez les contrôles invalides
//       const invalidControls = this.findInvalidControls();
//       console.log('Contrôles invalides :', invalidControls);
//     }
//   }
//
//
//   public findInvalidControls() {
//     const invalid: string[] = [];
//     const controls = this.addDeadlineForm.controls;
//     for (const name in controls) {
//       if (controls.hasOwnProperty(name) && controls[name as keyof typeof controls].invalid) {
//         invalid.push(name);
//         console.log(`Contrôle invalide ${name}:`, controls[name as keyof typeof controls]);
//       }
//     }
//     return invalid;
//   }
//
// }

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


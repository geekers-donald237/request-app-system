import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../../services/student/request.service";

@Component({
  selector: 'app-add-individual-request',
  templateUrl: './add-individual-request.component.html',
  styleUrls: ['./add-individual-request.component.scss']
})
export class AddIndividualRequestComponent {
  requestForm = this.fb.group({
    requestPatternId: ['', Validators.required],
    title: ['', Validators.required],
    content: ['', Validators.required],
    fileHandWritten: [null, Validators.required],
    fileAttachments: [null, Validators.required],
    receiver_id: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private requestService: RequestService) {
    this.requestForm = this.fb.group(
      {
        requestPatternId: ['', Validators.required],
        title: ['', Validators.required],
        content: ['', Validators.required],
        fileHandWritten: [null, Validators.required],
        fileAttachments: [null, Validators.required],
        receiver_id: ['', Validators.required],
      }
    );
  }

  get requestPatternId() {
    return this.requestForm.controls['requestPatternId'];
  }

  get title() {
    return this.requestForm.controls['title'];
  }

  get content() {
    return this.requestForm.controls['content'];
  }

  get fileHandWritten() {
    return this.requestForm.controls['fileHandWritten'];
  }

  get fileAttachments() {
    return this.requestForm.controls['fileAttachments'];
  }

  get receiver_id() {
    return this.requestForm.controls['receiver_id'];
  }

  sendRequest() {
    if (this.requestForm.valid) {
      const requestData = this.requestForm.value;
      this.requestService.sendRequest(requestData).subscribe(
        (response) => {
          console.log('Requête envoyée avec succès:', response);
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de la requête:', error);
        }
      );
    } else {
      console.error('Le formulaire n\'est pas valide.');
    }
  }
}

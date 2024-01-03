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
    'fileAttachments[]': [null, Validators.required],
    receiver_id: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private requestService: RequestService) {
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
    return this.requestForm.controls['fileAttachments[]'];
  }

  get receiver_id() {
    return this.requestForm.controls['receiver_id'];
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.requestForm.patchValue({
        fileHandWritten: file

      });
    }
  }

  onFileAttachmentsChange(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.requestForm.patchValue({
        'fileAttachments[]': files
      });
    }
  }

  sendRequest() {
    if (this.requestForm.valid) {
      const formData = new FormData();

      // Ajouter le fichier pour fileHandWritten
      const fileHandWritten = this.requestForm.get('fileHandWritten')?.value;
      if (fileHandWritten !== null && fileHandWritten !== undefined) {
        formData.append('fileHandWritten', fileHandWritten);
      }

      // Ajouter les fichiers pour FilesAttachments
      // const filesAttachments = this.requestForm.get('fileAttachments[]')?.value;
      // if (filesAttachments !== null && filesAttachments !== undefined) {
      //   for (let i = 0; i < filesAttachments.length; i++) {
      //     const file = filesAttachments[i];
      //     formData.append('fileAttachments[]', file);
      //   }
      // }

      // Ajouter les autres champs au FormData
      Object.entries(this.requestForm.value).forEach(([key, value]) => {
        if (!['fileHandWritten', 'fileAttachments[]'].includes(key)) {
          formData.append(key, value !== null ? value : '');
        }
      });

      this.requestService.sendRequest(formData).subscribe(
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

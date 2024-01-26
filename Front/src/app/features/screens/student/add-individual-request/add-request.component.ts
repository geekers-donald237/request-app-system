import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../../services/request/request.service";
import {Router} from "@angular/router";
import {IRequestPattern, IRequestPatternsResponse} from "../../../models/request.patterns.model";
import {forkJoin} from "rxjs";
import {requestModel} from "../../../constant/constant";
import {UeService} from "../../../services/ue/ue.service";
import {Utils} from "../../../services/shared/utils/utils";
import {ICourse, IStudentSchoolDataResponse} from "../../../models/student.school.model";

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {
  visible = false;
  dismissible = true;
  courses: ICourse[] = [];
  selectedUeId: null | number | undefined;

  afficherAlerte: boolean = false;
  errorMessage: string | undefined;
  color: string | undefined;
  requestPatterns: IRequestPattern[] = [];
  requestForm = this.fb.group({
    requestPatternId: ['', Validators.required],
    title: ['', Validators.required],
    content: ['', Validators.required],
    fileHandWritten: [null, Validators.required],
    'fileAttachments[]': [null, Validators.required],
    ueId: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private router: Router, private requestService: RequestService, private utils: Utils
    , private ueService: UeService) {
  }

  get requestPatternId() {
    return this.requestForm.controls['requestPatternId'];
  }

  get title() {
    return this.requestForm.controls['title'];
  }

  get ue() {
    return this.requestForm.controls['ueId'];
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

  ngOnInit() {
    this.fetchData();
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
    if (!this.requestForm.valid) {
      this.errorMessage = 'Le formulaire n\'est pas valide.';
      return;
    }

    const formData = this.createFormData();
    const ueId = 1;

    this.requestService.saveRequest(formData).subscribe(
      (response) => {
        console.log('Requête envoyée avec succès:', response);

        if (response.isSaved) {
          this.handleSuccessfulRequest(response, ueId);
        }
      },
      (error) => {
        console.error('Erreur lors de l\'envoi de la requête:', error);
        this.handleFailedRequest();
      }
    );

  }

  fermerAlerte() {
    this.afficherAlerte = false;
  }

  private handleSuccessfulRequest(response: any, ueId: number): void {
    this.sendRequestDetails(response.requestId, ueId);
    this.color = 'success';
    this.errorMessage = 'Requête envoyée avec succès.';
    this.afficherAlerte = true;
    setTimeout(() => {
      this.fermerAlerte();
    }, 3000);

  }

  private handleFailedRequest(): void {
    this.color = 'danger';
    this.errorMessage = 'Erreur lors de l\'envoi de la requête.';
  }


  private createFormData(): FormData {
    const formData = new FormData();

    // Ajoute les fichiers
    this.appendFile('fileHandWritten', this.requestForm.get('fileHandWritten')?.value, formData);
    const filesAttachments = this.requestForm.get('fileAttachments[]')?.value;
    this.appendFiles('fileAttachments[]', filesAttachments, formData);

    // Ajoute les autres champs au FormData
    Object.entries(this.requestForm.value)
      .filter(([key]) => !['fileHandWritten', 'fileAttachments[]'].includes(key))
      .forEach(([key, value]) => formData.append(key, value !== null ? value : ''));

    return formData;
  }

  private appendFile(key: string, file: any, formData: FormData): void {
    if (file !== null && file !== undefined) {
      formData.append(key, file);
    }
  }

  private appendFiles(key: string, files: any, formData: FormData): void {
    const filesArray = files as unknown as File[];
    for (const file of filesArray) {
      formData.append(key, file);
    }
  }

  private sendRequestDetails(requestId: number, ueId: number): void {
    this.requestService.sendRequest(requestId, ueId).subscribe(

      (saveResponse) => {

        console.log('Détails de la requête enregistrés avec succès:', saveResponse);
        this.router.navigate(['/app/list-requests']);
      },
      (saveError) => {
        console.error('Erreur lors de l\'enregistrement des détails de la requête:', saveError);

      }
    );
  }


  private fetchData(): void {
    const userId = this.utils.getUserIdFromLocalStorage();

    // Modifiez la signature de la fonction de rappel dans votre subscribe
    forkJoin([
      this.requestService.getRequestPatterns(),
      this.ueService.getStudentInfo(userId)
    ]).subscribe(
      ([requestPatternsResponse, studentSchoolData]: [IRequestPatternsResponse, IStudentSchoolDataResponse]) => {
        this.handleRequestPatternsResponse(requestPatternsResponse);
        this.courses = studentSchoolData.data.courses;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }


  private handleRequestPatternsResponse(response: IRequestPatternsResponse): void {
    this.requestPatterns = response.patterns;
  }

  protected requestModel = requestModel;
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../../services/request/request.service";
import {Router} from "@angular/router";
import {IRequestPattern} from "../../../models/request.patterns.model";
import {requestModel} from "../../../constant/constant";
import {UeService} from "../../../services/ue/ue.service";
import {Utils} from "../../../services/shared/utils/utils";
import {IUe} from "../../../models/ue.model";
import {RequestPatternService} from "../../../services/shared/request-pattern/request-pattern.service";
import {CourseService} from "../../../services/shared/course/courses.service";

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {
  visible = false;
  dismissible = true;
  courses: IUe[] = [];

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

  constructor(private fb: FormBuilder, private router: Router, private requestService: RequestService, private utils: Utils,
              private ueService: UeService, private requestPatternService: RequestPatternService, private courseService: CourseService) {

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
    const formData = this.createFormData();
    const ueId = 1;

    this.requestService.saveRequest(formData).subscribe(
      (response) => {
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
        console.log(saveResponse.message);
        console.log('Détails de la requête enregistrés avec succès:', saveResponse);
        this.router.navigate(['/app/list-requests']);
        if (saveResponse.isSent) {
        } else {
          this.color = 'danger';
          this.errorMessage = saveResponse.message;
          this.afficherAlerte = true;
          this.router.navigate(['/app/list-requests']);
        }
      },
      (saveError) => {
        console.error('Erreur lors de l\'enregistrement des détails de la requête:', saveError);
      }
    );
  }

  private fetchRequestPatterns(): void {
    this.requestPatternService.fetchRequestPatterns();
    this.requestPatternService.requestPatterns$.subscribe((requestPatterns: IRequestPattern[]) => {
        this.requestPatterns = requestPatterns;
      },
    );
  }

  private fetchStudentInfo(): void {
    this.courseService.fetchData();
    this.courseService.courses$.subscribe((courses) => {
      this.courses = courses;
    });
  }

  private fetchData(): void {
    this.fetchRequestPatterns();
    this.fetchStudentInfo();
  }

  protected requestModel = requestModel;
}

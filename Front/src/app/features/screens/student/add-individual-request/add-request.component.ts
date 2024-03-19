import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../../services/request/request.service";
import {Router} from "@angular/router";
import {IRequestPattern} from "../../../models/request.patterns.model";
import {requestModel} from "../../../constant/constant";
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
  isLoading = false;
  isReadonly = false;
  dismissible = true;
  message: string | undefined;
  courses: IUe[] = [];
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

  constructor(private fb: FormBuilder, private router: Router, private requestService: RequestService, private requestPatternService: RequestPatternService, private courseService: CourseService) {
  }

  ngOnInit() {
    this.fetchData();
  }

  // FIELDS VALIDATION
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


  // FILE CONFIGURATION FOR DOM MANIPULATION
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


// CREATE FORM DATA
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


// REQUEST INFORMATION AND STUDENT INFOS....
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

  sendRequest() {
    this.isLoading = true
    this.isReadonly = true
    const formData = this.createFormData();
    const ueId = 1;

    this.requestService.saveRequest(formData).subscribe(
      (response) => {
        if (response.isSaved) {
          this.sendRequestDetails(response.requestId, ueId);
        }
      },
      (error) => {
        this.showMessage('An error occurred. Please try again later.', "danger");
        setTimeout(() => {
          this.isLoading = false;
          this.isReadonly = false;
        }, 2000);
      }
    );

  }


  // REQUEST OPERATION

  private sendRequestDetails(requestId: number, ueId: number): void {
    this.requestService.sendRequest(requestId, ueId).subscribe(
      (saveResponse) => {
        if (saveResponse.isSent) {
          this.showMessage(saveResponse.message, 'success');
        } else {
          this.showMessage(saveResponse.message, 'warning');
        }
        setTimeout(() => {
          this.isLoading = false;
          this.isReadonly = false;
          this.router.navigate(['/app/list-requests']);
        }, 1000);
      },
      (saveError) => {
        this.showMessage(saveError.message, 'danger')
      }
    );


  }


  // DISPLAY SOME ISSUE OR ERROR
  showMessage(message: string, color: string): void {
    this.message = message;
    this.visible = true;
    this.color = color;
  }

  protected requestModel = requestModel;
}

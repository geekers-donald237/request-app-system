import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../../services/request/request.service";
import {IGetStaffResponse, IStaffMember} from "../../../models/staff.member.model";
import {Router} from "@angular/router";
import {IRequestPattern, IRequestPatternsResponse} from "../../../models/request.patterns.model";
import {StaffService} from "../../../services/staff/staff.service";
import {forkJoin} from "rxjs";
@Component({
  selector: 'app-add-individual-request',
  templateUrl: './add-individual-request.component.html',
  styleUrls: ['./add-individual-request.component.scss']
})
export class AddIndividualRequestComponent implements OnInit {

  requestPatterns: IRequestPattern[] = [];
  staffList: IStaffMember[] = [];
  afficherAlerte: boolean = false;
  requestForm = this.fb.group({
    requestPatternId: ['', Validators.required],
    title: ['', Validators.required],
    content: ['', Validators.required],
    fileHandWritten: [null, Validators.required],
    'fileAttachments[]': [null, Validators.required],
    receiver_id: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private router: Router, private requestService: RequestService, private staffService: StaffService) {
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
      console.error('Le formulaire n\'est pas valide.');
      return;
    }

    const formData = this.createFormData();
    // const receiverId = this.requestForm.get('receiver_id')?.value;
    const receiverId = 1;
    this.requestService.saveRequest(formData).subscribe(
      (response) => {
        console.log('Requête envoyée avec succès:', response);
        if (response.isSaved) {
          this.sendRequestDetails(response.requestId, receiverId);
        }
      
      },
      (error) => {
        console.error('Erreur lors de l\'envoi de la requête:', error);
      }
    );
    this.afficherAlerte = true;
    setTimeout(() => {
      this.fermerAlerte();
    }, 3000);
  }
  fermerAlerte() {
    this.afficherAlerte = false;
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

  private sendRequestDetails(requestId: number, receiverId: number): void {
    const receiverIds = [receiverId];
    this.requestService.sendRequest(requestId, receiverIds).subscribe(
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
    forkJoin([
      this.requestService.getRequestPatterns(),
      this.staffService.getStaffMembers()
    ]).subscribe(
      ([requestPatternsResponse, staffMembersResponse]: [IRequestPatternsResponse, IGetStaffResponse]) => {
        this.handleRequestPatternsResponse(requestPatternsResponse);
        this.handleStaffMembersResponse(staffMembersResponse);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }

  private handleRequestPatternsResponse(response: IRequestPatternsResponse): void {
    this.requestPatterns = response.patterns;
  }

  private handleStaffMembersResponse(response: IGetStaffResponse): void {
    if (response.status === 200) {
      this.staffList = response.staff;
    } else {
      console.error('Erreur lors de la récupération de la liste des enseignants. Statut:', response.status);
    }
  }
}

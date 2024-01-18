// import {Component, OnInit} from '@angular/core';
// import {FormBuilder, Validators} from "@angular/forms";
// import {RequestService} from "../../../services/student/request.service";
// import {IGetStaffResponse, IStaffMember} from "../../../models/staffmember.model";
// import {Router} from "@angular/router";
//
// @Component({
//   selector: 'app-add-individual-request',
//   templateUrl: './add-individual-request.component.html',
//   styleUrls: ['./add-individual-request.component.scss']
// })
// export class AddIndividualRequest implements OnInit {
//
//   requestPatterns: any[] = [];
//   staffList: IStaffMember[] = [];
//
//   requestForm = this.fb.group({
//     requestPatternId: ['', Validators.required],
//     title: ['', Validators.required],
//     content: ['', Validators.required],
//     fileHandWritten: [null, Validators.required],
//     'fileAttachments[]': [null, Validators.required],
//     receiver_id: ['', Validators.required],
//   });
//
//   constructor(private fb: FormBuilder, private router: Router, private requestService: RequestService) {
//   }
//
//   get requestPatternId() {
//     return this.requestForm.controls['requestPatternId'];
//   }
//
//   get title() {
//     return this.requestForm.controls['title'];
//   }
//
//   get content() {
//     return this.requestForm.controls['content'];
//   }
//
//   get fileHandWritten() {
//     return this.requestForm.controls['fileHandWritten'];
//   }
//
//   get fileAttachments() {
//     return this.requestForm.controls['fileAttachments[]'];
//   }
//
//   get receiver_id() {
//     return this.requestForm.controls['receiver_id'];
//   }
//
//   ngOnInit() {
//     this.requestService.getRequestPatterns().subscribe(
//       (response) => {
//         this.requestPatterns = response.patterns;
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des motifs de requête:', error);
//       }
//     );
//
//     this.requestService.getAllStaff().subscribe(
//       (response: IGetStaffResponse) => {
//         if (response.status === 200) {
//           this.staffList = response.staff;
//         } else {
//           console.error('Erreur lors de la récupération de la liste des enseignants. Statut:', response.status);
//         }
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération de la liste des enseignants:', error);
//       }
//     );
//   }
//
//   onFileChange(event: any) {
//     if (event.target.files.length > 0) {
//       const file = event.target.files[0];
//       this.requestForm.patchValue({
//         fileHandWritten: file
//
//       });
//     }
//   }
//
//   onFileAttachmentsChange(event: any) {
//     if (event.target.files.length > 0) {
//       const files = event.target.files;
//       this.requestForm.patchValue({
//         'fileAttachments[]': files
//       });
//     }
//   }
//
//   sendRequest() {
//     if (this.requestForm.valid) {
//       const formData = new FormData();
//
//       const fileHandWritten = this.requestForm.get('fileHandWritten')?.value;
//       if (fileHandWritten !== null && fileHandWritten !== undefined) {
//         formData.append('fileHandWritten', fileHandWritten);
//       }
//
//       const filesAttachments = this.requestForm.get('fileAttachments[]')?.value;
//       if (filesAttachments !== null && filesAttachments !== undefined) {
//         const filesArray = filesAttachments as unknown as File[];
//
//         for (let i = 0; i < filesArray.length; i++) {
//           const file = filesArray[i];
//           formData.append('fileAttachments[]', file);
//         }
//       }
//
//       // Ajouter les autres champs au FormData
//       Object.entries(this.requestForm.value).forEach(([key, value]) => {
//         if (!['fileHandWritten', 'fileAttachments[]'].includes(key)) {
//           formData.append(key, value !== null ? value : '');
//         }
//       });
//       const receiverId = this.requestForm.get('receiver_id')?.value;
//
//
//       this.requestService.sendRequest(formData).subscribe(
//         (response) => {
//           console.log('Requête envoyée avec succès:', response);
//
//           if (response.isSaved) {
//             const requestId = response.requestId;
//
//             const receiverId = this.requestForm.get('receiver_id')?.value;
//
//             if (receiverId !== null && receiverId !== undefined) {
//               // Convertir la chaîne de caractères en nombre
//               const receiverIds = [parseInt(receiverId, 10)];
//
//               this.requestService.saveRequestDetails(requestId, receiverIds).subscribe(
//                 (saveResponse) => {
//                   console.log('Détails de la requête enregistrés avec succès:', saveResponse);
//                   this.router.navigate(['/app/list-requests']);
//                 },
//                 (saveError) => {
//                   console.error('Erreur lors de l\'enregistrement des détails de la requête:', saveError);
//                 }
//               );
//             } else {
//               console.error('Destinataire non sélectionné.');
//             }
//
//           }
//         },
//         (error) => {
//           console.error('Erreur lors de l\'envoi de la requête:', error);
//         }
//       );
//     } else {
//       console.error('Le formulaire n\'est pas valide.');
//     }
//   }
// }

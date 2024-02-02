import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Assurez-vous d'avoir le bon chemin pour votre formulaire

@Component({
  selector: 'app-votre-composant',
  templateUrl: './votre-composant.component.html',
  styleUrls: ['./votre-composant.component.css']
})
export class VotreComposantComponent implements OnInit {
  // ...

  editForm: FormGroup; // Formulaire pour les champs de modification

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    // Initialiser le formulaire ici avec les champs que vous avez mentionnés
    this.editForm = this.fb.group({
      newPublicationDate: ['', [Validators.required]],
      newSendingRequestInterval: ['', [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  ngOnInit(): void {
    // ...
  }

  // Méthode pour ouvrir la modal
  openEditModal(content: any): void {
    this.modalService.open(content, { centered: true });
  }

  // Méthode appelée lorsqu'un élément est édité
  onEditClick(ue: IUe, content: any): void {
    // Vous pouvez initialiser les champs de modification ici si nécessaire
    this.editForm.setValue({
      newPublicationDate: ue.publication_date,
      newSendingRequestInterval: // Valeur correspondante pour l'intervalle d'envoi
    });

    // Ouvrir la modal
    this.openEditModal(content);
  }

  // Méthode appelée lorsqu'un élément est sauvegardé
  onSave(): void {
    // Accédez aux valeurs du formulaire
    const newPublicationDate = this.editForm.get('newPublicationDate')?.value;
    const newSendingRequestInterval = this.editForm.get('newSendingRequestInterval')?.value;

    // Effectuez les actions nécessaires avec les nouvelles valeurs

    // Fermez la modal
    this.modalService.dismissAll();
  }
}

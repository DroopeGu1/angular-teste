import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

interface DialogDataProps {
  name: string;
  submit: () => void;
}

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataProps) {}

  onSubmit() {
    this.data.submit();
  }
}

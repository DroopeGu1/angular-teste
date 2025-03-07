import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

interface DialogDataProps {
  item?: any;
  submit: (data: any) => void;
}

@Component({
  selector: 'app-client-modal',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: './client-modal.component.html',
  styleUrl: './client-modal.component.scss',
})
export class ClientModalComponent {
  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    salary: new FormControl(null, Validators.required),
    companyValuation: new FormControl(null, Validators.required),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataProps) {}

  ngOnInit(): void {
    if (this.data.item) {
      this.updateForm(this.data.item);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const payload = {
        name: this.form.value.name,
        salary: this.form.value.salary,
        companyValuation: this.form.value.companyValuation,
      };
      this.data.submit(payload);
    }
  }

  updateForm(item: any) {
    this.form.patchValue(item);
  }
}

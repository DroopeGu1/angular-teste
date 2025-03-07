import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private router: Router) {}

  onSubmit() {
    if (this.form.valid) {
      this.router.navigate(['/home'], {
        queryParams: { name: this.form.value.name },
      });
    }
  }
}

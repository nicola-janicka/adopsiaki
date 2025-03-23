import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormArray,
  ReactiveFormsModule,
  Validators,
  FormsModule,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../firebaseService';
import { AdoptionForm } from '../../adoptionForm';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-adoption-form',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.css',
})
export class AdoptionFormComponent implements OnInit {
  adoptionForm!: FormGroup;

  private _snackBar = inject(MatSnackBar);

  constructor(private formBuilder: FormBuilder, private fs: FirebaseService) {}

  ngOnInit(): void {
    this.adoptionForm = this.formBuilder.nonNullable.group({
      dname: new FormControl(''),
      fullname: new FormControl(''),
      email: new FormControl(''),
      age: new FormControl(''),
      experience: new FormControl(''),
    });
  }

  onSubmit() {
    let filledAdoptionForm = new AdoptionForm(
      this.adoptionForm.value['dname'],
      this.adoptionForm.value['fullname'],
      this.adoptionForm.value['email'],
      this.adoptionForm.value['age'],
      this.adoptionForm.value['experience']
    );
    this.fs.addAdoptionForm(filledAdoptionForm);
    this._snackBar.open('Your form has been sent successfully!', 'OK', {
      verticalPosition: 'top',
    });
    this.adoptionForm.reset();
  }
}

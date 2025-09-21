import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
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

import { ActivatedRoute } from '@angular/router';
import { Dog } from '../../dog';
@Component({
  selector: 'app-adoption-form',
  standalone: true,
  imports: [
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

  dog!: Dog;
  constructor(
    private formBuilder: FormBuilder,
    private fs: FirebaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.adoptionForm = this.formBuilder.nonNullable.group({
      dname: new FormControl(''),
      fullname: new FormControl(''),
      email: new FormControl(''),
      age: new FormControl(''),
      experience: new FormControl(''),
    });

    if (id !== null) {
      this.fs.getDog(id).then((dog: Dog) => {
        this.dog = dog;
        this.adoptionForm.controls['dname'].setValue(this.dog.name);
      });
    }
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

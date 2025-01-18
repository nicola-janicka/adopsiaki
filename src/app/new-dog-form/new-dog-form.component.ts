import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
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
import { Dog } from '../../dog';
import { FirebaseService } from '../../firebaseService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-dog-form',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-dog-form.component.html',
  styleUrl: './new-dog-form.component.css',
})
export class NewDogFormComponent implements OnInit {
  newDogForm!: FormGroup;

  private _snackBar = inject(MatSnackBar);

  constructor(private formBuilder: FormBuilder, private fs: FirebaseService) {}

  ngOnInit(): void {
    this.newDogForm = this.formBuilder.nonNullable.group({
      dname: new FormControl(''),
      dage: new FormControl(''),
      dgender: new FormControl(''),
      dweight: new FormControl(''),
      ddescription: new FormControl(''),
    });
  }

  async onSubmit() {
    console.log(this.newDogForm.value);
    let formValues = this.newDogForm.value;
    let newDog = new Dog(
      formValues['dname'],
      formValues['dage'],
      formValues['dgender'],
      formValues['dweight'],
      formValues['ddescription']
    );
    console.log(newDog);
    this.fs.addDog(newDog);
    this._snackBar.open('Dog added!', 'OK');
    this.newDogForm.reset();
  }
}

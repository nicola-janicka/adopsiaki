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

  invalidFields = new Map<string, boolean>();

  constructor(private formBuilder: FormBuilder, private fs: FirebaseService) {}

  ngOnInit(): void {
    this.newDogForm = this.formBuilder.nonNullable.group({
      dogPictures: new FormArray([], [Validators.required]),
      addPicture: new FormControl('', [Validators.required]),
      dname: new FormControl('', [Validators.required]),
      dbreed: new FormControl('', [Validators.required]),
      dage: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]'),
      ]),
      dgender: new FormControl('', [Validators.required]),
      dweight: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]'),
      ]),
      ddescription: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
    });

    Object.keys(this.newDogForm.controls).forEach((key: string) => {
      this.invalidFields.set(key, true);
    });
  }

  async onSubmit() {
    if (this.newDogForm.valid) {
      console.log(this.newDogForm.value);
      let formValues = this.newDogForm.value;
      let newDog = new Dog(
        formValues['dogPictures'],
        formValues['dname'],
        formValues['dbreed'],
        formValues['dage'],
        formValues['dgender'],
        formValues['dweight'],
        formValues['ddescription'],
        new Date()
      );
      console.log(newDog);
      this.fs.addDog(newDog);
      this._snackBar.open('Dog added!', 'OK');
      this.newDogForm.reset();
    } else {
      Object.keys(this.newDogForm.controls).forEach((key: string) => {
        this.invalidFields.set(key, this.newDogForm.controls[key].valid);
      });
      this._snackBar.open('Form is not valid!', 'OK');
    }
  }

  get dogPictures() {
    return this.newDogForm.controls['dogPictures'] as FormArray;
  }
  addNewPicture() {
    let newPicture = this.newDogForm.get('addPicture');
    this.dogPictures.push(new FormControl(newPicture?.value));
    this.newDogForm.controls['addPicture'].reset();
  }

  deletePicture(index: number) {
    this.dogPictures.removeAt(index);
  }
}

import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Dog } from '../../dog';
import { FirebaseService } from '../../firebaseService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-dog-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-dog-form.component.html',
  styleUrl: './edit-dog-form.component.css',
})
export class EditDogFormComponent implements OnInit {
  editDogForm!: FormGroup;

  private _snackBar = inject(MatSnackBar);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

    private fs: FirebaseService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.fs.getDog(id ? id : '').then((dog: Dog) => {
      // this.dogPictures.push(data.pictures);
      // this.editDogForm.controls['dname'] = new FormControl(data.name);
      let pictureControls: FormControl[] = [];
      dog.pictures.forEach((picture) => {
        let newFormControl = new FormControl(picture);
        pictureControls.push(newFormControl);
      });

      this.editDogForm = this.formBuilder.nonNullable.group({
        dogPictures: new FormArray(pictureControls),
        addPicture: new FormControl(),
        dname: new FormControl(dog.name),
        dbreed: new FormControl(dog.breed),
        dage: new FormControl(dog.age),
        dgender: new FormControl(dog.gender),
        dweight: new FormControl(dog.weight),
        ddescription: new FormControl(dog.description),
      });
    });
  }

  async onSubmit() {
    console.log(this.editDogForm.value);
    let formValues = this.editDogForm.value;
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
    const id = this.route.snapshot.paramMap.get('id');
    newDog.setID(id ? id : '');
    console.log(newDog);
    this.fs.editDog(newDog);
    this._snackBar.open('Dog added!', 'OK');
    this.router.navigate(['dogs/']);
  }

  get dogPictures() {
    return this.editDogForm.controls['dogPictures'] as FormArray;
  }
  addNewPicture() {
    let newPicture = this.editDogForm.get('addPicture');
    this.dogPictures.push(new FormControl(newPicture?.value));
    this.editDogForm.controls['addPicture'].reset();
  }
}

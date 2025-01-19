import { FirebaseService } from './../../firebaseService';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  ReactiveFormsModule,
  Validators,
  FormsModule,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent implements OnInit {
  adminLogin!: FormGroup;

  constructor(private formBuilder: FormBuilder, private fs: FirebaseService) {}

  ngOnInit(): void {
    this.adminLogin = this.formBuilder.nonNullable.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    this.fs.getAdmin(this.adminLogin.value['username']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../firebaseService';
import { ActivatedRoute } from '@angular/router';
import { Dog } from '../../dog';

@Component({
  selector: 'app-about-dog',
  standalone: true,
  templateUrl: './about-dog.component.html',
  styleUrl: './about-dog.component.css',
})
export class AboutDogComponent {
  dog!: Dog;

  constructor(
    private router: Router,
    private fs: FirebaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.fs.getDog(id ? id : '').then((dog: Dog) => {
      this.dog = dog;
      this.dog.setID(id ? id : '');
    });
  }

  goToAdoptionPage(id: string) {
    this.router.navigate(['adoption-form/' + id]);
  }
}

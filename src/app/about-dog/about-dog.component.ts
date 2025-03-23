import { Component, OnInit } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { FirebaseService } from '../../firebaseService';
import { ActivatedRoute } from '@angular/router';
import { Dog } from '../../dog';
import { AdoptionForm } from '../../adoptionForm';

@Component({
  selector: 'app-about-dog',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FooterComponent],
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

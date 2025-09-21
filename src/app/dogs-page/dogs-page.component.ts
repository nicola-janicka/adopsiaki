import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { FirebaseService } from './../../firebaseService';
import { Dog } from '../../dog';
import { OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dogs-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor, MatIconModule],
  templateUrl: './dogs-page.component.html',
  styleUrls: ['./dogs-page.component.css'],
})
export class DogsPageComponent implements OnInit {
  dogs: Dog[];
  constructor(private router: Router, private fs: FirebaseService) {
    this.dogs = [];
  }

  ngOnInit(): void {
    console.log('1. Inicjalizacja komponentu');
    this.fs
      .getDogs()
      .then((dogs) => {
        this.dogs = dogs;
        console.log(`2. Psy pobrane (${this.dogs.length})`);
        this.dogs.forEach((dog) => {
          console.log(dog.name);
        });
      })
      .catch((err) => console.error('Error in getDogs', err));
  }

  // public get sortedDogs(): Dog[] {
  //   console.log('3. Sortowanie psów');
  //   console.log(this.dogs.map((d) => d.createdAt));
  //   return [...this.dogs].sort(
  //     (a, b) =>
  //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //   );
  // }

  goToPage(pageAddress: string) {
    this.router.navigate([pageAddress]);
  }

  trackById(index: number, dog: Dog): string {
    return dog.id;
  }

  deleteDog(id: string, i: number): void {
    console.log('clicked', id);
    this.dogs.splice(i, 1);
    this.fs.deleteDog(id);
  }

  editDog(id: string): void {
    this.router.navigate(['edit-dog/' + id]);
  }

  dogThumbnail(i: number): string {
    console.log(`4. Tworzenie miniaturki (${i})`);
    let dog = this.dogs[i];
    // console.log('PICTURES: ' + dog.pictures);
    return dog.pictures && dog.pictures.length > 0
      ? dog.pictures[0]
      : 'nopicture';
  }
}

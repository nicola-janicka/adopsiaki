import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { FirebaseService } from './../../firebaseService';
import { Dog } from '../../dog';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-dogs-page',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatCardModule,
    MatButtonModule,
    NgFor,
  ],
  templateUrl: './dogs-page.component.html',
  styleUrl: './dogs-page.component.css',
})
export class DogsPageComponent implements OnInit {
  dogs: Dog[] = [];

  //       'https://www.kundelek.s2.zetohosting.pl/alex/467211437_975720694596960_8437642344523265684_n/',

  //       'https://www.kundelek.s2.zetohosting.pl/wp-content/uploads/2024/12/471229267_1003780548457641_4068007170708030490_n.jpg',

  //       'https://www.kundelek.s2.zetohosting.pl/wp-content/uploads/2024/03/434044739_813703620798669_4580056062047921915_n.jpg',

  //       'https://foto1.napaluchu.waw.pl/reksio/scale/1600/0/files/big/012000441/ab739a9dc7b33cfc.jpg',

  constructor(private router: Router, private fs: FirebaseService) {}

  ngOnInit(): void {
    this.fs.getDogs().then((dogs) => {
      this.dogs = dogs;
    });
  }

  public get sortedDogs(): Dog[] {
    return this.dogs.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  goToPage(pageAddress: string) {
    this.router.navigate([pageAddress]);
  }

  deleteDog(id: string, i: number): void {
    console.log('clicked', id);
    this.dogs.splice(i, 1);
    this.fs.deleteDog(id);
  }
}

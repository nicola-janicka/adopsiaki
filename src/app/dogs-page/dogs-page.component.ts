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

  // dogs = [
  //   {
  //     name: 'Alex',
  //     breed: 'Mixed Breed',
  //     image:
  //       'https://www.kundelek.s2.zetohosting.pl/alex/467211437_975720694596960_8437642344523265684_n/',
  //     description: 'A friendly and loving dog looking for a home.',
  //   },
  //   {
  //     name: 'Bella',
  //     breed: 'Mixed Breed',
  //     image:
  //       'https://www.kundelek.s2.zetohosting.pl/wp-content/uploads/2024/12/471229267_1003780548457641_4068007170708030490_n.jpg',
  //     description: 'A loyal and intelligent dog waiting for adoption.',
  //   },
  //   {
  //     name: 'Bono',
  //     breed: 'Mixed Breed',
  //     image:
  //       'https://www.kundelek.s2.zetohosting.pl/wp-content/uploads/2024/03/434044739_813703620798669_4580056062047921915_n.jpg',
  //     description: 'An energetic dog ready to be part of your family.',
  //   },
  //   {
  //     name: 'Charlie',
  //     breed: 'Mixed Breed',
  //     image:
  //       'https://foto1.napaluchu.waw.pl/reksio/scale/1600/0/files/big/012000441/ab739a9dc7b33cfc.jpg',
  //     description: 'An energetic dog ready to be part of your family.',
  //   },
  // ];
  constructor(private router: Router, private fs: FirebaseService) {}

  ngOnInit(): void {
    this.fs.getDogs().then((dogs) => {
      this.dogs = dogs;
    });
  }

  goToPage(pageAddress: string) {
    this.router.navigate([pageAddress]);
  }
}

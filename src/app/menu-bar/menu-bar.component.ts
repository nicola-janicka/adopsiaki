import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgFor,
  ],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css',
})
export class MenuBarComponent {
  adminLogged = true;
  menuItems = [
    { label: 'Dogs', path: '/dogs', position: 'above' },
    { label: 'Adoption', path: '/adoption', position: 'below' },
    { label: 'Adoption Form', path: '/adoption-form', position: 'before' },
    { label: 'Support Us', path: '/support-us', position: 'after' },
  ];

  constructor(private router: Router) {
    if (this.adminLogged) {
      this.menuItems.push({
        label: 'Add a Dog',
        path: '/new-dog-form',
        position: 'above',
      });
    }
  }

  goToPage(pageAddress: string) {
    this.router.navigate([pageAddress]);
  }
}

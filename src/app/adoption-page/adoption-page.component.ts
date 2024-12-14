import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-adoption-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './adoption-page.component.html',
  styleUrl: './adoption-page.component.css',
})
export class AdoptionPageComponent {}

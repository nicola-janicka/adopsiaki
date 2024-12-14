import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-adoption-form',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.css',
})
export class AdoptionFormComponent {}

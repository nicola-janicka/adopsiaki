import { Component } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-about-dog',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FooterComponent],
  templateUrl: './about-dog.component.html',
  styleUrl: './about-dog.component.css',
})
export class AboutDogComponent {
  constructor(private router: Router) {}
}

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-support-us-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './support-us-page.component.html',
  styleUrl: './support-us-page.component.css',
})
export class SupportUsPageComponent {}

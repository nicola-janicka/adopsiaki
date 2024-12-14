import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-dog-form',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './new-dog-form.component.html',
  styleUrl: './new-dog-form.component.css',
})
export class NewDogFormComponent {}

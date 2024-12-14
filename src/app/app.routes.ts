import { Routes } from '@angular/router';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';
import { AdoptionPageComponent } from './adoption-page/adoption-page.component';
import { DogsPageComponent } from './dogs-page/dogs-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NewDogFormComponent } from './new-dog-form/new-dog-form.component';
import { SupportUsPageComponent } from './support-us-page/support-us-page.component';

export const routes: Routes = [
  { path: 'adoption-form', component: AdoptionFormComponent },
  { path: 'adoption', component: AdoptionPageComponent },
  { path: 'dogs', component: DogsPageComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'new-dog-form', component: NewDogFormComponent },
  { path: 'support-us', component: SupportUsPageComponent },
];

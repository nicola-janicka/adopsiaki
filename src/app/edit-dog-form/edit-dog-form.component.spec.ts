import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDogFormComponent } from './edit-dog-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewDogFormComponent', () => {
  let component: EditDogFormComponent;
  let fixture: ComponentFixture<EditDogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDogFormComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

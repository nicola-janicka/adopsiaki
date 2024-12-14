import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDogFormComponent } from './new-dog-form.component';

describe('NewDogFormComponent', () => {
  let component: NewDogFormComponent;
  let fixture: ComponentFixture<NewDogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDogFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

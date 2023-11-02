import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquryFormComponent } from './enqury-form.component';

describe('EnquryFormComponent', () => {
  let component: EnquryFormComponent;
  let fixture: ComponentFixture<EnquryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

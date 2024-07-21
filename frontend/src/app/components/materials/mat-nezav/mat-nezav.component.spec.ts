import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatNezavComponent } from './mat-nezav.component';

describe('MatNezavComponent', () => {
  let component: MatNezavComponent;
  let fixture: ComponentFixture<MatNezavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatNezavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatNezavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

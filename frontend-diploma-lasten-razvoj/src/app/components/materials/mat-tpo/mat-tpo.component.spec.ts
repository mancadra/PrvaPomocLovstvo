import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTPOComponent } from './mat-tpo.component';

describe('MatTPOComponent', () => {
  let component: MatTPOComponent;
  let fixture: ComponentFixture<MatTPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTPOComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatTPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

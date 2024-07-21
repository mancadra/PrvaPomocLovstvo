import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatAlkoholComponent } from './mat-alkohol.component';

describe('MatAlkoholComponent', () => {
  let component: MatAlkoholComponent;
  let fixture: ComponentFixture<MatAlkoholComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatAlkoholComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatAlkoholComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

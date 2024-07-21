import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSubstancaComponent } from './mat-substanca.component';

describe('MatSubstancaComponent', () => {
  let component: MatSubstancaComponent;
  let fixture: ComponentFixture<MatSubstancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSubstancaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatSubstancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

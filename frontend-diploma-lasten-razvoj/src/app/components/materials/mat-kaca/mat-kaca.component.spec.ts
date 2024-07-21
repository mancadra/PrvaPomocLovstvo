import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatKacaComponent } from './mat-kaca.component';

describe('MatKacaComponent', () => {
  let component: MatKacaComponent;
  let fixture: ComponentFixture<MatKacaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatKacaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatKacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

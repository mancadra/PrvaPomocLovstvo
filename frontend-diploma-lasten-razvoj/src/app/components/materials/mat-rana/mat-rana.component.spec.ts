import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatRanaComponent } from './mat-rana.component';

describe('MatRanaComponent', () => {
  let component: MatRanaComponent;
  let fixture: ComponentFixture<MatRanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatRanaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatRanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

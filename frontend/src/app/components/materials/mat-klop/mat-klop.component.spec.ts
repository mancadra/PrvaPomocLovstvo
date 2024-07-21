import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatKlopComponent } from './mat-klop.component';

describe('MatKlopComponent', () => {
  let component: MatKlopComponent;
  let fixture: ComponentFixture<MatKlopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatKlopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatKlopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

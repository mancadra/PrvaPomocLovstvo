import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPodhladitevComponent } from './mat-podhladitev.component';

describe('MatPodhladitevComponent', () => {
  let component: MatPodhladitevComponent;
  let fixture: ComponentFixture<MatPodhladitevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatPodhladitevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatPodhladitevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

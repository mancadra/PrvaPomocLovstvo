import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatStrelaComponent } from './mat-strela.component';

describe('MatStrelaComponent', () => {
  let component: MatStrelaComponent;
  let fixture: ComponentFixture<MatStrelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatStrelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatStrelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

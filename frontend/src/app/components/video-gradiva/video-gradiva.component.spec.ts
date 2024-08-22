import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGradivaComponent } from './video-gradiva.component';

describe('VideoGradivaComponent', () => {
  let component: VideoGradivaComponent;
  let fixture: ComponentFixture<VideoGradivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoGradivaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoGradivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

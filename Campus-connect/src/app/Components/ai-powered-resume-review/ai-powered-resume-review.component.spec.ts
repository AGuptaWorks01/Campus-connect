import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiPoweredResumeReviewComponent } from './ai-powered-resume-review.component';

describe('AiPoweredResumeReviewComponent', () => {
  let component: AiPoweredResumeReviewComponent;
  let fixture: ComponentFixture<AiPoweredResumeReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiPoweredResumeReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiPoweredResumeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

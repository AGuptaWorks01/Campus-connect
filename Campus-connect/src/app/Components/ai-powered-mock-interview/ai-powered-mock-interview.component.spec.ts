import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiPoweredMockInterviewComponent } from './ai-powered-mock-interview.component';

describe('AiPoweredMockInterviewComponent', () => {
  let component: AiPoweredMockInterviewComponent;
  let fixture: ComponentFixture<AiPoweredMockInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiPoweredMockInterviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiPoweredMockInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

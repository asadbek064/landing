import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerHowItWorksComponent } from './container-how-it-works.component';

describe('ContainerHowItWorksComponent', () => {
  let component: ContainerHowItWorksComponent;
  let fixture: ComponentFixture<ContainerHowItWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerHowItWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerHowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

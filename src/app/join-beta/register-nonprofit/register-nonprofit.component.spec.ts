import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNonprofitComponent } from './register-nonprofit.component';

describe('RegisterNonprofitComponent', () => {
  let component: RegisterNonprofitComponent;
  let fixture: ComponentFixture<RegisterNonprofitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNonprofitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNonprofitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerNonprofitComponent } from './container-nonprofit.component';

describe('ContainerNonprofitComponent', () => {
  let component: ContainerNonprofitComponent;
  let fixture: ComponentFixture<ContainerNonprofitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerNonprofitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerNonprofitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

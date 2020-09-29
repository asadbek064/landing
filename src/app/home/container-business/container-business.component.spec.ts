import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerBusinessComponent } from './container-business.component';

describe('ContainerBusinessComponent', () => {
  let component: ContainerBusinessComponent;
  let fixture: ComponentFixture<ContainerBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

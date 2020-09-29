import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinBarBtnComponent } from './join-bar-btn.component';

describe('JoinBarBtnComponent', () => {
  let component: JoinBarBtnComponent;
  let fixture: ComponentFixture<JoinBarBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinBarBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinBarBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterShopperComponent } from './register-shopper.component';

describe('RegisterShopperComponent', () => {
  let component: RegisterShopperComponent;
  let fixture: ComponentFixture<RegisterShopperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterShopperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterShopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

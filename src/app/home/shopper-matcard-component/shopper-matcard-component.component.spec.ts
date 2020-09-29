import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopperMatcardComponentComponent } from './shopper-matcard-component.component';

describe('ShopperMatcardComponentComponent', () => {
  let component: ShopperMatcardComponentComponent;
  let fixture: ComponentFixture<ShopperMatcardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopperMatcardComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopperMatcardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

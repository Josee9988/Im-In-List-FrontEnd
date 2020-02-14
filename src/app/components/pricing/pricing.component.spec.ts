import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingComponent } from './pricing.component';
import { imports } from './../../app.module';

describe('PricingComponent', () => {
  let component: PricingComponent;
  let fixture: ComponentFixture<PricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [imports],
      declarations: [PricingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

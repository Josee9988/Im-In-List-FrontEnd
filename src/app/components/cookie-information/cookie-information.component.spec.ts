import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieInformationComponent } from './cookie-information.component';

describe('CookieInformationComponent', () => {
  let component: CookieInformationComponent;
  let fixture: ComponentFixture<CookieInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

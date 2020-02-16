import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeComponent } from './backoffice.component';
import { imports } from './../../../app.module';

describe('BackofficeComponent', () => {
  let component: BackofficeComponent;
  let fixture: ComponentFixture<BackofficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [imports],
      declarations: [BackofficeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

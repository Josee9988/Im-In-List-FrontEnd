import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAllowComponent } from './not-allow.component';

describe('NotAllowComponent', () => {
  let component: NotAllowComponent;
  let fixture: ComponentFixture<NotAllowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotAllowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAllowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

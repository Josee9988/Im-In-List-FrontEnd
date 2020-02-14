import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { imports } from './../../app.module';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [imports],
      declarations: [NotFoundComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

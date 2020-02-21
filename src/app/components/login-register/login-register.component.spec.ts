import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterComponent } from './login-register.component';
import { imports } from './../../app.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [imports, RouterTestingModule],
      declarations: [LoginRegisterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

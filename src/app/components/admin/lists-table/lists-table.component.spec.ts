import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsTableComponent } from './lists-table.component';
import { imports } from './../../../app.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListsTableComponent', () => {
  let component: ListsTableComponent;
  let fixture: ComponentFixture<ListsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [imports, RouterTestingModule],
      declarations: [ListsTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

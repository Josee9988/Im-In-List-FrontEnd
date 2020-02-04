import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsTableComponent } from './lists-table.component';

describe('ListsTableComponent', () => {
  let component: ListsTableComponent;
  let fixture: ComponentFixture<ListsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsTableComponent ]
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

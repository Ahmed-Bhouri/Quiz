import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainquizComponent } from './mainquiz.component';

describe('MainquizComponent', () => {
  let component: MainquizComponent;
  let fixture: ComponentFixture<MainquizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainquizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

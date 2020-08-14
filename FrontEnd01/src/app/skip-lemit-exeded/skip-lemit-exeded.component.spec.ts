import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipLemitExededComponent } from './skip-lemit-exeded.component';

describe('SkipLemitExededComponent', () => {
  let component: SkipLemitExededComponent;
  let fixture: ComponentFixture<SkipLemitExededComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkipLemitExededComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkipLemitExededComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

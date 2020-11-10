import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrefflesComponent } from './treffles.component';

describe('TrefflesComponent', () => {
  let component: TrefflesComponent;
  let fixture: ComponentFixture<TrefflesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrefflesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrefflesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

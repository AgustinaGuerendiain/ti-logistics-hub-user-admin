import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetesComponent } from './cadetes.component';

describe('CadetesComponent', () => {
  let component: CadetesComponent;
  let fixture: ComponentFixture<CadetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadetesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

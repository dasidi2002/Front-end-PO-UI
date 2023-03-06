import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiasemanaComponent } from './diasemana.component';

describe('DiasemanaComponent', () => {
  let component: DiasemanaComponent;
  let fixture: ComponentFixture<DiasemanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiasemanaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiasemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

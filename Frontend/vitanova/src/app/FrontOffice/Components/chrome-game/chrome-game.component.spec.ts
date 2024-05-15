import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromeGameComponent } from './chrome-game.component';

describe('ChromeGameComponent', () => {
  let component: ChromeGameComponent;
  let fixture: ComponentFixture<ChromeGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChromeGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChromeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

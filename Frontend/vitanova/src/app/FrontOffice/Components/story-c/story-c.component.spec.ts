import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCComponent } from './story-c.component';

describe('StoryCComponent', () => {
  let component: StoryCComponent;
  let fixture: ComponentFixture<StoryCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

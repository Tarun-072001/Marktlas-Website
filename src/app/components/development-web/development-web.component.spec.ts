import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentWebComponent } from './development-web.component';

describe('DevelopmentWebComponent', () => {
  let component: DevelopmentWebComponent;
  let fixture: ComponentFixture<DevelopmentWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevelopmentWebComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevelopmentWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyIpComponent } from './verify-ip.component';

describe('VerifyIpComponent', () => {
  let component: VerifyIpComponent;
  let fixture: ComponentFixture<VerifyIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyIpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsSelectComponent } from './clients-select.component';
import { CardComponent } from '../card/card.component';

describe('ClientsSelectComponent', () => {
  let component: ClientsSelectComponent;
  let fixture: ComponentFixture<ClientsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsSelectComponent, CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

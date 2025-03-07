import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const mockClient: any = {
    id: 1,
    name: 'John Doe',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.client = mockClient;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive client input correctly', () => {
    expect(component.client).toEqual(mockClient);
  });

  it('should emit editClient event when onEdit is called', () => {
    spyOn(component.editClient, 'emit');
    component.onEdit(mockClient);
    expect(component.editClient.emit).toHaveBeenCalledWith(mockClient);
  });

  it('should emit deleteClient event when onDelete is called', () => {
    spyOn(component.deleteClient, 'emit');
    component.onDelete(mockClient);
    expect(component.deleteClient.emit).toHaveBeenCalledWith(mockClient);
  });
});

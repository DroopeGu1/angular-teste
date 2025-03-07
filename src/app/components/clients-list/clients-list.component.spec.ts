import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { of, throwError } from 'rxjs';
import { ClientInterface } from '../../interface/ClientInterface';
import { UserInterface } from '../../interface/UsersInterface';
import { ApiService } from '../../service/api.service';
import { CardComponent } from '../card/card.component';
import { ClientModalComponent } from '../client-modal/client-modal.component';
import { ClientsListComponent } from './clients-list.component';

describe('ClientsListComponent', () => {
  let component: ClientsListComponent;
  let fixture: ComponentFixture<ClientsListComponent>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  const mockClient: ClientInterface = {
    id: 1,
    name: 'John Doe',
    companyValuation: 1000000,
    salary: 5000,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-02',
  };

  const mockUserResponse: UserInterface = {
    clients: [mockClient],
    currentPage: 1,
    totalPages: 3,
  };

  beforeEach(async () => {
    apiServiceMock = jasmine.createSpyObj('ApiService', [
      'getUsers',
      'createUser',
      'editUser',
      'deleteUser',
    ]);

    apiServiceMock.getUsers.and.returnValue(of(mockUserResponse));

    dialogMock = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);

    await TestBed.configureTestingModule({
      imports: [ClientsListComponent, MatSelectModule, CardComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(apiServiceMock.getUsers).toHaveBeenCalledWith(1, 10);
    expect(component.users().clients.length).toBe(1);
    expect(component.users().clients[0].name).toBe('John Doe');
    expect(component.users().currentPage).toBe(1);
    expect(component.users().totalPages).toBe(3);
  });

  it('should open dialog to create a client', () => {
    component.onClick();
    expect(dialogMock.open).toHaveBeenCalledWith(ClientModalComponent, {
      data: { submit: jasmine.any(Function) },
    });
  });

  it('should create a client and reload users', () => {
    const newClient: ClientInterface = {
      id: 2,
      name: 'New Client',
      companyValuation: 2000000,
      salary: 6000,
      createdAt: '2023-01-03',
      updatedAt: '2023-01-04',
    };
    apiServiceMock.createUser.and.returnValue(of({}));

    component.createClient(newClient);
    expect(apiServiceMock.createUser).toHaveBeenCalledWith(newClient);
    expect(apiServiceMock.getUsers).toHaveBeenCalledWith(1, 10);
    expect(dialogMock.closeAll).toHaveBeenCalled();
  });

  it('should handle error when creating a client', () => {
    const newClient: ClientInterface = {
      id: 2,
      name: 'New Client',
      companyValuation: 2000000,
      salary: 6000,
      createdAt: '2023-01-03',
      updatedAt: '2023-01-04',
    };
    apiServiceMock.createUser.and.returnValue(
      throwError(() => new Error('Failed to create client'))
    );

    component.createClient(newClient);
    expect(apiServiceMock.createUser).toHaveBeenCalledWith(newClient);
    expect(apiServiceMock.getUsers).toHaveBeenCalledWith(1, 10);
  });
});

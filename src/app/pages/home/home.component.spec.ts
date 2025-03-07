import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { ClientsListComponent } from '../../components/clients-list/clients-list.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ApiService } from '../../service/api.service';
import { HomeComponent } from './home.component';
import { HttpClient } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => null,
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        HeaderComponent,
        ClientsListComponent,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ApiService,
        HttpClient,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});

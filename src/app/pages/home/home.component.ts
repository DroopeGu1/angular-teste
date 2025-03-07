import { Component } from '@angular/core';
import { ClientsListComponent } from '../../components/clients-list/clients-list.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ClientsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

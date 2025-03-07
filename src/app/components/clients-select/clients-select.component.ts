import { Component, OnInit } from '@angular/core';
import { ClientInterface } from '../../interface/ClientInterface';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-clients-select',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './clients-select.component.html',
  styleUrl: './clients-select.component.scss',
})
export class ClientsSelectComponent implements OnInit {
  clientsSelect: ClientInterface[] = [];

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const storedClients = localStorage.getItem('clientsSelect');
      this.clientsSelect = storedClients ? JSON.parse(storedClients) : [];
    }
  }

  clearClientsSelect() {
    this.clientsSelect = [];
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('clientsSelect');
    }
  }
}

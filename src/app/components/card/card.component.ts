import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientInterface } from '../../interface/ClientInterface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ required: true }) client!: ClientInterface;
  @Output() editClient: EventEmitter<ClientInterface> = new EventEmitter();
  @Output() deleteClient: EventEmitter<ClientInterface> = new EventEmitter();

  onEdit(client: ClientInterface) {
    this.editClient.emit(client);
  }

  onDelete(client: ClientInterface) {
    this.deleteClient.emit(client);
  }
}

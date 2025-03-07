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
  @Input() showActions!: boolean;
  @Output() editClient: EventEmitter<ClientInterface> = new EventEmitter();
  @Output() deleteClient: EventEmitter<ClientInterface> = new EventEmitter();
  @Output() seletClient: EventEmitter<ClientInterface> = new EventEmitter();

  onEdit(client: ClientInterface) {
    this.editClient.emit(client);
  }

  onDelete(client: ClientInterface) {
    this.deleteClient.emit(client);
  }

  onSelect(client: ClientInterface) {
    this.seletClient.emit(client);
  }
}

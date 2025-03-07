import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ClientInterface } from '../../interface/ClientInterface';
import { UserInterface } from '../../interface/UsersInterface';
import { CardComponent } from '../card/card.component';
import { ClientModalComponent } from '../client-modal/client-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss',
  imports: [CardComponent, MatSelectModule],
})
export class ClientsListComponent {
  private apiService = inject(ApiService);
  dialog = inject(MatDialog);
  users = signal<any>({
    clients: [],
    currentPage: 1,
    totalPage: 1,
  });
  selectedValue = signal(10);
  selectedPage = signal(this.users().currentPage);
  options = [10, 30, 50];
  clientSelect = signal(0);

  constructor() {
    this.getUser(this.selectedPage(), this.selectedValue());
  }

  get pages(): number[] {
    return Array.from({ length: this.users().totalPages }, (_, i) => i + 1);
  }

  getUser(page: number, options: number) {
    this.apiService.getUsers(page, options).subscribe({
      next: (response: UserInterface) => {
        this.users.set(response);
      },
      error: (error) => {
        console.error(error, `Falha ao carregar os clientes`);
      },
    });
  }

  onClick() {
    this.dialog.open(ClientModalComponent, {
      data: {
        submit: this.createClient.bind(this),
      },
    });
  }

  createClient(item: any) {
    this.apiService.createUser(item).subscribe({
      next: (response: any) => {
        this.getUser(this.selectedPage(), this.selectedValue());
        this.dialog.closeAll();
      },
      error: (error) => {
        console.error(error, `Falha ao criar o cliente`);
      },
    });
  }

  onSelectionChange(value: number) {
    this.selectedValue.set(value);
    this.getUser(this.selectedPage(), this.selectedValue());
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.users().totalPages) {
      this.selectedPage.set(page);
      this.getUser(this.selectedPage(), this.selectedValue());
    }
  }

  handleEdit(client: ClientInterface) {
    this.clientSelect.set(client.id);
    this.dialog.open(ClientModalComponent, {
      data: {
        item: client,
        submit: this.updateClient.bind(this),
      },
    });
  }

  updateClient(item: any) {
    this.apiService.editUser(this.clientSelect(), item).subscribe({
      next: (response: any) => {
        this.getUser(this.selectedPage(), this.selectedValue());
        this.dialog.closeAll();
      },
      error: (error) => {
        console.error(error, `Falha ao editar o cliente`);
      },
    });
  }

  handleDelete(client: ClientInterface) {
    this.clientSelect.set(client.id);
    this.dialog.open(DeleteModalComponent, {
      data: {
        name: client.name,
        submit: this.deleteClient.bind(this),
      },
    });
  }

  deleteClient() {
    this.apiService.deleteUser(this.clientSelect()).subscribe({
      next: (response: any) => {
        this.getUser(this.selectedPage(), this.selectedValue());
        this.dialog.closeAll();
      },
      error: (error) => {
        console.error('Erro ao deletar usuário', error);
      },
    });
  }
}

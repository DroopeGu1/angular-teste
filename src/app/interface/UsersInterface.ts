import { ClientInterface } from './ClientInterface';

export interface UserInterface {
  clients: ClientInterface[];
  currentPage: number;
  totalPages: number;
}

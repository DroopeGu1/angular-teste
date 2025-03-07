import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ClientsSelectComponent } from "../../components/clients-select/clients-select.component";

@Component({
  selector: 'app-clients-selected',
  standalone: true,
  imports: [HeaderComponent, ClientsSelectComponent],
  templateUrl: './clients-selected.component.html',
  styleUrl: './clients-selected.component.scss',
})
export class ClientsSelectedComponent {}

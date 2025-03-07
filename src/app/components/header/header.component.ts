import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  name: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.name = params.get('name');
    });
  }
}

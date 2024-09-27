import { Component } from '@angular/core';
import { DashboardComponent } from "../../pages/dashboard/dashboard.page";

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './public.layout.html',
  styleUrl: './public.layout.scss'
})
export class PublicComponent {

}

import { Component } from '@angular/core';
import { CalendarComponent } from "../../shared/widgets/calendar/calendar.component";
import { FooterComponent } from "../../layouts/footer/footer.component";
import { HeaderComponent } from "../../layouts/header/header.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CalendarComponent, FooterComponent, HeaderComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss'
})
export class DashboardComponent {

}

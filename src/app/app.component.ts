import { Component } from '@angular/core';
import { CalendarComponent } from './shared/widgets/calendar/calendar.component';
import { PublicComponent } from "./layouts/public/public.layout";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CalendarComponent, PublicComponent],
	template: `<app-public></app-public>`
})
export class AppComponent { }

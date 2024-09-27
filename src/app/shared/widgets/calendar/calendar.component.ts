import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService, Appointment } from '../../../core/services/appointment.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { AppointmentFormComponent } from '../../components/appointment-form/appointment-form.component';
import { TruncatePipe } from '../../../core/pipes/truncate.pipe';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    AppointmentFormComponent,
		TruncatePipe
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  constructor(private appointmentService: AppointmentService) {}

  // Array to hold the dates for the calendar
  calendarDays: Date[] = [];
  // Array to hold the appointments
  appointments: Appointment[] = [];
  // Subscription to manage the appointments observable
  private appointmentSubscription!: Subscription;

  // Initialize the component
  ngOnInit(): void {
    this.generateCalendar();
    this.appointmentSubscription = this.appointmentService.appointments$.subscribe(
      appointments => {
        this.appointments = appointments;
        console.log('Updated appointments:', this.appointments); 
      }
    );
  }

  // Clean up the subscription when the component is destroyed
  ngOnDestroy(): void {
    if (this.appointmentSubscription) {
      this.appointmentSubscription.unsubscribe();
    }
  }

  // Generate the dates for the calendar
  generateCalendar() {
    const startDate = new Date();
    for (let i = 0; i < 28; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      this.calendarDays.push(date);
    }
  }

  // Handle the drop event for drag and drop functionality
  onDrop(event: CdkDragDrop<Appointment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    const movedAppointment = event.container.data[event.currentIndex];
    movedAppointment.date = new Date(event.container.id);
    this.appointmentService.updateAppointment(movedAppointment);
  }

  // Get the appointments for a specific day
  getAppointmentsForDay(day: Date): Appointment[] {
    return this.appointments.filter(appointment => 
      new Date(appointment.date).toDateString() === day.toDateString()
    );
  }

  // Handle the event when a new appointment is added
  onAppointmentAdded(appointment: Appointment) {
    this.appointmentService.addAppointment(appointment);
  }

  // Delete an appointment
  deleteAppointment(appointment: Appointment) {
    this.appointmentService.deleteAppointment(appointment);
  }

  // Get the weekday for a specific date
  getWeekday(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  // Check if a date is today
  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }
}



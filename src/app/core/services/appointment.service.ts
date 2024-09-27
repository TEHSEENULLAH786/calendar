import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Define the Appointment interface
export interface Appointment {
  id?: number;
  title: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  // BehaviorSubject to hold the list of appointments
  private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
  // Observable to expose the appointments
  appointments$ = this.appointmentsSubject.asObservable();

  // Add a new appointment to the list
  addAppointment(appointment: Appointment) {
    const currentAppointments = this.appointmentsSubject.value;
    this.appointmentsSubject.next([...currentAppointments, appointment]);
    console.log('Added appointment:', appointment); // For debugging
  }

  // Delete an appointment from the list
  deleteAppointment(appointment: Appointment) {
    const updatedAppointments = this.appointmentsSubject.value.filter(app => app.id !== appointment.id);
    this.appointmentsSubject.next(updatedAppointments);
  }

  // Update an existing appointment in the list
  updateAppointment(updatedAppointment: Appointment) {
    const currentAppointments = this.appointmentsSubject.value;
    const updatedAppointments = currentAppointments.map(app => 
      app.id === updatedAppointment.id ? updatedAppointment : app
    );
    this.appointmentsSubject.next(updatedAppointments);
  }
}

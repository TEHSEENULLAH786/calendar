import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Appointment } from '../../../core/services/appointment.service';



@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  // Define the form group for the appointment form
  appointmentForm!: FormGroup;

  // Output event emitter to notify parent component when a new appointment is added
  @Output() appointmentAdded = new EventEmitter<Appointment>();

  // Inject FormBuilder service to create form controls
  constructor(private fb: FormBuilder) {}

  // Initialize the form group with form controls and validators
  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  // Handle form submission
  onSubmit() {
    // Check if the form is valid
    if (this.appointmentForm.valid) {
      // Get the form values
      const formValue = this.appointmentForm.value;
      // Create a new appointment object
      const appointment: Appointment = {
        title: formValue.title,
        date: formValue.date,
        id: Date.now() // Generate a unique ID for the appointment
      };
      // Emit the new appointment to the parent component
      this.appointmentAdded.emit(appointment);
      // Reset the form after submission
      this.appointmentForm.reset();
    }
  }
}

import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DoctorState,
  DoctorStateQueries,
  MedicalLicense,
} from '../state/doctor.state';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [AsyncPipe, DatePipe],
})
export class AppComponent {
  @Select(DoctorState.medicalLicense) license$!: Observable<MedicalLicense>;
  @Select(DoctorStateQueries.fullLicense) fullLicense$!: Observable<string>;
  @Select(DoctorStateQueries.postal) postal$!: Observable<string>;
}

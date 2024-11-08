import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
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

  private store = inject(Store);

  license = this.store.selectSignal(DoctorState.medicalLicense);
  fullLicense = this.store.selectSignal(DoctorStateQueries.fullLicense);
  postal = this.store.selectSignal(DoctorStateQueries.postal);
}

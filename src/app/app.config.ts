import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { provideStore } from '@ngxs/store';
import { DoctorState } from '../state/doctor.state';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(
      [DoctorState],
      {
        developmentMode: true,
        selectorOptions: { injectContainerState: false },
      },
      withNgxsReduxDevtoolsPlugin()
    ),
  ],
};

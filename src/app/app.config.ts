import { ApplicationConfig, importProvidersFrom, mergeApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideServerRendering } from '@angular/platform-server';
import { provideClientHydration } from '@angular/platform-browser';
import { ToastrModule } from "ngx-toastr";
import { provideAnimations } from "@angular/platform-browser/animations";

import { routes } from './app.routes';
import { API_BASE_URL } from './services/proxies';
import { environment } from '../environments/environment.development';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
  ]
};

export const appConfig: ApplicationConfig = {
  providers: [
  provideRouter(routes),
  provideClientHydration(),
  provideHttpClient(withFetch()),
  provideAnimations(),
  importProvidersFrom(
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
  ),
  {
    provide: API_BASE_URL,
    useValue: environment.baseApiUrl
  }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

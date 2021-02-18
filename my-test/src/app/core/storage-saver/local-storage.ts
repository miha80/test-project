import { InjectionToken } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  'an abstraction over window.localStorage object',
  {
    providedIn: 'root',
    factory: () => window.localStorage,
  }
);

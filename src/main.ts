import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';

declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: (...any) => Observable<T>
  }
};

const debuggerOn = true;

Observable.prototype.debug = function(message: string) {
  return this.do(
    nextValue => {
      if (debuggerOn) {
        console.log(message, nextValue);
      }
    },
    error => {
      if (debuggerOn) {
        console.log(message, error);
      }
    },
    () => {
      if (debuggerOn) {
        console.log("Observable completed - ", message);
      }
    }
  )
};

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

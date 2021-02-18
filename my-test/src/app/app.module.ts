import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestItemsModule } from './pages/test-items/test-items.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './ngrx/main-reducers';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    TestItemsModule,
    StoreModule.forRoot(
      reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

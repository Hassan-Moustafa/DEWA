import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VideoStreamComponent } from './video-stream/video-stream.component';
import { VoiceCallComponent } from './voice-call/voice-call.component';
import { CallControlsComponent } from './call-controls/call-controls.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CallingPopupComponent } from './calling-popup/calling-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideoStreamComponent,
    VoiceCallComponent,
    CallControlsComponent,
    CallingPopupComponent
  ],
  entryComponents: [CallingPopupComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
 	  AngularFirestoreModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

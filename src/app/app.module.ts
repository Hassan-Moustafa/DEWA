import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VideoStreamComponent } from './video-stream/video-stream.component';
import { VoiceCallComponent } from './voice-call/voice-call.component';
import { CallControlsComponent } from './call-controls/call-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideoStreamComponent,
    VoiceCallComponent,
    CallControlsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

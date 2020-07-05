import { Component, OnInit, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import OT from '@opentok/client';
import {environment} from '../../environments/environment';
import { FirebaseService } from '../services/firebase.service';
import { ICallInfo } from '../interfaces/call-info.interface';
import { CallStatus, CallType } from '../enums/enums';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss']
})
export class VideoStreamComponent {


  session;
  subscriber;
  publisher;

  callIsWorking = false;
  currentCallInfo: ICallInfo;
  isSecondPartyPublishedVoiceOnly = false;

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.getCallStatus().subscribe((callInfo: ICallInfo) => {
      if(callInfo.status === CallStatus.Calling) {
        if(!this.callIsWorking) {
          this.callIsWorking = true;
          this.currentCallInfo = callInfo;
          console.log(this.currentCallInfo);
          setTimeout(() => {
            this.initializeSession();
          }, 0);
        }
      }
    })
   }

  handleError(error) {
    if (error) {
      alert(error.message);
    }
  }

  handlePropertChange(event, thisPtr) {
    let subscribers = thisPtr.session.getSubscribersForStream(event.stream);
    if(event.changedProperty === 'hasVideo' && event.newValue !== event.oldValue && subscribers.length > 0) {
      console.log(event.newValue);
        if(event.newValue) {
          thisPtr.isSecondPartyPublishedVoiceOnly = false;
        } else {
          thisPtr.isSecondPartyPublishedVoiceOnly = true;
        }
    }
  }

  publichVideoStatus(status) {
    this.publisher.publishVideo(status);
  }

  publichVoiceStatus(status) {
    this.publisher.publishAudio(status);
  }

  onVideoStatusChange(videoStatus: boolean) {
    this.publichVideoStatus(videoStatus);
  }

  onVoiceStatusChange(voiceStatus: boolean) {
    this.publichVoiceStatus(voiceStatus);
  }

  onCloseCall() {
    this.session.disconnect();
    this.callIsWorking = false;
    this.firebaseService.setCallStatus({
      status: CallStatus.Idle,
      type: CallType.Video
    });
  }

  initializeSession() {

    if(!this.session) {
        this.session = OT.initSession(environment.apiKey, environment.sessionId);
        this.session.on('streamCreated', (event) => {
            console.log('subscribe');
            this.subscriber = this.session.subscribe(event.stream, 'subscriber', {
                insertMode: 'append',
                width: '100%',
                height: '100%'
            }, this.handleError);
        });
    }
    // Subscribe to a newly created stream

    this.session.on('streamPropertyChanged', (e) => this.handlePropertChange(e, this));

    // Create a publisher
    this.publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
    }, this.handleError);

    if(this.currentCallInfo && this.currentCallInfo.type !== CallType.Video) {
      this.publichVideoStatus(false);
    }

    // Connect to the session
    this.session.connect(environment.token, (error) => {
        // If the connection is successful, publish to the session
        if (error) {
          this.handleError(error);
        } else {
          this.session.publish(this.publisher, this.handleError);
        }
    });
  }

}

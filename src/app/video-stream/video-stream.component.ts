import { Component, OnInit, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import OT from '@opentok/client';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss']
})
export class VideoStreamComponent {

  apiKey = "46822744";
  sessionId = "1_MX40NjgyMjc0NH5-MTU5Mzc0MDI1Nzk1MH5IRkVobzlHWUUyVzdNSWJ6QnZGYnJEZit-fg";
  token = "T1==cGFydG5lcl9pZD00NjgyMjc0NCZzaWc9MTVhMDQ0NzFkMTE0NTE3ODM1OTlkNTM1YTQ0MWFlMDYxYWQyMGExMzpzZXNzaW9uX2lkPTFfTVg0ME5qZ3lNamMwTkg1LU1UVTVNemMwTURJMU56azFNSDVJUmtWb2J6bEhXVVV5VnpkTlNXSjZRblpHWW5KRVppdC1mZyZjcmVhdGVfdGltZT0xNTkzNzQwMzA1Jm5vbmNlPTAuNzk4NDY3MzU5MDU2NzAyJnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE1OTYzMzIzMDMmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=";

  session;
  subscriber;
  publisher;

  isVoiceWorking = true;
  isVideoWorking = true;
  callIsWorking = false;

  @Input() callStatus: boolean = false;
  @Output() callClosed = new EventEmitter<void>();


  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.callStatus && changes.callStatus.currentValue) {
      if(!this.callIsWorking) {
        this.callIsWorking = true;
        setTimeout(() => {
          this.initializeSession();
        }, 0);
      }
    }
  }

  handleError(error) {
    if (error) {
      alert(error.message);
    }
  }

  handlePropertChange(event) {
    let subscribers = this.session.getSubscribersForStream(event.stream);
    if(event.changedProperty === 'hasVideo' && event.newValue !== event.oldValue && subscribers.length > 0) {
        if(event.newValue) {
          // this.voiceCallContainer.style.display = 'none';
        } else {
          // this.voiceCallContainer.style.display = 'block';
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
    this.callClosed.emit();
  }

  
  initializeSession() {

    if(!this.session) {
        this.session = OT.initSession(this.apiKey, this.sessionId);
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

    this.session.on('streamPropertyChanged', this.handlePropertChange);

    // Create a publisher
    this.publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
    }, this.handleError);

    // Connect to the session
    this.session.connect(this.token, (error) => {
        // If the connection is successful, publish to the session
        if (error) {
          this.handleError(error);
        } else {
          this.session.publish(this.publisher, this.handleError);
        }
    });
}

}

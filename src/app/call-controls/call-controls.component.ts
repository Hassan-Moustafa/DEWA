import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ICallInfo } from '../interfaces/call-info.interface';
import { CallType, CallStatus } from '../enums/enums';

@Component({
  selector: 'app-call-controls',
  templateUrl: './call-controls.component.html',
  styleUrls: ['./call-controls.component.scss']
})
export class CallControlsComponent implements OnInit {

  voiceWorkingStatus: boolean = true;
  videoWorkingStatus: boolean = true;

  @Output() videoStatusChange = new EventEmitter<boolean>();
  @Output() voiceStatusChange = new EventEmitter<boolean>();
  @Output() closeCall = new EventEmitter<void>();

  
  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.getCallStatus().subscribe((callInfo: ICallInfo) => {
      if(callInfo.status === CallStatus.CallingAudio) {
        this.videoWorkingStatus = false;
      }
    })
   }

  ngOnInit() {
  }

  toggleVideoStatus() {
    this.videoWorkingStatus = !this.videoWorkingStatus;
    this.videoStatusChange.emit(this.videoWorkingStatus);
  }

  toggleVoiceStatus() {
    this.voiceWorkingStatus = !this.voiceWorkingStatus;
    this.voiceStatusChange.emit(this.voiceWorkingStatus);
  }

  onCloseCall() {
    this.closeCall.emit();
  }
}

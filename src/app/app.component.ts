import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CallingPopupComponent } from './calling-popup/calling-popup.component';
import { CallType, CallStatus } from './enums/enums';
import { ICallInfo } from './interfaces/call-info.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  dialogRef;
  callInfo: ICallInfo;

  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) {
    this.firebaseService.registerCallListener().subscribe((callInfo: ICallInfo) => {
      if(callInfo.status === CallStatus.Calling && (!this.callInfo || (this.callInfo && this.callInfo.status == CallStatus.Idle))) {
        this.callInfo = callInfo;
        this.handleIncomingCall(callInfo);
      } else if (callInfo.status === CallStatus.Idle) {
        this.callInfo = null;
        this.rejectCallHandler(this);
      }
    });

    this.firebaseService.getCallStatus().subscribe((callInfo: ICallInfo) => {
      this.callInfo = callInfo;
    })


  }
  
  startCall() {
    this.dialogRef = this.dialog.open(CallingPopupComponent, {
      width: '355px',
      data: {
        title: 'Calling robot',
        isIncomingCall: false,
        rejectCallHandler: () => this.rejectCallHandler(this)
      }
    });
    this.firebaseService.callRobot();

    this.dialogRef.afterClosed().subscribe(result => {
      this.firebaseService.cancelRinging();
    });

    // this.callStatus = true;
    // this.firebaseService.setCallStatus({
    //   status: CallStatus.Calling,
    //   type: CallType.Video
    // })
  }

  onCallClose() {
    this.firebaseService.setCallStatus({
      status: CallStatus.Idle,
      type: CallType.Video
    });
  }

  handleIncomingCall(callInfo: ICallInfo) {
     this.dialogRef = this.dialog.open(CallingPopupComponent, {
      width: '355px',
      data: {
        title: 'Incoming call from robot',
        isIncomingCall: true,
        answerCallHandler: () => this.answerCallHandler(this, callInfo),
        rejectCallHandler: () => this.rejectCallHandler(this)
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.firebaseService.rejectCall();
    });
  }

  answerCallHandler(thisPtr, callInfo: ICallInfo) {
    if(thisPtr.dialogRef) {
      thisPtr.dialogRef.close();
    }
    thisPtr.firebaseService.setCallStatus(callInfo);
  }

  rejectCallHandler(thisPtr) {
    if(thisPtr.dialogRef) {
      thisPtr.dialogRef.close();
    }
    thisPtr.firebaseService.setCallStatus({
      status: CallStatus.Idle,
      type: CallType.Video
    });
  }
}

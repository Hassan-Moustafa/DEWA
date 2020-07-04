import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-calling-popup',
  templateUrl: './calling-popup.component.html',
  styleUrls: ['./calling-popup.component.scss']
})
export class CallingPopupComponent implements OnInit {

  title: string;
  isIncomingCall: boolean;

  constructor( public dialogRef: MatDialogRef<CallingPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICallPopup) {
      this.title = data.title;
      this.isIncomingCall = data.isIncomingCall;
  }

  ngOnInit() {
  }

  answerCall() {
    this.data.answerCallHandler();
  }

  rejectCall() {
    this.dialogRef.close();
    this.data.rejectCallHandler();
  }
}

interface ICallPopup {
  title: string,
  isIncomingCall: boolean,
  answerCallHandler: () => void,
  rejectCallHandler: () => void
}

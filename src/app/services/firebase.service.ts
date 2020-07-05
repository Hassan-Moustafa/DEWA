import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ICallInfo } from '../interfaces/call-info.interface';
import { CallStatus, CallType } from '../enums/enums';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private callStatus = new BehaviorSubject<ICallInfo>(null);

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  setCallStatus(callInfo: ICallInfo) {
    this.callStatus.next(callInfo);
  }

  getCallStatus() {
    return this.callStatus;
  }
  
  registerCallListener () {
    return this.db.object('calls_v2').valueChanges().pipe(
      map((callInfo: ICallInfo) => callInfo)
    );
  }

  callRobot() {
    this.db.object('/robot_calls/').update({status: 'calling'});
  }

  cancelRinging() {
    this.db.object('/robot_calls/').update({status: 'idle'});
  }
  
  rejectCall() {
    this.db.object('/calls_v2/').update({status: 'idle'});
  }
}


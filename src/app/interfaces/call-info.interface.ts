import { CallType, CallStatus } from '../enums/enums';

export interface ICallInfo {
    status: CallStatus,
    type?: CallType
}
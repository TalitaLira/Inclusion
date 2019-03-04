import { TimeOffRequest } from './time-off-request';

export interface TimeOffFormResponse {
    action: string;
    leaveRequest: TimeOffRequest;
}

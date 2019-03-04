export interface TimeOffRequest {
    id: number;
    startDate: any;
    endDate: any;
    duration: number;
    status: string;
    leaveType: string;
    partialDay: boolean;
    allDay: boolean;
    comments: string;
    notify: string;
}

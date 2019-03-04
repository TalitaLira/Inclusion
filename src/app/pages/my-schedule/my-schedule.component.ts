import { Component, OnInit, HostListener } from '@angular/core';
import { TimeOffRequest } from 'src/app/interfaces/time-off-request';
import { TimeOffFormResponse } from 'src/app/interfaces/time-off-form-response';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.scss']
})
export class MyScheduleComponent implements OnInit {
  title: string;
  timeOffList: TimeOffRequest[] = [];
  requestToEdit: TimeOffRequest;
  isRequestEnabled: boolean;

  constructor(private storageService: StorageService) {
    this.CheckLocalStorage();
  }

  ngOnInit() {
  }

  /**
   * To check if the browser already has a RequestList
   * in the localstorage, otherwise, to set a new one
   */
  private CheckLocalStorage() {
    const existinglist = this.storageService.getListFromLocalstorage('RequestsList');
    if (existinglist) {
      this.timeOffList = existinglist;
    } else {
      this.getRequests();
      this.saveListOnLocalstorage();
    }
  }

  /**
   * To save a new list in the localStorage
   */
  private saveListOnLocalstorage() {
    this.storageService.setLocalstorage('RequestsList', this.timeOffList);
  }

  /**
   * to delete the RequestList from localStorage
   */
  private deleteListFromLocalstorage() {
    this.storageService.deleteFromLocalstorage('RequestsList');
  }


  /**
   * To set the page title based on the given value
   */
  setPageTitle(newTitle: string) {
    this.title = newTitle;
  }

  /**
   * To open the Time off form component setting the object
   * based on the leave request id
   */
  openEdition(requestId: number) {
    this.timeOffList.map(req => {
      if (req.id === requestId) {
        this.requestToEdit = req;
      }
    });
  }

  /**
   * To hide the form component
   */
  hideForm() {
    this.requestToEdit = null;
    this.showRequestForm(false);
  }

  /**
   * To recreate the TimeOffList deleting
   * the object that contains the given Id
   */
  deleteLeaveRequest(leaveRequestId) {
    this.timeOffList = this.timeOffList.filter(req => {
      return req.id !== leaveRequestId;
    });
    this.deleteListFromLocalstorage();
    this.saveListOnLocalstorage();
    this.requestToEdit = null;
  }


  /**
   * To enable the timeOffForm component
   * to be displayed
   */
  showRequestForm(toShow: boolean) {
    this.isRequestEnabled = toShow;
  }

  /**
   * to add the edited leave request to the
   * timeOffList
   */
  updateLeaveRequest(editedRequest) {
    this.timeOffList = this.timeOffList.map(req => {
      if (req.id === editedRequest.id) {
        return editedRequest;
      }
      return req;
    });
    this.deleteListFromLocalstorage();
    this.saveListOnLocalstorage();
    this.requestToEdit = null;
    this.isRequestEnabled = false;
  }

  /**
   * to push a new request to timeOffList
   */
  createNewRequest(newLeaveRequest) {
    newLeaveRequest.id = this.generateRequestID();
    this.timeOffList.push(newLeaveRequest);
    this.deleteListFromLocalstorage();
    this.saveListOnLocalstorage();
    this.isRequestEnabled = false;
  }

  /**
   * To generate a new ID based on
   * the ones in the timeOffList
   */
  private generateRequestID() {
    let id = 0;
    this.timeOffList.forEach(req => {
      if (req.id > id) {
        id = req.id;
      }
    });
    return id + 1;
  }


  /**
   * to set the objects into timeOffList
   */
  private getRequests() {
    this.timeOffList = [
      {
        id: 1,
        startDate: '2018-Dec-22',
        endDate: '2018-Dec-23',
        duration: 1.0,
        status: 'Pending',
        leaveType: 'Personal',
        partialDay: false,
        allDay: true,
        comments: 'Personal stuff',
        notify: 'Talita Lira'
      },
      {
        id: 2,
        startDate: '2018-Dec-22',
        endDate: '2018-Dec-23',
        duration: 0.2,
        status: 'Pending',
        leaveType: 'Vacation',
        partialDay: false,
        allDay: true,
        comments: '',
        notify: 'Darryl Stewart'
      },
      {
        id: 3,
        startDate: '2018-Dec-22',
        endDate: '2018-Dec-23',
        duration: 2.0,
        status: 'Pending',
        leaveType: 'Vacation',
        partialDay: false,
        allDay: true,
        comments: '',
        notify: 'Darryl Stewart'
      },
      {
        id: 4,
        startDate: '2018-Dec-22',
        endDate: '2018-Dec-23',
        duration: 2.0,
        status: 'Pending',
        leaveType: 'Vacation',
        partialDay: false,
        allDay: true,
        comments: '',
        notify: 'Darryl Stewart'
      },
      {
        id: 5,
        startDate: '2018-Dec-22',
        endDate: '2018-Dec-23',
        duration: 2.0,
        status: 'Pending',
        leaveType: 'Vacation',
        partialDay: false,
        allDay: true,
        comments: '',
        notify: 'Darryl Stewart'
      },
      {
        id: 6,
        startDate: '2018-Dec-22',
        endDate: '2018-Dec-23',
        duration: 2.0,
        status: 'Completed',
        leaveType: 'Vacation',
        partialDay: false,
        allDay: true,
        comments: '',
        notify: 'Darryl Stewart'
      }
    ];
  }


}

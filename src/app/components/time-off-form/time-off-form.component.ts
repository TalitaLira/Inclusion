import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimeOffRequest } from 'src/app/interfaces/time-off-request';
import { TimeOffType } from 'src/app/interfaces/time-off-type';
import { People } from 'src/app/interfaces/people';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HoursBalance } from 'src/app/interfaces/hours-balance';

@Component({
  selector: 'app-time-off-form',
  templateUrl: './time-off-form.component.html',
  styleUrls: ['./time-off-form.component.scss']
})
export class TimeOffFormComponent implements OnInit {
  @Input() requestToEdit: TimeOffRequest;
  @Input() isNewRequest: boolean;
  @Output() createLeaveRequest = new EventEmitter<TimeOffRequest>();
  @Output() updateRequest = new EventEmitter<TimeOffRequest>();
  @Output() deleteRequest = new EventEmitter<number>();
  @Output() cancelForm = new EventEmitter<boolean>();
  leaveTypes: TimeOffType[] = [];
  people: People[] = [];
  editionForm: FormGroup;
  balances: HoursBalance;
  isBalanceOpened = false;
  balanceAction = 'View';
  haveErrors: boolean;
  dateMask: RegExp = /([0-9][0-9][0-9][0-9]-[A-Z])\w+(-[0-9][0-9])/;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.getLeaveTypes();
    this.getPeople();
    this.createForm();
    this.getBalances();

  }

  /**
   * to create the form verifying if already there are
   * data to fill it control or if should create a new one
   */
  private createForm() {
    this.editionForm = this.fb.group({
      leaveType: new FormControl(this.requestToEdit && this.requestToEdit.leaveType ?
        this.requestToEdit.leaveType : null, Validators.required),

      duration: new FormControl(this.requestToEdit && this.requestToEdit.duration ?
        this.requestToEdit.duration : null, Validators.required),

      startDate: new FormControl(this.requestToEdit && this.requestToEdit.startDate ?
        this.requestToEdit.startDate : '', Validators.compose([
          Validators.pattern(this.dateMask),
          Validators.required
        ])),

      endDate: new FormControl(this.requestToEdit && this.requestToEdit.endDate ?
        this.requestToEdit.endDate : '', Validators.compose([
          Validators.pattern(this.dateMask),
          Validators.required
        ])),

      comments: new FormControl(this.requestToEdit && this.requestToEdit.comments ? this.requestToEdit.comments : ''),

      notify: new FormControl(this.requestToEdit && this.requestToEdit.notify ?
        this.requestToEdit.notify : '', Validators.required),
    });
  }

  onSubmit() {
    if (this.editionForm.valid) {
      this.getFormValues();
    } else {
      this.haveErrors = true;
    }
  }

  /**
   * To return the form values
   */
  getFormValues() {
    const durationSelected = this.editionForm.get('duration').value;

    const formsValue: TimeOffRequest = {
      id: this.requestToEdit ? this.requestToEdit.id : null,
      startDate: this.editionForm.get('startDate').value,
      endDate: this.editionForm.get('endDate').value,
      duration: this.editionForm.get('duration').value,
      status: 'Pending',
      leaveType: this.editionForm.get('leaveType').value,
      partialDay: durationSelected < 1 ? true : false,
      allDay: durationSelected >= 1 ? true : false,
      comments: this.editionForm.get('comments').value,
      notify: this.editionForm.get('notify').value
    };

    if (formsValue.id) {
      this.saveRequest(formsValue);
    } else {
      this.createRequest(formsValue);
    }
  }

  /**
   * To emit the changed object to the parent component
   */
  saveRequest(leaveRequest) {
    this.updateRequest.emit(leaveRequest);
  }

  /**
   * To emit the form values to the parent
   * component create a new leave request
   */
  createRequest(leaveRequest) {
    this.createLeaveRequest.emit(leaveRequest);
  }

  /**
   * To emit the request id to the parent component
   * so it can be deleted
   */
  deleteTimeOffRequest() {
    this.deleteRequest.emit(this.requestToEdit.id);
  }

  /**
   * To cancel the form visualization
   */
  cancelFormVisualization() {
    this.cancelForm.emit(true);
  }

  /**
   * To toggle the balance display
   */
  toggleLeaveBalance() {
    this.isBalanceOpened = !this.isBalanceOpened;
    this.isBalanceOpened ? this.balanceAction = 'Hide' : this.balanceAction = 'View';
  }

  /**
   * To set the leave types to be loaded on the form
   */
  private getLeaveTypes() {
    this.leaveTypes = [
      {
        id: 1,
        name: 'Vacation'
      },
      {
        id: 2,
        name: 'Personal'
      },
      {
        id: 3,
        name: 'Sick'
      },
      {
        id: 4,
        name: 'Banked'
      },
    ];
  }

  /**
   * To set the people names to be loaded on the form
   */
  getPeople() {
    this.people = [
      {
        id: 1,
        name: 'Darryl Stewart'
      },
      {
        id: 2,
        name: 'Talita Lira'
      },
      {
        id: 3,
        name: 'Darryl Stewart'
      },
      {
        id: 4,
        name: 'Darryl Stewart'
      }
    ];
  }

  /**
   * To get the hours balances and set to a variable
   */
  getBalances() {
    this.balances = {
      vacationTime: 10.00,
      personal: 10.00,
      sick: 0.00,
      banked: 0.00,
    };
  }

}

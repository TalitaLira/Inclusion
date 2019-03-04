import { Component, OnInit, Output, EventEmitter, Input, HostListener, DoCheck, IterableDiffers } from '@angular/core';
import { TimeOffRequest } from 'src/app/interfaces/time-off-request';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit, DoCheck {
  @Output() title = new EventEmitter<string>();
  @Output() edition = new EventEmitter<number>();
  @Output() enableNewRequest = new EventEmitter<boolean>();
  @Input() requests: TimeOffRequest[];
  currentClicked = 'pending';
  pendingRequests: TimeOffRequest[] = [];
  completedRequests: TimeOffRequest[] = [];
  isMobile: boolean;
  iterableDif: any;

  constructor(private iterableDiffers: IterableDiffers) {
    this.iterableDif = this.iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
    this.setTitle();

    this.verifyWindowCondition(window.innerWidth <= 768);
  }

  @HostListener('window:resize', ['$event']) getWindowSize(event) {
    const windowSize = event.target.innerWidth;
    this.verifyWindowCondition(windowSize <= 768);
  }

  /**
   * enable or disable mobile variable according to the given condition
   */
  verifyWindowCondition(condition: boolean) {
    if (condition) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  ngDoCheck() {
    this.checkListChanges();
  }

  /**
   * To check if some object changed to reset the list arrays
   */
  private checkListChanges() {
    const changes = this.iterableDif.diff(this.requests);
    if (changes) {
      this.pendingRequests = [];
      this.completedRequests = [];
      this.requests = changes.collection;
      this.setLists();
    }
  }

  /**
   * Emit a boolean value to the parent component
   * to enable the form view
   */
  createNewRequest() {
    this.enableNewRequest.emit(true);
  }

  /**
   * to format the leave duration to return to the view
   */
  formatDuration(duration: number) {
    if (duration < 1) {
      const hour = duration * 10;
      return `${hour} Hours`;
    } else if (duration === 1) {
      return `${duration} day`;
    } else {
      return `${duration} days`;
    }
  }

  /**
   * To emit to the parent component
   * the title that must be displayed
   */
  setTitle() {
    this.title.emit('Time Off Request');
  }

  /**
   * enables the type of list to display
   */
  setCurrentClicked(status: string) {
    this.currentClicked = status;
  }

  /**
   * to emit to the parent component
   * the Id of the leave request to be edited
   */
  editRequest(reqId: number) {
    this.edition.emit(reqId);
  }

  /**
   * To set the objects into their respective lists
   */
  private setLists() {
    this.requests.map(req => {
      if (req.status === 'Pending') {
        this.pendingRequests.push(req);
      } else {
        this.completedRequests.push(req);
      }
    });
  }


}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HoursBalance } from 'src/app/interfaces/hours-balance';

@Component({
  selector: 'app-leave-balances',
  templateUrl: './leave-balances.component.html',
  styleUrls: ['./leave-balances.component.scss']
})
export class LeaveBalancesComponent implements OnInit {
  dateForm: FormGroup;
  @Input() balances: HoursBalance;
  currentDate = new Date();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.dateForm = this.fb.group({
      calendar: new FormControl({ value: this.formatDate(), disabled: true }),
    });
  }

  formatDate() {
    const day = this.currentDate.getDay();
    const month = this.currentDate.getDate();
    const year = this.currentDate.getFullYear();

    return `${year}-${month}-${day}`;
  }

}

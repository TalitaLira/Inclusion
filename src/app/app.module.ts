import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyScheduleComponent } from './pages/my-schedule/my-schedule.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { TimeOffFormComponent } from './components/time-off-form/time-off-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveBalancesComponent } from './components/leave-balances/leave-balances.component';


@NgModule({
  declarations: [
    AppComponent,
    MyScheduleComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    RequestsListComponent,
    TimeOffFormComponent,
    LeaveBalancesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

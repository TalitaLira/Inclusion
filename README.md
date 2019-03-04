# Inclusion

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.3.

This is a single page application project with the purpose to be used in a work environment where the employee can make leave time requests to their supervisors.
The user can:
- create a new request;
- edit an existing one;
- delete a request;
- and see the list of requests with its status;

The project structure is devided in four repositories:
- components;
- interfaces;
- pages;
- services;

Components

In this directory you will find:
- header: the application header with its HTML structure and scss styling;
- leave-balances: the setting of the object containing the information of the employee available hours to be used. And also the HTML a SCSS structure and styling respectivily;
- requests-list: This component receives a main object from its parent component, to render the leave requests list. It also emit events to its parent component to determine actions like edit or create a new requets;
- time-off-form: It renders the leave requests form, filled or empty, depending on witch action its gonna execute, create a new request or editing an existing one. It also emits events to its parent component, so it can create, update, delete a new form, or to cancel the form display and enable the request list component;

Interfaces

In the interfaces repository you can find the interfaces used on the application:
- Hours-balance: To set the format of balance the methods receive to display the balance;
- people: To set the format of the people list to be rendered on time-off-form;
- time-off-request: To set the format of a leave request;
- time-off-type: To set the format of the types of leave requests to be rendered on time-off-form;

Pages

The main components to be accessed by a route:
- home: The index page '/';
- my-schedule: It includes all the system main components and functionality. Can be accessed by '/myschedule';

Services

To provide methods that can be accessed by several components:
- storage: It contains the methods that controls process of saving, getting and deleting the localstorage content;

Deploy

For the production mode was used npm serve and heroku;



## Dependences instalation

Run `npm install` to install all the project dependences.

## Development server

Run `ng serve` or `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


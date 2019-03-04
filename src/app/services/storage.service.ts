import { Injectable } from '@angular/core';
import { TimeOffRequest } from '../interfaces/time-off-request';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setLocalstorage(key, item) {
    window.localStorage.setItem(key, JSON.stringify(item));
  }

  getListFromLocalstorage(storageKey) {
    return JSON.parse(window.localStorage.getItem(storageKey));
  }

  deleteFromLocalstorage(key) {
    window.localStorage.removeItem(key);
  }

}

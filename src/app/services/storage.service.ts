import { Injectable } from '@angular/core';
import { TimeOffRequest } from '../interfaces/time-off-request';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * to set content in the localstorage
   */
  setLocalstorage(key, item) {
    window.localStorage.setItem(key, JSON.stringify(item));
  }

  /**
   * to the content from localstorage
   */
  getFromLocalstorage(storageKey) {
    return JSON.parse(window.localStorage.getItem(storageKey));
  }

  /**
   * to delete a content from the localstorage
   */
  deleteFromLocalstorage(key) {
    window.localStorage.removeItem(key);
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('');
  recievedData = this.messageSource.asObservable();

  constructor() { }

  sendData(message: string) {
    // console.log(message)
    this.messageSource.next(message)
  }
}

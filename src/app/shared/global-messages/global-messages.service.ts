import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalMessagesService {

  public isMessage = new BehaviorSubject({
    type: '',
    message: ''
  });

  constructor() { }
}

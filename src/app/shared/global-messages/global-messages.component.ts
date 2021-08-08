import { Component, Input } from '@angular/core';
import { GlobalMessagesService } from './global-messages.service';

@Component({
  selector: 'app-global-messages',
  templateUrl: './global-messages.component.html',
  styleUrls: ['./global-messages.component.css']
})
export class GlobalMessagesComponent {
  
  @Input() ifShow!:boolean;
  @Input() inputMessage!:string;
  @Input() inputType!:string;

  constructor(
    private globalMessages: GlobalMessagesService
  ) { }

  onClose () {
    this.globalMessages.isMessage.next({ message: '', type: ''})
  }

}

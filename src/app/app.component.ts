import { ChangeDetectorRef, Component ,OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalMessagesService } from './shared/global-messages/global-messages.service';
import { LoaderService } from './shared/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,OnDestroy{
  title = 'home-scout';
  loading!: boolean;
  show!: boolean;
  message!: string;
  type!: string;
  sub!: Subscription;
  subMessages!: Subscription;

  constructor(
    private loaderService: LoaderService,
    private globalMessages: GlobalMessagesService,
    private cd: ChangeDetectorRef
  )  { }

  ngOnInit () {
      this.sub = this.loaderService.isLoading.subscribe( state => {
        this.loading = state;
        this.cd.detectChanges();
    });
      this.subMessages = this.globalMessages.isMessage.subscribe( state => {
        this.show = state.show;
        this.message = state.message;
        this.type = state.type;
        this.cd.detectChanges();
        // TODO global messages auto disappear
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

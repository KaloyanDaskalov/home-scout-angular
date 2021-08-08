import { ChangeDetectorRef, Component ,OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
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
  show: boolean = false;
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
      this.subMessages = this.globalMessages.isMessage
      .pipe(
        tap(v => {
          if(v.message === '') {
            this.show = false;
          } else {
            this.show = true;
          }
          this.message = v.message;
          this.type = v.type;
        })
        ,delay(3000)
      )
      .subscribe( _ => {
        if ( this.show === true) {this.show = false}
        this.cd.detectChanges();
        // TODO global messages auto disappear
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subMessages.unsubscribe();
  }

}

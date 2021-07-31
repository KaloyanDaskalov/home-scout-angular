import { ChangeDetectorRef, Component ,OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './shared/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,OnDestroy{
  title = 'home-scout';
  loading!: boolean;
  sub!: Subscription;

  constructor(
    private loaderService: LoaderService,
    private cd: ChangeDetectorRef
  )  { }

  ngOnInit () {
      this.sub = this.loaderService.isLoading.subscribe( state => {
        this.loading = state;
        this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

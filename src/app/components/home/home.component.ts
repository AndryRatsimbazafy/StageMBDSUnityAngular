import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { TimerService } from 'src/app/services/timer.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  youCanLoadUnity = false

  constructor(
    private auth: AuthService,
    private data: DataService,
    public timerService: TimerService,
    private router: Router,
    private chat: ChatService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxLoader.start();
    if (!this.auth.getUserId()) {
      this.router.navigate(['/index']);
    } else {
      this.chat.connectSocket(this.auth.getUsername(), this.auth.getUserId())
    }
    this.youCanLoadUnity = true

  }

  ngAfterViewInit(){
    this.ngxLoader.stop();
  }

}

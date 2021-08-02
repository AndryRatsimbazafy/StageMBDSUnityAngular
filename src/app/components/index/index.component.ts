import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalIndexComponent } from '../modals/modal-index/modal-index.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from '../../services/data.service';
import { TimerService } from '../../services/timer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../notification/notification.component';

declare var particlesJS: any;


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  AccountForm: FormGroup;
  ForgotForm: FormGroup;
  hide: boolean = true;
  loading: boolean = false;
  username: string;
  loginError
  forgotmode = false


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private chat: ChatService,
    private data: DataService,
    public timerService: TimerService,
    public snackBar: MatSnackBar,
  ) {
    this.AccountForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.ForgotForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    // this.dialog.open(ModalIndexComponent, { disableClose: true });
    particlesJS.load('particles-js', 'assets/particles.json', function () {
      console.log('callback - particles.js config loaded');
    });

    this.timerService.get().subscribe((timer: any) => {
      // if (timer && timer.body) {
      //   console.log('timer', timer.body);
      //   this.data.visitableState.next(-1);
      //   this.data.timer.next(timer.body);
      // }
    })
  }

  onCustomAction() {
    this.loginError = undefined
    this.loading = true;
    if (this.AccountForm.invalid) {
      return;
    }
    this.auth.login(this.AccountForm.value).subscribe((res: any) => {
      this.loading = false
      console.log("resresresresresresres", res)
      if (res && res.success) {
        const account = res.body

        if (!account.firstName && !account.lastName && account.email) {
          this.username = account.email
        }
        if (account.firstName || account.lastName) {
          this.username = `${account.lastName ? account.lastName : ''} ${account.firstName ? account.firstName : ''}`.trim()
        }

        // store userinfo on local storage
        this.auth.storeUserInfo(account._id, this.username);

        console.log("this.auth IN INDEX", this.auth.getUserId())

        // connect socket...
        this.chat.connectSocket(this.username, account._id)
        this.router.navigate(['/home']);

      }
    }, e => {
      this.loading = false
      console.log('error', e)
      this.loginError = e.error;

    })
  }

  forgetAction() {
    this.loginError = undefined
    this.loading = true;
    console.log('this.ForgotForm.value', this.ForgotForm.value);
    this.auth.forgotPassword(this.ForgotForm.value).subscribe((res: any) => {
      if (res && res.success) {
        this.snackBar.openFromComponent(NotificationComponent, {
          duration: 4000,
          data: {
            message: 'Email envoyé',
            type: 'success'
          },
          panelClass: ['success-snackbar']
        });
        this.loading = false;
      }
    }, err => {
      this.loginError = {
        error: 'Impossible de réinitialiser votre mot de passe, veuillez contacter l\'administrateur'
      }
      this.loading = false;
    })
  }
}

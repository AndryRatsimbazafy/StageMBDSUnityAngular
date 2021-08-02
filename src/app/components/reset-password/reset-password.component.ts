import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  @Input() token: string;
  public ResetForm: FormGroup;
  public hide = true;
  public hideConfirm = true;
  public loading = false;
  public loginError: any;

  @Input() displayMode: any;

  constructor(private router: Router, private route: ActivatedRoute,
    private auth: AuthService,
    public snackBar: MatSnackBar) {
    this.ResetForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
    });
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.route.params
    .subscribe(param => {
      if (param && param.token) {
        this.token = param.token;
      }
    });
  }

  onSubmit(): void {
    this.loginError = undefined;
    this.loading = true
    if (this.ResetForm.invalid) {
      return;
    }
    if (this.ResetForm.get('password').value !== this.ResetForm.get('passwordConfirm').value) {
      this.loginError = 'les mots de passe ne correspondent pas';
      this.loading = false
      return;
    }

    this.auth.resetPassword(this.token, {
      password: this.ResetForm.get('password').value
    }).subscribe((res: any) => {
      if (res && res.success) {
        this.snackBar.openFromComponent(NotificationComponent, {
          duration: 4000,
          data: {
            message: 'Mot de passe réinitialisé avec success',
            type: 'success'
          },
          panelClass: ['success-snackbar']
        });
        this.loading = false
      }
    }, err => {
      this.loading = false
      this.loginError = {
        error: 'Impossible de réinitialiser votre mot de passe, veuillez contacter l\'administrateur'
      }
    })
  }

}

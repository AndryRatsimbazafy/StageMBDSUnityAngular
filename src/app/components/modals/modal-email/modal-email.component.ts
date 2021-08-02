import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { MailService } from 'src/app/services/mail.service';
import { StandService } from 'src/app/services/stand.service';
import { NotificationComponent } from '../../notification/notification.component';

@Component({
  selector: 'app-modal-email',
  templateUrl: './modal-email.component.html',
  styleUrls: ['./modal-email.component.scss']
})
export class ModalEmailComponent implements OnInit {

  form: FormGroup
  exposantEmail = undefined
  visiteurEmail = undefined
  loading = false
  errorMessage: string = undefined

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '50',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalEmailComponent>,
    private mailService: MailService,
    public snackBar: MatSnackBar,
    public standService: StandService,
    private auth: AuthService,
    public dataService: DataService,
  ) { }

  ngOnInit(): void {

    const visId = this.auth.getUserId()
    this.standService.getUserById(visId).subscribe((vis: any) => {
      if (vis && vis.body) {
        console.log('vis', vis);
        this.visiteurEmail = vis.body.email;
        this.form.get('visiteurEmail').setValue(this.visiteurEmail)
      }
    })

    console.log('find assets');
    console.log('this.standIdSelected', this.data.standIdSelected);


    this.dataService.exposantAssets.subscribe(assets => {
      if (assets) {
        console.log('assets', assets);
        const selectedStand = assets.find(e => e.gameObjectId == this.data.standIdSelected)
        if (selectedStand) {

          console.log('this.standIdSelected', this.data.standIdSelected);
          console.log('user roommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', selectedStand.room);

          this.standService.getUserById(selectedStand.room?.user_id).subscribe((exp: any) => {
            if (exp && exp.body) {
              this.exposantEmail = exp.body.email
              this.form.get('exposantEmail').setValue(this.exposantEmail)
            }
          })
        }
      }
    })

    // this.exposantEmail = this.data.recipient;
    console.log('exp mail must be', this.data.recipient);
    this.exposantEmail = this.data.recipient;

    this.form = new FormGroup({
      exposantEmail: new FormControl(this.exposantEmail, [Validators.required]),
      visiteurEmail: new FormControl(this.visiteurEmail, [Validators.required]),
      subject: new FormControl('Salon de la Rénovation', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.loading = true
    this.errorMessage = undefined;
    if (this.form.invalid) {
      return;
    }

    console.log('this.form.value', this.form.value);
    this.mailService.sendEmail(this.form.value)
      .subscribe(
        response => {
          console.log('okok');

          this.snackBar.openFromComponent(NotificationComponent, {
            duration: 4000,
            data: {
              message: 'Email envoyé',
              type: 'success'
            },
            panelClass: ['success-snackbar']
          });
          this.loading = false

          this.dialogRef.close()
        }, error => {
          this.loading = false
          this.errorMessage = 'Impossible d\'envoyer l\'email'
        }
      );
  }

}

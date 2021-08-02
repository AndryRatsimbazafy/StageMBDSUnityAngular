import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { StandService } from 'src/app/services/stand.service';
import { ModalChoixSceneComponent } from '../modal-choix-scene/modal-choix-scene.component';
import { ModalRediffConferenceComponent } from '../modal-rediff-conference/modal-rediff-conference.component';
import { ModalZoomComponent } from '../modal-zoom/modal-zoom.component';

@Component({
  selector: 'app-modal-choix-conference',
  templateUrl: './modal-choix-conference.component.html',
  styleUrls: ['./modal-choix-conference.component.css']
})
export class ModalChoixConferenceComponent implements OnInit {

  loading = false

  constructor(private dialogRef: MatDialogRef<ModalChoixConferenceComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private standService: StandService) { }

  ngOnInit(): void {
  }

  toDirect() {
    /*
    this.loading = true
    let finish = false;
    this.dataService.unityinstance.subscribe(unity => {
      if (unity && !finish) {
        unity.SendMessage("SwitchScene", "ChoixConference", "ConferenceDirect");
        finish = true
        this.loading = false
        this.dialogRef.close()
      }
    })
    */
    this.dataService.inConference.next(true);
    this.dialogRef.close();
    const modal = this.dialog.open(ModalZoomComponent, { height: "70%", width: "100%", position: {top: "10px" }});
    modal.afterClosed().subscribe(() => {
      // this.dataService.inConference.next(false);
    })
  }

  toRediff() {
    // this.loading = true
    // let finish = false;
    // this.dataService.unityinstance.subscribe(unity => {
    //   if (unity && !finish) {
    //     unity.SendMessage("SwitchScene", "ChoixConference", "ConferenceRediff");
    //     finish = true
    //     this.loading = false
    //     this.dialogRef.close()
    //   }
    // })

    this.dialog.open(ModalRediffConferenceComponent)
  }

  closeModal() {
    this.dialogRef.close("no");
  }

}

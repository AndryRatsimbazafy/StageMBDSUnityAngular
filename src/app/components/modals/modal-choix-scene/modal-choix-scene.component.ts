import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { StandService } from 'src/app/services/stand.service';

@Component({
  selector: 'app-modal-choix-scene',
  templateUrl: './modal-choix-scene.component.html',
  styleUrls: ['./modal-choix-scene.component.css']
})
export class ModalChoixSceneComponent implements OnInit {
  
  loading = false

  constructor(private dialogRef: MatDialogRef<ModalChoixSceneComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private standService: StandService) { }

  ngOnInit(): void {
  }

  toHall() {
    this.loading = true
    let finish = false;
    this.dataService.unityinstance.subscribe(unity => {
      if (unity && !finish) {
        unity.SendMessage("SwitchScene", "ChangeScene", "Hall");
        finish = true
        this.loading = false
        this.dialogRef.close()
      }
    })
  }

  toStand() {
    this.loading = true
    let finish = false;
    this.dataService.unityinstance.subscribe(unity => {
      if (unity && !finish) {
        unity.SendMessage("SwitchScene", "ChangeScene", "Stand");
        finish = true
        this.loading = false
        this.dialogRef.close()
      }
    })
  }

  closeModal() {
    this.dialogRef.close("no");
  }

}

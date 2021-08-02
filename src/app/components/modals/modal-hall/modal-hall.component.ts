import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { StandService } from 'src/app/services/stand.service';
import { ModalGalleryComponent } from '../modal-gallery/modal-gallery.component';

@Component({
  selector: 'app-modal-hall',
  templateUrl: './modal-hall.component.html',
  styleUrls: ['./modal-hall.component.css']
})
export class ModalHallComponent implements OnInit {

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  loading = false

  @ViewChild('image') image: any;
  @ViewChild('modal') modal: any;
  @ViewChild('imageModal') imageModal: any;
  @ViewChild('close') close: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalHallComponent>,
    private dataService: DataService,
    private standService: StandService
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  openImageModal(url: any) {
    this.modal.nativeElement.style.display = "block";
    this.imageModal.nativeElement.src = url;
  }

  closeImageModal() {
    this.modal.nativeElement.style.display = "none";
  }

  openInNewTab(file) {
    window.open(file.changingThisBreaksApplicationSecurity)
  }

  visiterNotreStand() {
    this.loading = true
    let finish = false;
    this.dataService.unityinstance.subscribe(unity => {
      if (unity && !finish) {
        unity.SendMessage("HallSelectionManager", "VisiterNotreStand", this.data.standId);
        console.log('this.data.standId', this.data.standId);
        finish = true
        this.standService.fetchDataApiServer().subscribe((data: any) => {
          if (data && data.body) {
            this.dataService.exposantAssets.next(data.body)
            this.data.unityComponent.dataTreatmentAndSendDataToUnity(data.body, this.data.unityComponent);
          }
        });
        this.loading = false
        this.dialogRef.close()
      }
    })
    // this.data.unity.standService.fetchDataApiServer().subscribe( (data: any) => {
    //   this.dataTreatmentAndSendDataToUnity(data);
    //   this.hide = false;
    //   this.hidden = true;
    //   this.hiddenStand = true;
    //   this.hiddenExterieur = false;
    //   this.hiddenCoaching = false;
    //   this.hiddenHall = false;
    //   this.hiddenConference = false;
    // });
    // if(this.data.unity.hiddenStand == true) {

    // }
  }
}

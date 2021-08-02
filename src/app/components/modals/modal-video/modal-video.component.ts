import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-video',
  templateUrl: './modal-video.component.html',
  styleUrls: ['./modal-video.component.css']
})
export class ModalVideoComponent implements OnInit {
  isFullScreen = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  toggleFullScreen() {
    let modal: HTMLDivElement = document.querySelector('.galleryVideo');
    modal.style.maxWidth = "100vw"
    modal.style.maxHeight = "100vh"
    if (this.isFullScreen) {
      modal.style.maxWidth = "80vw";
      modal.style.height = "auto";

    } else {
      modal.style.width = "100vw"
      modal.style.height = "100vh"
    }
    this.isFullScreen = !this.isFullScreen;

  }

}

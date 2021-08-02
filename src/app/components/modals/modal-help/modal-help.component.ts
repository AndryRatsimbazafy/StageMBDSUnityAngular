import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalGalleryComponent } from '../modal-gallery/modal-gallery.component';
@Component({
  selector: 'app-modal-help',
  templateUrl: './modal-help.component.html',
  styleUrls: ['./modal-help.component.css']
})
export class ModalHelpComponent implements OnInit {

  @ViewChild('accordionMovement') accordionMovement: any;
  @ViewChild('accordionMap') accordionMap: any;
  @ViewChild('help') help: any;

  constructor(
    private dialogRef: MatDialogRef<ModalGalleryComponent>
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  toggleAcordionSection(index: any){
    let details = this.help.nativeElement.querySelectorAll('details');
    let detailsClicked = details[index];
    for (var i = 0; i < details.length; i++) {
      details[i].removeAttribute('open');
    }
    detailsClicked.setAttribute('open');
  }

  toggleAccordion(index: any, type: any) {
    let buttons = null;
    if(type == "movement"){
      buttons = this.accordionMovement.nativeElement.querySelectorAll('button');
    }
    if(type == "map"){
      buttons = this.accordionMap.nativeElement.querySelectorAll('button');
    } 
    let buttonClicked = buttons[index];
    let expand = buttonClicked.getAttribute('aria-expanded');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-expanded', 'false');
    }
    if (expand == 'false') {
      buttonClicked.setAttribute('aria-expanded', 'true');
    }
  }
}

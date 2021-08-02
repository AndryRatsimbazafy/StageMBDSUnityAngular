import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-index',
  templateUrl: './modal-index.component.html',
  styleUrls: ['./modal-index.component.css']
})
export class ModalIndexComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCustomAction() { 
    this.router.navigate(['/home']); 
  } 
}

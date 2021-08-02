import { Component, OnInit } from '@angular/core';
import { UnityService } from 'src/app/services/unity.service';

@Component({
  selector: 'app-load-data-progress-spinner',
  templateUrl: './load-data-progress-spinner.component.html',
  styleUrls: ['./load-data-progress-spinner.component.css']
})
export class LoadDataProgressSpinnerComponent implements OnInit {

  public progress = 0;

  constructor(private unityService: UnityService) { }

  ngOnInit(): void {
    this.unityService.progress$.subscribe((progress: number) => this.progress = progress);
  }

}

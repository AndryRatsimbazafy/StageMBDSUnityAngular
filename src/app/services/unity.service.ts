import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnityService {

  progress$ = new Subject()

  constructor() {
  }
}

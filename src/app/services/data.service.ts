import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  unityinstance: BehaviorSubject<any>
  unityComponent: BehaviorSubject<any>
  exposantAssets: BehaviorSubject<any>
  timer: BehaviorSubject<any>
  visitableState: BehaviorSubject<any>
  playBackgroundAudio: BehaviorSubject<any>
  inConference: BehaviorSubject<any>

  constructor() {
    this.unityinstance = new BehaviorSubject(null)
    this.unityinstance.asObservable()

    this.unityComponent = new BehaviorSubject(null)
    this.unityComponent.asObservable()

    this.exposantAssets = new BehaviorSubject(null)
    this.exposantAssets.asObservable()

    this.timer = new BehaviorSubject(null)
    this.timer.asObservable()
    
    this.visitableState = new BehaviorSubject(null)
    this.visitableState.asObservable()

    this.playBackgroundAudio = new BehaviorSubject(null)
    this.playBackgroundAudio.asObservable()

    this.inConference = new BehaviorSubject(null)
    this.inConference.asObservable()
  }
}

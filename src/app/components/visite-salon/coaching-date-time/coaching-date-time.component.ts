import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-coaching-date-time',
  templateUrl: './coaching-date-time.component.html',
  styleUrls: ['./coaching-date-time.component.scss']
})
export class CoachingDateTimeComponent implements OnInit {

  @Input() coachingDataDates = [];
  @Input() coachingDataHours = [];
  @Input() disabledArrayValue: {coachingDate: string, coachingHour: string}[] = [];

  @Output() valueChanged = new EventEmitter();

  coachings: {coachingDate: string, coachingHour: string}[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  disableCheckbox(coachingDate, coachingHour): boolean {
    return !!this.disabledArrayValue.find(v => {
      return v.coachingHour === coachingHour && v.coachingDate === coachingDate
    });
  }

  check(date, hour, checked): void {
    const findIndex = this.coachings.findIndex(coaching => {
      return date === coaching.coachingDate && hour === coaching.coachingHour
    });
    if (checked) {
      this.coachings.push({
        coachingDate: date,
        coachingHour: hour
      });
    } else {
       this.coachings.splice(findIndex, 1);
    }
    this.valueChanged.emit(this.coachings);
  }

}
import { Component, OnInit } from '@angular/core';
import { Month, Week } from '../../../../core/model/month';
import * as moment from 'moment';
import { Moment } from 'moment';
import * as holiday from '@18f/us-federal-holidays';
console.log(holiday)
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  months: Month[] = [];
  public startDate: Date;
  public numberDays: number;

  constructor() { }

  ngOnInit() {
    const startDate: Moment = moment(this.startDate).startOf('day');
    const endDate: Moment = startDate.clone().add(this.numberDays - 1, 'days').endOf('day');

    const weekStart = startDate.clone().startOf('week');
    const weekEnd = endDate.clone().endOf('week');
    const numberWeeks: number = weekEnd.diff(weekStart, 'week');

    const months: Month[] = [];

    let month: Month = {
      title: startDate.format('MMMM'),
      year: startDate.format('YYYY'),
      weeks: []
    };

    const currentDate = weekStart.clone();
    let firstWeek = true;

    for (let i = 0; i <= numberWeeks; i++) {
      const week: Week = {
        days: []
      };
      for (let j = 0; j < 7; j++) {
        week.days.push({
          value: currentDate.toDate(),
          weekend: [6, 7].indexOf(currentDate.isoWeekday()) !== -1,
          holiday: holiday.isAHoliday(currentDate.toDate()),
          enabled: currentDate >= startDate && currentDate <= endDate && currentDate.format('MMMM') === month.title
        });
        currentDate.add(1, 'day');
      }

      const multiMonthWeek = Array.from(
        new Set(week.days
          .map(item => ({
            enabled: item.value >= startDate.toDate() && item.value <= endDate.toDate(),
            value: item.value
          }))
          .filter(item => item.enabled)
          .map(item => item.value.getMonth()))
      ).length > 1;

      const monthName = moment(week.days[0].value).format('MMMM');

      if (month.title === monthName) {
        month.weeks.push(week);
      }

      if ((month.title !== monthName || multiMonthWeek)) {
        if (month.weeks.length) {
          months.push(month);
        }

        const nextMonthName = moment(week.days[week.days.length - 1].value).format('MMMM');

        const nextMonthWeeks = {
          days: week.days.map((day) => {
            const momentDay = moment(day.value).startOf('day');
            return Object.assign({}, day, {
              enabled: momentDay >= startDate && momentDay <= endDate && momentDay.format('MMMM') === nextMonthName
            });
          })
        };

        if (nextMonthWeeks.days.filter(item => item.enabled).length > 0) {
          month = {
            title: nextMonthName,
            year: moment(week.days[week.days.length - 1].value).format('YYYY'),
            weeks: [nextMonthWeeks]
          };

        }
      }

      if (i === numberWeeks && !months.find(item => item.title === month.title)) {
        months.push(month);
      }

      firstWeek = false;
    }
    this.months = months;
  }
}

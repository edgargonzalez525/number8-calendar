import { NgModule } from '@angular/core';
import { CalendarGeneratorComponent } from './pages/calendar-generator/calendar-generator.component';
import { SharedModule } from '../../shared/shared.module';
import { CalendarRoutingModule } from './calendar.routing.module';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  imports: [
    SharedModule,
    CalendarRoutingModule,
  ],
  declarations: [
    CalendarGeneratorComponent,
    CalendarComponent,
  ],
  entryComponents: [
    CalendarComponent,
  ]
})
export class CalendarModule {}

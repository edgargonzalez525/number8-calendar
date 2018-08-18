import { NgModule } from '@angular/core';
import { CalendarGeneratorComponent } from './pages/calendar-generator/calendar-generator.component';
import { SharedModule } from '../../shared/shared.module';
import { CalendarRoutingModule } from './calendar.routing.module';

@NgModule({
  imports: [
    SharedModule,
    CalendarRoutingModule,
  ],
  declarations: [CalendarGeneratorComponent]
})
export class CalendarModule {}

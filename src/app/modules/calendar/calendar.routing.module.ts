import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CalendarGeneratorComponent } from './pages/calendar-generator/calendar-generator.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarGeneratorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
